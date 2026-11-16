import { prisma } from "@/lib/db";
export default async function Dash() {
  const [p, e, m, u, last] = await Promise.all([
    prisma.project.count(),
    prisma.experience.count(),
    prisma.message.count(),
    prisma.message.count({ where: { read: false } }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);
  return (
    <>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          ["پروژه", p],
          ["سابقه", e],
          ["پیام", m],
          ["خوانده‌نشده", u],
        ].map(([l, n]) => (
          <div className="stat" key={l as string}>
            <b>{n}</b>
            <span className="mute">{l}</span>
          </div>
        ))}
      </div>
      <h3>آخرین پیام‌ها</h3>
      {last.map((x) => (
        <div className="row" key={x.id}>
          <span>
            {!x.read && "● "}
            {x.name} <span className="mute mono">{x.email}</span>
          </span>
          <span className="mono mute">
            {x.createdAt.toLocaleString("fa-IR")}
          </span>
        </div>
      ))}
    </>
  );
}
