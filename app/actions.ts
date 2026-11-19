"use server";
import { prisma } from "@/lib/db";
export async function sendMessage(fd: FormData) {
  const name = String(fd.get("name") || "").slice(0, 100),
    email = String(fd.get("email") || "").slice(0, 200),
    body = String(fd.get("body") || "").slice(0, 3000);
  if (!name || !email.includes("@") || !body) return;
  await prisma.message.create({ data: { name, email, body } });
}
