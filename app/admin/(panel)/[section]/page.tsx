import { notFound } from "next/navigation";
import { prisma, FIELDS, getSettings, SETTING_KEYS } from "@/lib/db";
import {
  saveItem,
  deleteItem,
  togglePublish,
  moveItem,
  msgRead,
  msgDelete,
  saveSettings,
} from "../../actions";
const B = ({ a, m, id, d, children }: any) => (
  <form action={a} style={{ display: "inline" }}>
    <input type="hidden" name="model" value={m} />
    <input type="hidden" name="id" value={id} />
    {d !== undefined && <input type="hidden" name="d" value={d} />}
    <button className="btn">{children}</button>
  </form>
);
export default async function Section({
  params,
  searchParams,
}: {
  params: { section: string };
  searchParams: { edit?: string; new?: string; q?: string };
}) {
  const s = params.section;
  if (s === "messages") {
    const q = searchParams.q || "";
    const list = await prisma.message.findMany({
      where: q
        ? {
            OR: [
              { name: { contains: q } },
              { email: { contains: q } },
              { body: { contains: q } },
            ],
          }
        : {},
      orderBy: { createdAt: "desc" },
    });
    return (
      <>
        <form>
          <input name="q" defaultValue={q} placeholder="جستجو…" />
        </form>
        {list.map((m) => (
          <div className="card" key={m.id}>
            <div className="row" style={{ border: 0, padding: 0 }}>
              <b>
                {!m.read && "● "}
                {m.name} <span className="mono mute">{m.email}</span>
              </b>
              <span className="mono mute">
                {m.createdAt.toLocaleString("fa-IR")}
              </span>
            </div>
            <p style={{ whiteSpace: "pre-wrap" }}>{m.body}</p>
            <form action={msgRead} style={{ display: "inline" }}>
              <input type="hidden" name="id" value={m.id} />
              <button className="btn">
                {m.read ? "نخوانده" : "خوانده شد"}
              </button>
            </form>{" "}
            <a className="btn" href={`mailto:${m.email}`}>
              پاسخ
            </a>{" "}
            <form action={msgDelete} style={{ display: "inline" }}>
              <input type="hidden" name="id" value={m.id} />
              <button className="btn">حذف</button>
            </form>
          </div>
        ))}
      </>
    );
  }
  if (s === "settings") {
    const v = await getSettings();
    return (
      <form action={saveSettings} className="grid">
        {SETTING_KEYS.map((k) => (
          <div key={k}>
            <label>{k}</label>
            <input name={k} defaultValue={v[k]} />
          </div>
        ))}
        <div>
          <button className="btn">ذخیره</button>
        </div>
        <p className="mono mute" style={{ gridColumn: "1/-1" }}>
          رمز عبور فقط در فایل .env (ADMIN_PASSWORD) است.
        </p>
      </form>
    );
  }
  if (!FIELDS[s]) notFound();
  const m = (prisma as any)[s],
    f = FIELDS[s];
  const rows = await m.findMany({ orderBy: { sort: "asc" } });
  const ed = searchParams.edit
    ? rows.find((r: any) => String(r.id) === searchParams.edit)
    : null;
  const title = (r: any) => r.titleFa || r.companyFa;
  return (
    <>
      {ed || searchParams.new ? (
        <form action={saveItem} className="card">
          <input type="hidden" name="model" value={s} />
          <input type="hidden" name="id" value={ed?.id || ""} />
          <div className="grid">
            {f.map(([k, l, t]) => (
              <div key={k}>
                <label>{l}</label>
                {t === "area" ? (
                  <textarea name={k} rows={3} defaultValue={ed?.[k] || ""} />
                ) : (
                  <input
                    name={k}
                    type={t || "text"}
                    defaultValue={
                      ed?.[k] ?? (t === "number" ? rows.length + 1 : "")
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <label>
            <input
              type="checkbox"
              name="published"
              defaultChecked={ed ? ed.published : true}
              style={{ width: "auto" }}
            />{" "}
            منتشر شود
          </label>
          <br />
          <br />
          <button className="btn">ذخیره</button>{" "}
          <a className="btn" href={"/admin/" + s}>
            لغو
          </a>
        </form>
      ) : (
        <p>
          <a className="btn" href={`/admin/${s}?new=1`}>
            + جدید
          </a>
        </p>
      )}
      {rows.map((r: any) => (
        <div className="row" key={r.id}>
          <span>
            {!r.published && <span className="mute">[پیش‌نویس] </span>}
            {title(r)}
          </span>
          <span style={{ display: "flex", gap: 6 }}>
            <B a={moveItem} m={s} id={r.id} d={-1}>
              ↑
            </B>
            <B a={moveItem} m={s} id={r.id} d={1}>
              ↓
            </B>
            <B a={togglePublish} m={s} id={r.id}>
              {r.published ? "پنهان" : "انتشار"}
            </B>
            <a className="btn" href={`/admin/${s}?edit=${r.id}`}>
              ویرایش
            </a>
            <B a={deleteItem} m={s} id={r.id}>
              حذف
            </B>
          </span>
        </div>
      ))}
    </>
  );
}
