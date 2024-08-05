"use server";

import { fetchData } from "@/lib/fetchData";

export async function getEmpaReports() {
  return await fetchData(`/v1/empa-reports`, "GET");
}
export async function getEmpaReport(id: string) {
  return await fetchData(`/v1/empa-reports/${id}`, "GET");
}

export async function createEmpaReport(data: any) {
  return fetchData(`/v1/empa-reports`, "POST", data);
}
