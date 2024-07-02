import { redirect } from "next/navigation";

export async function serverRedirect(path: string) {
  return redirect(path);
}
