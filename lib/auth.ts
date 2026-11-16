import crypto from "crypto";
import {cookies,headers} from "next/headers";
import {prisma} from "./db";
const MAX=3, LOCK_MS=5*60*1000, SESSION_MS=8*3600*1000;
const sign=(v:string)=>crypto.createHmac("sha256",process.env.SESSION_SECRET||"").update(v).digest("hex");
const h=(v:string)=>crypto.createHash("sha256").update(v).digest();
export function isAuthed(){
  const c=cookies().get("s")?.value; if(!c||!process.env.SESSION_SECRET)return false;
  const [exp,sig]=c.split("."); if(!exp||!sig||+exp<Date.now())return false;
  const a=Buffer.from(sig),b=Buffer.from(sign(exp));
  return a.length===b.length&&crypto.timingSafeEqual(a,b);
}
export async function tryLogin(pw:string):Promise<string|null>{
  const ip=(headers().get("x-forwarded-for")||"local").split(",")[0].trim();
  const a=await prisma.attempt.findUnique({where:{ip}}); const now=new Date();
  if(a?.lockedUntil&&a.lockedUntil>now)return `قفل شدی؛ ${Math.ceil((+a.lockedUntil-+now)/60000)} دقیقه دیگه امتحان کن`;
  const real=process.env.ADMIN_PASSWORD||"";
  if(real&&crypto.timingSafeEqual(h(pw),h(real))){
    await prisma.attempt.deleteMany({where:{ip}});
    const exp=String(Date.now()+SESSION_MS);
    cookies().set("s",`${exp}.${sign(exp)}`,{httpOnly:true,sameSite:"strict",secure:process.env.NODE_ENV==="production",path:"/",maxAge:SESSION_MS/1000});
    return null;
  }
  const fails=(a?.fails??0)+1, lock=fails>=MAX;
  const lu=lock?new Date(Date.now()+LOCK_MS):null;
  await prisma.attempt.upsert({where:{ip},update:{fails:lock?0:fails,lockedUntil:lu},create:{ip,fails:lock?0:fails,lockedUntil:lu}});
  return lock?"۳ بار اشتباه — ۵ دقیقه قفل شدی":`رمز اشتباه است (${fails}/${MAX})`;
}
