"use client";
import { useEffect, useState } from "react";
type A = any;

function Clock({ en }: { en: boolean }) {
  const [c, setC] = useState("");
  useEffect(() => {
    const f = () => {
      const d = new Date();
      const loc = en ? "en-GB" : "fa-IR";
      const date = new Intl.DateTimeFormat(loc, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Tehran",
      }).format(d);
      const time = new Intl.DateTimeFormat(loc, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Tehran",
      }).format(d);
      setC(`${date} · ${time}`);
    };
    f();
    const i = setInterval(f, 30000);
    return () => clearInterval(i);
  }, [en]);
  return (
    <span className="mono">
      <span className="live" /> {c}
    </span>
  );
}

function Type({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const i = setInterval(
      () => setN((v) => (v >= text.length ? (clearInterval(i), v) : v + 1)),
      55,
    );
    return () => clearInterval(i);
  }, [text]);
  return (
    <>
      {text.slice(0, n)}
      <span className="cur" />
    </>
  );
}

export default function Site({
  s,
  projects,
  exp,
  initLang,
}: {
  s: A;
  projects: A[];
  exp: A[];
  initLang: string;
}) {
  const [en, setEn] = useState(initLang === "en"),
    [color, setColor] = useState(false),
    [open, setOpen] = useState<string | null>(null),
    [det, setDet] = useState<A>(null);
  const t = (a: A, k: string) =>
    en ? a[k + "En"] || a[k + "Fa"] : a[k + "Fa"];
  const close = () => {
    if (det) setDet(null);
    else setOpen(null);
  };
  useEffect(() => {
    try {
      setColor(localStorage.getItem("color") === "1");
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("color", color ? "1" : "0");
    } catch {}
  }, [color]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "1") setOpen("exp");
      if (e.key === "2") setOpen("proj");
      if (e.key === "3") setOpen("contact");
      if (e.key === "c") setColor((v) => !v);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });
  const tags = (x: string) =>
    x
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean)
      .map((v) => (
        <span key={v} className="bd">
          {v}
        </span>
      ));
  const mv = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--x",
      ((e.clientX - r.left) / r.width) * 100 + "%",
    );
    e.currentTarget.style.setProperty(
      "--y",
      ((e.clientY - r.top) / r.height) * 100 + "%",
    );
  };
  const ov = (id: string, title: string, body: React.ReactNode) =>
    open === id && (
      <div className="ov">
        <div className="ovh">
          <b style={{ fontSize: "1.2rem" }}>{title}</b>
          <button
            className="btn"
            onClick={() => {
              setDet(null);
              setOpen(null);
            }}
          >
            {en ? "Close [esc]" : "بستن [esc]"}
          </button>
        </div>
        <div className="ovb">{body}</div>
      </div>
    );
  const links = [
    [en ? "Phone" : "تلفن", s.phone, "tel:" + s.phone],
    [en ? "Email" : "ایمیل", s.email, "mailto:" + s.email],
    ["GitHub", "github.com/" + s.github, "https://github.com/" + s.github],
    [
      en ? "Telegram" : "تلگرام",
      "@" + s.telegram,
      "https://t.me/" + s.telegram,
    ],
  ];
  const nav = [
    ["exp", en ? "Experience" : "سوابق"],
    ["proj", en ? "Projects" : "پروژه‌ها"],
    ["contact", en ? "Contact" : "ارتباط"],
  ];
  return (
    <div className="site" dir={en ? "ltr" : "rtl"}>
      <header className="top">
        <b style={{ fontSize: "1.1rem" }}>{t(s, "name")}</b>
        <span className="tr">
          <Clock en={en} />
          <span className="lang">
            <button className={!en ? "on" : ""} onClick={() => setEn(false)}>
              FA
            </button>
            <button className={en ? "on" : ""} onClick={() => setEn(true)}>
              EN
            </button>
          </span>
        </span>
      </header>
      <main className="hero">
        <div className="txt">
          <h1>{t(s, "name")}</h1>
          <div className="role">
            <Type text={t(s, "role")} />
          </div>
          <p className="tag">{t(s, "tagline")}</p>
          <nav className="acts">
            {nav.map(([id, l]) => (
              <button key={id} onClick={() => setOpen(id)}>
                <b>{l}</b>
              </button>
            ))}
          </nav>
        </div>
        <div className="phw">
          <div className="ph" onMouseMove={mv}>
            <img
              className="g"
              src="/profile.webp"
              alt={t(s, "name")}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <img
              className={"c" + (color ? " on" : "")}
              src="/profile.webp"
              alt=""
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <button
              className="cbtn"
              style={{ zIndex: 900 }}
              onClick={() => setColor((v) => !v)}
            >
              <i className={color ? "d on" : "d"} />
              {en ? "Color" : "رنگ اصلی"}
            </button>
          </div>
          <p className="hint mute">
            {en
              ? "Hover the photo for color. Keys: 1 2 3, c, esc"
              : "موس رو روی عکس ببر. کلیدها: 1 2 3، c، esc"}
          </p>
        </div>
      </main>
      {ov(
        "exp",
        nav[0][1],
        <div className="cols">
          {exp.map((e) => (
            <div className="card" key={e.id} style={{ breakInside: "avoid" }}>
              <div className="row" style={{ border: 0, padding: 0 }}>
                <b style={{ fontSize: "1.15rem" }}>{t(e, "company")}</b>
                <span className="mono mute">{t(e, "period")}</span>
              </div>
              <div>
                <i>{t(e, "role")}</i>
              </div>
              <p>{t(e, "desc")}</p>
              {tags(e.stack)}
            </div>
          ))}
        </div>,
      )}
      {ov(
        "proj",
        nav[1][1],
        det ? (
          <div>
            <button className="btn" onClick={() => setDet(null)}>
              {en ? "Back" : "برگشت"}
            </button>
            {det.img && (
              <img
                src={det.img}
                alt=""
                style={{
                  width: "100%",
                  maxHeight: 280,
                  objectFit: "cover",
                  margin: "16px 0",
                  filter: "grayscale(1) contrast(1.2)",
                }}
              />
            )}
            <h2
              style={{
                fontSize: "clamp(1.8rem,5vw,3rem)",
                lineHeight: 1.15,
                borderBottom: "3px double #161616",
                paddingBottom: 8,
              }}
            >
              {t(det, "title")}
            </h2>
            <span className="bd">{det.catFa}</span>
            <p className="cols">{t(det, "desc")}</p>
            <div>{tags(det.stack)}</div>
            {det.url && (
              <p>
                <a
                  className="btn"
                  href={det.url}
                  target="_blank"
                  rel="noopener"
                >
                  {en ? "View project" : "مشاهده پروژه"}
                </a>
              </p>
            )}
          </div>
        ) : (
          projects.map((p, i) => (
            <div className="row pr" key={p.id} onClick={() => setDet(p)}>
              <span className="mono mute">
                {String(i + 1).padStart(2, "0")}
              </span>
              <b style={{ fontSize: "1.15rem" }}>{t(p, "title")}</b>
              <span className="bd">{p.catFa}</span>
            </div>
          ))
        ),
      )}
      {ov(
        "contact",
        nav[2][1],
        <div style={{ maxWidth: 560 }}>
          {links.map(([k, v, h]) => (
            <div className="row" key={k}>
              <span className="mono mute">{k}</span>
              <a href={h} target="_blank" rel="noopener">
                <b>{v}</b>
              </a>
            </div>
          ))}
        </div>,
      )}
    </div>
  );
}
