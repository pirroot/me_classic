import Link from "next/link";
import type { Metadata } from "next";
import "./status.css";

export const metadata: Metadata = {
  title: "404 | Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="st">
      <div className="st-box">
        <p className="st-code">۴۰۴</p>
        <h1>صفحه‌ای که دنبالش بودی پیدا نشد</h1>
        <p>ممکنه آدرس اشتباه باشه یا صفحه جابه‌جا شده باشه.</p>
        <p dir="ltr" lang="en">
          The page you were looking for doesn’t exist or has moved.
        </p>
        <div className="st-act">
          <Link className="st-btn" href="/">
            بازگشت به صفحه اصلی · Home
          </Link>
        </div>
      </div>
    </div>
  );
}
