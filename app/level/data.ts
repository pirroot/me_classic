export type Month = {
  skills: string[];
  soft: string;
  project: string;
  weeks: string[];
};

export const DATA: Month[] = [
  { skills: ["Docker", "Production Deployment"], soft: "تمرکز عمیق",
    project: "یک اپ کوچیک رو با Docker کانتینری کن و روی سرور واقعی Deploy کن.",
    weeks: ["مفاهیم کانتینر، ایمیج و Dockerfile", "Docker Compose و چندسرویسی کردن", "Nginx، دامنه و HTTPS با Let's Encrypt", "Deploy نهایی، مانیتورینگ و لاگ‌گیری"] },
  { skills: ["FastAPI", "معماری API"], soft: "مدیریت زمان",
    project: "یک REST API کامل با احراز هویت، صفحه‌بندی و مستندات Swagger بساز.",
    weeks: ["مبانی FastAPI و مسیرها (Routes)", "Pydantic، اعتبارسنجی و Dependency Injection", "احراز هویت JWT و سطح دسترسی", "معماری لایه‌ای و مستندسازی خودکار"] },
  { skills: ["PostgreSQL", "بهینه‌سازی دیتابیس"], soft: "تفکر انتقادی",
    project: "طراحی اسکیمای یک سیستم واقعی (مثل فروشگاه) با کوئری‌های بهینه و ایندکس درست.",
    weeks: ["طراحی اسکیما، انواع داده و روابط", "کوئری‌های پیشرفته، JOIN و Window Functions", "ایندکس‌گذاری و خواندن EXPLAIN", "تراکنش‌ها، قفل‌ها و مهاجرت‌ها"] },
  { skills: ["LLM APIs", "ساخت قابلیت‌های AI"], soft: "خلاقیت",
    project: "یک دستیار هوشمند بساز که روی داده‌ی خودت آموزش ببینه و به سؤال جواب بده.",
    weeks: ["مدل‌های زبانی، Token و Prompt Engineering", "استریمینگ، قابلیت فراخوانی تابع (Function Calling)", "مدیریت خطا، رتبه‌بندی و هزینه‌ی API", "ساخت محصول نهایی با رابط کاربری"] },
  { skills: ["RAG", "Vector Database"], soft: "حل مسئله",
    project: "موتور جست‌وجوی معنایی روی مستنداتت بساز؛ سؤال بپرس، سند دقیق رو پیدا کن.",
    weeks: ["جاسازی متن (Embeddings) و شباهت معنایی", "Pinecone یا pgvector و ذخیره‌سازی برداری", "جداسازی chunk، بازیابی و بازترکیب", "ارزیابی کیفیت و بهینه‌سازی نتایج"] },
  { skills: ["AI Agents", "LangGraph"], soft: "ارتباط مؤثر",
    project: "یک Agent چندمرحله‌ای بساز که یه کار چندمرحله‌ای رو خودش تا آخر انجام بده.",
    weeks: ["مفهوم Agent، ابزارها و حافظه", "LangGraph و ساخت گراف‌های وضعیت‌محور", "Multi-Agent و Human-in-the-loop", "Agent محصولی با مانیتورینگ خطاها"] },
  { skills: ["Testing", "Software Quality"], soft: "نظم و استمرار",
    project: "پوشش تست ۸۰٪+ برای یکی از پروژه‌های قبلی‌ات بساز + CI سبک.",
    weeks: ["تست واحد با pytest و ساختار خوب", "Mock کردن، فیکسچر و پایپ‌لاین تست", "تست یکپارچه (Integration) و E2E", "Coverage، معیار کیفیت و عادت روزانه"] },
  { skills: ["Linux", "Networking"], soft: "یادگیری مستقل",
    project: "یک سرور لینوکسی رو از صفر کانفیگ کن؛ امن، سریع و آماده‌ی سرویس.",
    weeks: ["خط فرمان، فایل‌سیستم و مدیریت سرویس‌ها", "کاربران، مجوزها و سخت‌گیری امنیتی", "مبانی شبکه؛ IP، DNS، پورت و فایروال", "عیب‌یابی زنده با strace، tcpdump و لاگ‌ها"] },
  { skills: ["CI/CD", "Cloud Deployment"], soft: "مدیریت پروژه",
    project: "پایپ‌لاین کامل: push کن ← تست ← بیلد ← deploy خودکار روی کلاد.",
    weeks: ["GitHub Actions و پایپ‌لاین تست", "بیلد ایمیج Docker و رجیستری", "Deploy خودکار و استراتژی‌های انتشار", "اجرا روی کلاد (AWS/GCP/مشابه) + مانیتورینگ"] },
  { skills: ["System Design"], soft: "تصمیم‌گیری",
    project: "طراحی معماری یک سیستم در مقیاس میلیون کاربر رو روی کاغذ کامل کن و دفاع کن.",
    weeks: ["مقیاس‌پذیری افقی/عمودی و کشینگ", "صف‌ها، پردازش ناهمگام و پایداری", "شاردینگ، Replication و سازگاری", "طراحی یک سیستم کامل + مرور مصاحبه‌ای"] },
  { skills: ["Application Security"], soft: "مذاکره",
    project: "یکی از پروژه‌هات رو از نظر امنیتی ممیزی کن و حفره‌ها رو ببند.",
    weeks: ["OWASP Top 10 و حملات رایج", "امنیت API، Rate Limiting و SQL Injection", "مدیریت رمز، رازها و Secret Management", "تست نفوذ سبک و چک‌لیست امنیتی"] },
  { skills: ["Product Engineering"], soft: "تفکر استراتژیک",
    project: "یک محصول کامل و قابل ارائه بساز؛ از ایده تا کاربر واقعی.",
    weeks: ["کشف مسئله، کاربر و ارزش واقعی", "MVP و چرخه‌ی سریع ساختن", "بازخورد کاربران و تکرار", "ارائه‌ی نهایی، پرتفوی و رزومه"] },
];
