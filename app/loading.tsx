import "./status.css";

export default function Loading() {
  return (
    <div className="st" role="status" aria-label="Loading">
      <div className="st-box">
        <span className="st-load" style={{ display: "inline-block" }} />
        <p>در حال بارگذاری…</p>
      </div>
    </div>
  );
}
