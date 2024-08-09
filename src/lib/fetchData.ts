import { getServerSession } from "./getServerSession";


const baseUrl = process.env.BACKEND_URL;

export async function fetchData(
  endpoint: string,
  method: string,
  body?: any,
  isJson: boolean = true
) {
  try {
    const session = await getServerSession();
    const token = session?.token;

    if (!token) {
      throw new Error('No token found');
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    if (isJson) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers,
      body: body ? (isJson ? JSON.stringify(body) : body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.details || errorData.detail || `Failed to ${method} ${endpoint}`;
      const error: ErrorWithResponse = Object.assign(new Error(errorMessage), {
        response: { status: response.status, data: errorData }
      });
      throw error;

    }

    return await response.json();
  } catch (error: any) {
    if (error.response) {
      throw error;
    } else {
      const genericError: ErrorWithResponse = new Error(error.message) as ErrorWithResponse;
      genericError.response = { status: 500, data: { message: error.message } };
      throw genericError;
    }
  }
}
