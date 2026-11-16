"use server";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";
import {prisma,FIELDS,SETTING_KEYS} from "@/lib/db";
import {isAuthed,tryLogin} from "@/lib/auth";
const guard=()=>{if(!isAuthed())redirect("/admin/login")};
const M=(m:string)=>{if(!FIELDS[m])throw new Error("bad model");return (prisma as any)[m]};
const done=(to:string)=>{revalidatePath("/");revalidatePath("/admin","layout");redirect(to)};
export async function loginAction(_:any,fd:FormData){const e=await tryLogin(String(fd.get("pw")||""));if(e)return {error:e};redirect("/admin")}
export async function logout(){cookies().delete("s");redirect("/admin/login")}
export async function saveItem(fd:FormData){guard();
  const model=String(fd.get("model")),id=Number(fd.get("id")||0),data:any={};
  for(const f of FIELDS[model])data[f[0]]=f[2]==="number"?Number(fd.get(f[0])||0):String(fd.get(f[0])??"");
  data.published=fd.get("published")==="on";
  id?await M(model).update({where:{id},data}):await M(model).create({data});done("/admin/"+model)}
export async function deleteItem(fd:FormData){guard();await M(String(fd.get("model"))).delete({where:{id:Number(fd.get("id"))}});done("/admin/"+fd.get("model"))}
export async function togglePublish(fd:FormData){guard();const m=M(String(fd.get("model"))),id=Number(fd.get("id")),r=await m.findUnique({where:{id}});await m.update({where:{id},data:{published:!r.published}});done("/admin/"+fd.get("model"))}
export async function moveItem(fd:FormData){guard();const m=M(String(fd.get("model"))),id=Number(fd.get("id")),d=Number(fd.get("d"));await m.update({where:{id},data:{sort:{increment:d}}});done("/admin/"+fd.get("model"))}
export async function msgRead(fd:FormData){guard();const id=Number(fd.get("id"));const r=await prisma.message.findUnique({where:{id}});await prisma.message.update({where:{id},data:{read:!r?.read}});done("/admin/messages")}
export async function msgDelete(fd:FormData){guard();await prisma.message.delete({where:{id:Number(fd.get("id"))}});done("/admin/messages")}
export async function saveSettings(fd:FormData){guard();for(const k of SETTING_KEYS){const value=String(fd.get(k)??"");await prisma.setting.upsert({where:{key:k},update:{value},create:{key:k,value}})}done("/admin/settings")}
