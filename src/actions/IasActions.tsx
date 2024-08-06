import { fetchData } from "@/lib/fetchData";

export async function sweepChannelMessages() {
    return await fetchData(`/v1/ias/sweep-messages`, "POST",);
  }

  export async function getAllTeams(){
 return await fetchData(`/v1/ias/teams`, "GET");
  }

  export async function getAllChats(){
    return await fetchData(`/v1/ias/chats`, "GET");
  }