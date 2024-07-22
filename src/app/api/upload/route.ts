import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  // Simply read the entire request body (req.body) and send it back
  const requestBody = await req.arrayBuffer();

  return new NextResponse(requestBody, { status: 200 });
}
