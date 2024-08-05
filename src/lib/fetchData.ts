"use server"

import { getServerSession } from "./getServerSession";



const baseUrl = process.env.BACKEND_URL;
export async function fetchData(
    endpoint: string,
    method: string,
  
    body?: any,
    isJson: boolean = true
  ) {
    try {
      const token = (await getServerSession()).token
       if(!token) return 
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
        const errorMessage = errorData?.error || `Failed to ${method} ${endpoint}`;
        throw new Error(errorMessage);
      }
  
      return await response.json();
    } catch (error) {
      console.error(`Error during ${method} ${endpoint}:`, error);
      throw error;
    
    }
  }