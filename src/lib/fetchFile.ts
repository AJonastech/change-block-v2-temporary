"use server";

import { getServerSession } from "./getServerSession";

const baseUrl = process.env.BACKEND_URL;

interface ErrorWithResponse extends Error {
  response?: {
    status: number;
    data: any;
  };
}export async function fetchFile(endpoint: string, method: string, formData: FormData, onProgress: (progress: number) => void) {
  try {
    const session = await getServerSession();
    const token = session?.token;

    if (!token) {
      throw new Error("No token found");
    }

    const xhr = new XMLHttpRequest();

    xhr.open(method, `${baseUrl}${endpoint}`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        onProgress(progress);
      }
    };

    const promise = new Promise((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(xhr.statusText));
        }
      };

      xhr.onerror = () => reject(new Error('Network error'));
    });

    xhr.send(formData);

    return promise;
  } catch (error: any) {
    const genericError: ErrorWithResponse = new Error(
      error.message
    ) as ErrorWithResponse;
    genericError.response = { status: 500, data: { message: error.message } };
    throw genericError;
  }
}
