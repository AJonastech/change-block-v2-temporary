"use server"
import { fetchData } from "@/lib/fetchData";

export async function sweepChannelMessages() {
  return await fetchData(`/v1/ias/sweep-messages`, "POST",);
}

export async function getAllTeams() {
  return await fetchData(`/v1/ias/teams`, "GET");
}

export async function getAllChats() {
  return await fetchData(`/v1/ias/chats`, "GET");
}

export async function getTeamChannels(teamid: string) {
  return await fetchData(`/v1/ias/${teamid}/channels`, "GET");
}

export async function saveTeamChannel(data: any) {
  return await fetchData(`/v1/ias/save-details`, "POST", data)
}

export async function saveChatDetails(data: any) {
  return await fetchData('/v1/ias/save-chat-details', "POST", data)
}

export async function saveWeeklyInsightChannel(data: any) {
  return await fetchData(`/v1/weekly-insights/channel-details`, "POST", data)
}

export async function saveWeeklyInsightChat(data: any) {
  return await fetchData(`/v1/weekly-insights/chat-details`, "POST", data)
}

export async function getWeeklyChannelInsight(){
  return await fetchData(`/v1/weekly-insights/channel-details`, "GET")
}
export async function getWeeklyChatInsight(){
  return await fetchData(`/v1/weekly-insights/chat-details`, "GET")
}