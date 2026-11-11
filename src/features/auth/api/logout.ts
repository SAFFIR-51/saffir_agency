"use server";

import { redirect } from "next/navigation";
import { endSession } from "@/server/auth";
import { routes } from "@/shared/config";

export async function logout() {
  await endSession();
  redirect(routes.home);
}
