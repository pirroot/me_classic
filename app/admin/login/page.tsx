"use client";
import {useFormState} from "react-dom";
import {loginAction} from "../actions";
export default function Login(){
  const [st,act]=useFormState(loginAction,null as any);
  return <div className="wrap" style={{maxWidth:360,marginTop:"20vh",textAlign:"center"}} dir="rtl">
    <h2>ورود به مدیریت</h2><form action={act}><input name="pw" type="password" placeholder="password" autoFocus style={{textAlign:"center"}}/>
    <button className="btn">ورود</button></form>{st?.error&&<p className="err mono">{st.error}</p>}</div>;
}
