"use client";
import { useEffect, useState } from "react";
type A = any;
function Clock() {
  const [c, setC] = useState("--:--:--");
  useEffect(() => {
    const f = () =>
      setC(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Tehran",
        }).format(new Date()),
      );
    f();
    const i = setInterval(f, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <span className="mono">
      <span className="live" /> TEH {c}
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
  const ov = (id: string, num: string, title: string, body: React.ReactNode) =>
    open === id && (
      <div className="ov">
        <div className="ovh">
          <b className="mono">
            ({num}) {title}
          </b>
          <button
            className="btn"
            onClick={() => {
              setDet(null);
              setOpen(null);
            }}
          >
            {en ? "close [esc]" : "بستن [esc]"}
          </button>
        </div>
        <div className="ovb">{body}</div>
      </div>
    );
  const links = [
    ["phone", s.phone, "tel:" + s.phone],
    ["email", s.email, "mailto:" + s.email],
    ["github", "github.com/" + s.github, "https://github.com/" + s.github],
    ["telegram", "@" + s.telegram, "https://t.me/" + s.telegram],
  ];
  const nav = [
    ["exp", "01", en ? "Experience" : "سوابق"],
    ["proj", "02", en ? "Projects" : "پروژه‌ها"],
    ["contact", "03", en ? "Contact" : "ارتباط"],
  ];
  return (
    <div className="site" dir={en ? "ltr" : "rtl"}>
      <header className="top mono">
        <b>
          pirroot
          <span className="cur" />
        </b>
        <span className="tr">
          <Clock />
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
          <p className="mono mute">
            $ whoami
            <span className="cur" />
          </p>
          <h1>{t(s, "name")}</h1>
          <div className="role">
            <Type text={t(s, "role")} />
          </div>
          <p className="mute tag">{t(s, "tagline")}</p>
          <nav className="acts">
            {nav.map(([id, n, l]) => (
              <button key={id} onClick={() => setOpen(id)}>
                <span className="mono mute">({n})</span> <b>{l}</b>{" "}
                <span className="mute">→</span>
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
              {en ? "color" : "رنگ اصلی"}
            </button>
          </div>
          <p className="mono mute hint">
            {en
              ? "hover the photo · keys: 1 2 3 · c · esc"
              : "موس رو روی عکس ببر · کلیدها: 1 2 3 · c · esc"}
          </p>
        </div>
      </main>
      {ov(
        "exp",
        "01",
        nav[0][2],
        exp.map((e) => (
          <div className="card" key={e.id}>
            <div className="row" style={{ border: 0, padding: 0 }}>
              <b>{t(e, "company")}</b>
              <span className="mono mute">{t(e, "period")}</span>
            </div>
            <div>{t(e, "role")}</div>
            <p className="mute">{t(e, "desc")}</p>
            {tags(e.stack)}
          </div>
        )),
      )}
      {ov(
        "proj",
        "02",
        nav[1][2],
        det ? (
          <div>
            <button className="btn" onClick={() => setDet(null)}>
              {en ? "← back" : "→ برگشت"}
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
                  filter: "grayscale(1)",
                }}
              />
            )}
            <h2 style={{ fontSize: "clamp(1.8rem,5vw,3rem)" }}>
              {t(det, "title")}
            </h2>
            <span className="bd">{det.catFa}</span>
            <p style={{ maxWidth: "60ch" }}>{t(det, "desc")}</p>
            <div>{tags(det.stack)}</div>
            {det.url && (
              <p>
                <a
                  className="btn"
                  href={det.url}
                  target="_blank"
                  rel="noopener"
                >
                  {en ? "view project →" : "مشاهده پروژه →"}
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
              <b>{t(p, "title")}</b>
              <span className="bd">{p.catFa}</span>
            </div>
          ))
        ),
      )}
      {ov(
        "contact",
        "03",
        nav[2][2],
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
