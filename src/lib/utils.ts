import { redirect } from "next/navigation";

export async function serverRedirect(path: string) {
  return redirect(path);
}

export const trimSentence = (sentence: string, allowedLength:number) => {
  if (sentence.length <= allowedLength) return sentence;

  return `${sentence.slice(0, allowedLength)}...`;
};