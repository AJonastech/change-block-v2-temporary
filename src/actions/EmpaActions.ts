"use server"

import { fetchData } from "@/lib/fetchData"
import { getServerSession } from "@/lib/getServerSession"

export async function getEmpaReports(){
   try{
    const token = (await getServerSession()).token
    const response =  await fetch(`${process.env.BACKEND_URL}/api/empa/reports`,
      {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      }
    )
    const data = await response.json()
    if(!response.ok){
      throw new Error(data.message)
    }
    return data
   }catch(error){
console.error(`Error during getEmpaReports:`, error);
   }

}