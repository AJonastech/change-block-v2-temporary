"use server";

import { fetchData } from "@/lib/fetchData";
import { fetchFile } from "@/lib/fetchFile";

export async function getEmpaReports() {
  return await fetchData(`/v1/empa-reports`, "GET");
}
export async function getEmpaReport(id: string) {
  return await fetchData(`/v1/empa-reports/${id}`, "GET");
}

export async function uploadFile(data: any,onProgress: (progress: number) => void) {
  return await fetchFile(`/v1/misc/upload`, "POST", data,onProgress);
}

export async function createEmpaReport(data: any) {
  return fetchData(`/v1/empa-reports`, "POST", data);
}


export async function deleteEmpa(reportId:string){
      return await fetchData(`/v1/empa-reports/${reportId}`, "DELETE");
}


export async function editEmpaReport(reportId:string,sectionId:string, subSectionId:string, data:any){
return await fetchData(`/v1/empa-reports/${reportId}/section/${sectionId}/sub-section/${subSectionId}`, "PATCH",data)
}
