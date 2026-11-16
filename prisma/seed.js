const {PrismaClient}=require("@prisma/client");const p=new PrismaClient();
(async()=>{
if(await p.project.count())return;
const S={nameFa:"سینا پیرزاده",nameEn:"Sina Pirzadeh",roleFa:"برنامه‌نویس فول‌استک",roleEn:"Full-Stack Developer",taglineFa:"وب‌اپلیکیشن‌ها و فروشگاه‌های اینترنتی را با Next.js و FastAPI می‌سازم.",taglineEn:"I build web apps and online stores with Next.js & FastAPI.",email:"pirzadehroot@gmail.com",phone:"09364733583",github:"pirroot",telegram:"pirroot",seoTitle:"سینا پیرزاده — برنامه‌نویس فول‌استک",seoDesc:"وب‌اپلیکیشن‌ها و فروشگاه‌های اینترنتی با Next.js و FastAPI."};
for(const[k,v]of Object.entries(S))await p.setting.upsert({where:{key:k},update:{value:v},create:{key:k,value:v}});
await p.project.createMany({data:[
{titleFa:"ایران پکیج",titleEn:"Iran Package",catFa:"فروشگاهی",descFa:"پلتفرم آموزشگاهی و فروشگاهی ریسپانسیو.",descEn:"Educational + commerce platform.",stack:"Next.js, FastAPI",sort:1},
{titleFa:"وب‌سایت Bellanzo",titleEn:"Bellanzo Website",catFa:"فروشگاهی",descFa:"وب‌سایت فروشگاهی مدرن با سئو تکنیکال.",descEn:"Modern e-commerce site with technical SEO.",stack:"Next.js, PostgreSQL, SEO",sort:2},
{titleFa:"سایت خبری Rahkar Javan",titleEn:"Rahkar Javan News",catFa:"آموزشگاهی",descFa:"پلتفرم خبری با مدیریت محتوا.",descEn:"News platform with CMS.",stack:"Next.js, PostgreSQL",sort:3},
{titleFa:"پلتفرم آموزشگاهی رایا",titleEn:"Raya Educational Platform",catFa:"آموزشگاهی",descFa:"سامانه آموزشگاهی با بک‌اند DRF.",descEn:"Educational platform with DRF backend.",stack:"Next.js, Django REST Framework",sort:4}]});
await p.experience.createMany({data:[
{companyFa:"ایران‌کتاب",companyEn:"Iran Ketab",periodFa:"۱۴۰۴ — اکنون",periodEn:"2025 — now",roleFa:"توسعه‌دهنده فول‌استک / سئو",roleEn:"Full-Stack Developer / SEO",descFa:"توسعه بک‌اند و فرانت‌اند و سئو.",descEn:"Full-stack development and SEO.",stack:"Next.js, FastAPI, PostgreSQL",sort:1},
{companyFa:"بارش",companyEn:"Barash",periodFa:"۱۴۰۲ — ۱۴۰۴",periodEn:"2023 — 2025",roleFa:"توسعه‌دهنده فرانت‌اند و بک‌اند",roleEn:"Front-End & Back-End Developer",descFa:"وب‌اپلیکیشن‌های سفارشی.",descEn:"Custom web apps.",stack:"Next.js, FastAPI",sort:2}]});
})().finally(()=>p.$disconnect());
