import {redirect} from "next/navigation";
import {isAuthed} from "@/lib/auth";
import {logout} from "../actions";
export const dynamic="force-dynamic";
export default function Panel({children}:{children:React.ReactNode}){
  if(!isAuthed())redirect("/admin/login");
  return <div className="wrap" dir="rtl"><nav className="adm mono">
    {[["","داشبورد"],["project","پروژه‌ها"],["experience","سوابق"],["messages","پیام‌ها"],["settings","تنظیمات"]].map(([h,l])=><a key={h} href={"/admin/"+h}>{l}</a>)}
    <a href="/" target="_blank">مشاهده سایت ↗</a><a href="/admin/export">خروجی JSON</a>
    <form action={logout} style={{marginInlineStart:"auto"}}><button className="btn">خروج</button></form></nav>{children}</div>;
}
