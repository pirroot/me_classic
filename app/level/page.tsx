"use client";

import { useCallback, useEffect, useState } from "react";
import { Vazirmatn, Noto_Naskh_Arabic } from "next/font/google";
import { DATA } from "./data";
import "./roadmap.css";

const sans = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
});
const serif = Noto_Naskh_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-serif",
});

const KEY = "roadmap-v2-progress";
const TOTAL = DATA.length;
const SKILLS = DATA.reduce((n, m) => n + m.skills.length, 0);
const FA = (n: number) => n.toLocaleString("fa-IR");

function status(n: number) {
  if (n === 0)
    return {
      desc: "هنوز شروع نکردی. ماه اول منتظرته.",
      note: "هر سفری با یک قدم شروع می‌شه.",
    };
  if (n < 4)
    return {
      desc: `${FA(n)} ماه رو تموم کردی. عالی پیش می‌ری.`,
      note: "شتاب داری می‌گیری، ادامه بده.",
    };
  if (n < 8)
    return {
      desc: `${FA(n)} ماه از مسیر پشت سر گذاشتی.`,
      note: "بیشتر از نصف راه اومدی.",
    };
  if (n < TOTAL)
    return {
      desc: `فقط ${FA(TOTAL - n)} ماه مونده تا خط پایان.`,
      note: "نزدیکی؛ ریتم رو حفظ کن.",
    };
  return {
    desc: "تبریک! کل مسیر رو کامل کردی.",
    note: "تو الان یه مهندس متفاوتی نسبت به ۱۲ ماه پیش هستی.",
  };
}

export default function RoadmapPage() {
  const [done, setDone] = useState<Set<number>>(new Set());
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      setDone(new Set(JSON.parse(localStorage.getItem(KEY) || "[]")));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify([...done]));
    } catch {}
  }, [done, ready]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const closeModal = useCallback(() => setModal(null), []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [closeModal]);
  useEffect(() => {
    document.body.style.overflow = modal === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);

  const toggle = (i: number) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
        setToast(`ماه ${FA(i + 1)} دوباره به وضعیت «در انتظار» برگشت.`);
      } else {
        next.add(i);
        setToast(`آفرین! ماه ${FA(i + 1)} تکمیل شد.`);
      }
      return next;
    });

  const next = DATA.findIndex((_, i) => !done.has(i));
  const cont = () => {
    if (next === -1) setToast("همه‌ی ماه‌ها رو تموم کردی!");
    else setModal(next);
  };

  const n = done.size;
  const pct = Math.round((n / TOTAL) * 100);
  const st = status(n);
  const m = modal === null ? null : DATA[modal];

  return (
    <div
      className={`rm ${sans.variable} ${serif.variable}`}
      dir="rtl"
      lang="fa"
    >
      <main className="rm-wrap">
        <section className="rm-hero">
          <p className="rm-sub">
            هر ماه دو مهارت عمیق، یک پروژه‌ی واقعی، و یک قدم محکم رو به جلو.
            بدون حرکت تصادفی؛ فقط مسیر.
          </p>
          <div className="rm-cta">
            <a className="rm-btn rm-solid" href="#timeline">
              شروع مسیر
            </a>
            <button className="rm-btn" onClick={cont}>
              ادامه از جایی که ماندم
            </button>
          </div>

          <div className="rm-stats">
            <div>
              <b>{FA(n)}</b>
              <span>ماه تکمیل‌شده</span>
            </div>
            <div>
              <b>{FA(SKILLS)}</b>
              <span>مهارت فنی</span>
            </div>
            <div>
              <b>{FA(1095)}</b>
              <span>ساعت یادگیری</span>
            </div>
            <div>
              <b>{FA(n)}</b>
              <span>پروژه‌ی تحویلی</span>
            </div>
          </div>

          <div className="rm-progress">
            <div className="rm-pct">{FA(pct)}٪</div>
            <div className="rm-pbody">
              <h3>پیشرفت کل مسیر</h3>
              <div className="rm-bar" aria-label={`${n} از ${TOTAL} ماه`}>
                {DATA.map((_, i) => (
                  <i key={i} className={done.has(i) ? "on" : ""} />
                ))}
              </div>
              <p>{st.desc}</p>
              <p className="rm-note">{st.note}</p>
            </div>
          </div>
        </section>

        <h2 className="rm-section" id="timeline">
          برنامه ماهانه
          <small>روی هر ماه کلیک کن تا برنامه‌ی هفتگیش رو ببینی</small>
        </h2>

        <div className="rm-months">
          {DATA.map((d, i) => {
            const isDone = done.has(i);
            return (
              <article
                key={i}
                className={"rm-card" + (isDone ? " done" : "")}
                onClick={() => setModal(i)}
              >
                <div className="rm-ctop">
                  <span className="rm-mnum">ماه {FA(i + 1)}</span>
                  <span className="rm-chip">
                    {isDone ? "تکمیل شد" : "در انتظار"}
                  </span>
                </div>
                <h3 className="rm-skills">{d.skills.join(" + ")}</h3>
                <p className="rm-soft">
                  مهارت نرم: <b>{d.soft}</b>
                </p>
                <p className="rm-proj">{d.project}</p>
                <div className="rm-cfoot">
                  <button
                    className="rm-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModal(i);
                    }}
                  >
                    جزئیات هفتگی
                  </button>
                  <button
                    className="rm-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(i);
                    }}
                  >
                    {isDone ? "بازگشت به در انتظار" : "تکمیل ماه"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <h2 className="rm-section">سه قانون طلایی</h2>
        <div className="rm-rules">
          <div>
            <h4>۳ ساعت، هر روز</h4>
            <p>
              روزانه ۳ ساعت زمان بگذار؛ حتی در روزهای بد. استمرار، از استعداد
              مهم‌تره.
            </p>
          </div>
          <div>
            <h4>بساز، فقط نبین</h4>
            <p>
              آموزش دیدن کافی نیست؛ هر مهارت رو با تمرین و یک خروجی واقعی یاد
              بگیر.
            </p>
          </div>
          <div>
            <h4>یادداشت‌برداری عمومی</h4>
            <p>
              هر هفته یادداشت یادگیریت رو عمومی منتشر کن؛ آموزش دادن، بهترین راه
              تثبیته.
            </p>
          </div>
        </div>

        <footer className="rm-foot">
          ساخته‌شده برای مسیر شخصی تو · کاملاً آفلاین · پیشرفتت همین‌جا ذخیره
          می‌شه
        </footer>
      </main>

      {m && modal !== null && (
        <div
          className="rm-ov"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="rm-modal" role="dialog" aria-modal="true">
            <div className="rm-mhead">
              <h3>
                ماه {FA(modal + 1)} · {m.skills.join(" + ")}
              </h3>
              <button className="rm-btn" onClick={closeModal}>
                بستن [esc]
              </button>
            </div>
            <p className="rm-soft">
              مهارت نرم این ماه: <b>{m.soft}</b>
            </p>
            <ol className="rm-weeks">
              {m.weeks.map((w, k) => (
                <li key={k}>
                  <b>هفته {FA(k + 1)}</b>
                  <span>{w}</span>
                </li>
              ))}
            </ol>
            <p className="rm-deliver">
              <b>پروژه‌ی تحویلی این ماه:</b> {m.project}
            </p>
            <button
              className="rm-btn rm-solid rm-full"
              onClick={() => {
                toggle(modal);
                closeModal();
              }}
            >
              {done.has(modal)
                ? "برگرده به وضعیت «در انتظار»"
                : "این ماه رو تکمیل کردم"}
            </button>
          </div>
        </div>
      )}

      <div className={"rm-toast" + (toast ? " show" : "")} role="status">
        {toast}
      </div>
    </div>
  );
}
