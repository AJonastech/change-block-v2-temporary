// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  const boundary = contentType.split("boundary=")[1];

  if (!boundary) {
    return new NextResponse(
      JSON.stringify({ error: "No boundary found in content type" }),
      { status: 400 }
    );
  }

  const buffer = await req.arrayBuffer();
  const parts = bufferToParts(buffer, boundary);
  const filePart = parts.find((part) => part.headers["content-type"]);

  if (!filePart) {
    return new NextResponse(JSON.stringify({ error: "No file part found" }), {
      status: 400,
    });
  }

  const fileBuffer = filePart.data;
  const blob = new Blob([fileBuffer], {
    type: filePart.headers["content-type"],
  });

  const url = URL.createObjectURL(blob);

  return new NextResponse(JSON.stringify({ filePath: url }), { status: 200 });
}

function bufferToParts(buffer: ArrayBuffer, boundary: string) {
  const parts: { headers: Record<string, string>; data: Uint8Array }[] = [];
  const boundaryStr = "--" + boundary;
  const boundaryLen = boundaryStr.length;
  const bufferView = new Uint8Array(buffer);

  let start = 0;
  while (start < buffer.byteLength) {
    const boundaryIndex = findBoundary(bufferView, boundaryStr, start);
    if (boundaryIndex === -1) break;

    const partHeadersEnd = bufferView.indexOf(13, boundaryIndex + boundaryLen);
    if (partHeadersEnd === -1) break;

    const headers = parseHeaders(
      bufferView.subarray(boundaryIndex + boundaryLen + 2, partHeadersEnd)
    );
    const partDataStart = partHeadersEnd + 4;
    const nextBoundaryIndex = findBoundary(
      bufferView,
      boundaryStr,
      partDataStart
    );

    const partDataEnd =
      nextBoundaryIndex !== -1 ? nextBoundaryIndex - 2 : buffer.byteLength;
    const partData = bufferView.subarray(partDataStart, partDataEnd);

    parts.push({ headers, data: partData });

    start = nextBoundaryIndex;
  }

  return parts;
}

function findBoundary(buffer: Uint8Array, boundary: string, start: number) {
  for (let i = start; i < buffer.length - boundary.length; i++) {
    if (
      buffer.subarray(i, i + boundary.length).join() ===
      boundary.split("").join()
    ) {
      return i;
    }
  }
  return -1;
}

function parseHeaders(buffer: Uint8Array) {
  const headers: Record<string, string> = {};
  const headerLines = new TextDecoder().decode(buffer).split("\r\n");
  for (const line of headerLines) {
    const [key, value] = line.split(": ");
    if (key && value) {
      headers[key.toLowerCase()] = value;
    }
  }
  return headers;
}
