# 📬 NewsLetterCraft

**AI-powered newsletter writer.** Turn bullet points into polished newsletters in seconds.

---

## 🚀 Deploy on Zeabur (China-friendly)

### 1. Go to Zeabur
Open https://zeabur.com on your phone/browser

- Sign up with **GitHub**
- Click **Create Project**
- Choose **Deploy from Git Repository**
- Select `hexiaosun/ai-newsletter-writer`
- Framework: select **Next.js**
- Click **Deploy**

### 2. Fill Environment Variables

Once deployed, go to the **Environment** tab and add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://gybjtbrzefftfglqdfos.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJI...` (the long key) |
| `DATABASE_URL` | `postgresql://postgres:hyx%40HYX8737@db.gybjtbrzefftfglqdfos.supabase.co:5432/postgres` |
| `NEXT_PUBLIC_APP_URL` | Your Zeabur URL (e.g. `https://newslettercraft.zeabur.app`) |
| `OPENAI_API_KEY` | Get from https://platform.openai.com |
| `STRIPE_SECRET_KEY` | (Optional) Get from Stripe |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | (Optional) Get from Stripe |
| `STRIPE_PRO_PRICE_ID` | (Optional) Get from Stripe |

### 3. Set Up Database Tables

After deployment, run this command in your Zeabur console:

```bash
npx prisma db push
```

### 4. Done! 🎉

Visit your Zeabur URL. Sign up and start writing!

---

## 🧰 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Auth:** Supabase Auth (email + password)
- **Database:** PostgreSQL (Supabase) + Prisma
- **AI:** OpenAI GPT-4o
- **Payments:** Stripe
- **Deployment:** Zeabur
