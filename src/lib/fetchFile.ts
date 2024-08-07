"use server";

import { getServerSession } from "./getServerSession";

const baseUrl = process.env.BACKEND_URL;

interface ErrorWithResponse extends Error {
  response?: {
    status: number;
    data: any;
  };
}

export async function fetchFile(
  endpoint: string,
  method: string,
  formData: FormData
) {
  try {
    const session = await getServerSession();
    const token = session?.token;

    if (!token) {
      throw new Error("No token found");
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers,
      body: formData,
    });

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   const errorMessage =
    //     errorData?.details ||
    //     errorData.detail ||
    //     `Failed to ${method} ${endpoint}`;
    //   const error: ErrorWithResponse = Object.assign(new Error(errorMessage), {
    //     response: { status: response.status, data: errorData },
    //   });
    //   throw error;
    // }

    return await response.json();
  } catch (error: any) {
    if (error.response) {
      throw error;
    } else {
      const genericError: ErrorWithResponse = new Error(
        error.message
      ) as ErrorWithResponse;
      genericError.response = { status: 500, data: { message: error.message } };
      throw genericError;
    }
  }
}
