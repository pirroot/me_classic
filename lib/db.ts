import { PrismaClient } from "@prisma/client";
const g = globalThis as any;
export const prisma: PrismaClient = g.__p ?? (g.__p = new PrismaClient());
export const SETTING_KEYS = [
  "nameFa",
  "nameEn",
  "roleFa",
  "roleEn",
  "taglineFa",
  "taglineEn",
  "email",
  "phone",
  "github",
  "telegram",
  "seoTitle",
  "seoDesc",
];
export async function getSettings() {
  const s: Record<string, string> = Object.fromEntries(
    SETTING_KEYS.map((k) => [k, ""]),
  );
  (await prisma.setting.findMany()).forEach((r) => {
    s[r.key] = r.value;
  });
  return s;
}
export const FIELDS: Record<string, string[][]> = {
  project: [
    ["titleFa", "عنوان FA"],
    ["titleEn", "Title EN"],
    ["catFa", "دسته"],
    ["descFa", "توضیح FA", "area"],
    ["descEn", "Description EN", "area"],
    ["stack", "Stack (comma)"],
    ["url", "URL"],
    ["img", "Image URL"],
    ["sort", "Order", "number"],
  ],
  experience: [
    ["companyFa", "شرکت FA"],
    ["companyEn", "Company EN"],
    ["periodFa", "دوره FA"],
    ["periodEn", "Period EN"],
    ["roleFa", "نقش FA"],
    ["roleEn", "Role EN"],
    ["descFa", "توضیح FA", "area"],
    ["descEn", "Description EN", "area"],
    ["stack", "Stack (comma)"],
    ["sort", "Order", "number"],
  ],
};
