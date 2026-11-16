import {prisma} from "@/lib/db";
import {isAuthed} from "@/lib/auth";
export async function GET(){
  if(!isAuthed())return new Response("unauthorized",{status:401});
  const data={settings:await prisma.setting.findMany(),projects:await prisma.project.findMany(),experience:await prisma.experience.findMany(),messages:await prisma.message.findMany()};
  return new Response(JSON.stringify(data,null,2),{headers:{"content-type":"application/json","content-disposition":"attachment; filename=pirroot-export.json"}});
}
