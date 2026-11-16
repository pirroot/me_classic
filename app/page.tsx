import { prisma, getSettings } from "@/lib/db";
import Site from "./Site";
export const dynamic = "force-dynamic";
export async function generateMetadata() {
  const s = await getSettings();
  return { title: s.seoTitle || s.nameFa, description: s.seoDesc };
}
export default async function Home({
  searchParams,
}: {
  searchParams: { lang?: string };
}) {
  const [s, projects, exp] = await Promise.all([
    getSettings(),
    prisma.project.findMany({
      where: { published: true },
      orderBy: { sort: "asc" },
    }),
    prisma.experience.findMany({
      where: { published: true },
      orderBy: { sort: "asc" },
    }),
  ]);
  return (
    <Site
      s={s}
      projects={projects}
      exp={exp}
      initLang={searchParams.lang === "en" ? "en" : "fa"}
    />
  );
}
