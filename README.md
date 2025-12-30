# Hallel Diamonds - Jewelry Catalog Website

אתר קטלוג תכשיטים מודרני עם תמיכה בעברית, אנגלית וערבית.

## טכנולוגיות

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (PostgreSQL + Storage)
- **Node.js** (API Routes)

## התקנה מקומית

1. התקן dependencies:
```bash
npm install
```

2. צור קובץ `.env` מהדוגמה:
```bash
cp .env.example .env
```

3. מלא את הערכים ב-`.env`:
   - `NEXT_PUBLIC_SUPABASE_URL` - כתובת Supabase שלך
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - מפתח Anon
   - `SUPABASE_SERVICE_ROLE_KEY` - מפתח Service Role
   - `NEXT_PUBLIC_BASE_URL` - כתובת האתר (localhost:3000 לפיתוח)
   - `NEXT_PUBLIC_WHATSAPP_PHONE` - מספר וואטסאפ בפורמט בינלאומי

4. הרץ את המיגרציה ב-Supabase:
   - פתח את Supabase Dashboard
   - לך ל-SQL Editor
   - העתק את התוכן מ-`supabase/migrations/001_initial_schema.sql`
   - הרץ את ה-SQL

5. (אופציונלי) מלא נתונים ראשוניים:
```bash
npm run seed
```

6. הרץ את השרת:
```bash
npm run dev
```

האתר יעבוד גם בלי Supabase - הוא ישתמש ב-mock data מהקובץ `lib/mockData.ts`.

## פריסה ב-Vercel

1. דחוף את הקוד ל-GitHub/GitLab/Bitbucket

2. התחבר ל-Vercel:
   - לך ל-[vercel.com](https://vercel.com)
   - התחבר עם חשבון GitHub שלך
   - לחץ על "New Project"
   - בחר את ה-repository

3. הגדר משתני סביבה ב-Vercel:
   - לך ל-Project Settings → Environment Variables
   - הוסף את כל המשתנים מ-`.env.example`
   - **חשוב**: וודא ש-`NEXT_PUBLIC_BASE_URL` מוגדר ל-URL של Vercel (או השאר ריק)

4. Vercel יבנה ויפרס את האתר אוטומטית

### משתני סביבה נדרשים ב-Vercel:

- `NEXT_PUBLIC_SUPABASE_URL` - כתובת Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - מפתח Anon
- `SUPABASE_SERVICE_ROLE_KEY` - מפתח Service Role (שרת בלבד!)
- `NEXT_PUBLIC_BASE_URL` - כתובת האתר (אופציונלי, Vercel יגדיר אוטומטית)
- `NEXT_PUBLIC_WHATSAPP_PHONE` - מספר וואטסאפ
- `SESSION_SECRET` - מפתח אקראי (הרץ: `openssl rand -base64 32`)

### משתנים אופציונליים:

- `RESEND_API_KEY` - לשליחת מיילים (או SMTP_*)
- `TWILIO_*` - להודעות וואטסאפ לניהול
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - ל-Google Analytics

## מבנה הפרויקט

```
diamond/
├── app/                    # Next.js App Router
│   ├── api/                # API Routes
│   ├── catalog/            # דף קטלוג
│   ├── product/            # דפי מוצר
│   └── admin/              # פאנל ניהול
├── components/             # קומפוננטים
│   ├── catalog/            # קומפוננטים לקטלוג
│   ├── layout/             # Header, Footer
│   └── ui/                 # קומפוננטים בסיסיים
├── lib/                    # ספריות עזר
│   ├── mockData.ts         # Mock data (ללא Supabase)
│   └── supabaseServerClient.ts
├── public/                 # קבצים סטטיים
│   └── demo/               # תמונות דמו
└── supabase/               # מיגרציות DB
    └── migrations/
```

## תכונות

- ✅ קטלוג מוצרים מלא
- ✅ תמיכה בעברית, אנגלית וערבית (RTL/LTR)
- ✅ גלריית תמונות עם zoom מתקדם
- ✅ אינטגרציה עם WhatsApp
- ✅ טופס עיצוב אישי
- ✅ פאנל ניהול (admin)
- ✅ SEO מותאם
- ✅ עיצוב responsive
- ✅ עובד גם בלי Supabase (mock data)

## פיתוח

```bash
# פיתוח
npm run dev

# Build לפרודקשן
npm run build

# הרצה מקומית של build
npm start

# Seed נתונים
npm run seed
```

## רישיון

Private - Hallel Diamonds

