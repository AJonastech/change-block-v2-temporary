"use server"

import { fetchData } from "@/lib/fetchData"


export async function getEmpaReports(){
 return await fetchData(`/v1/empa-reports`, 'GET')

}