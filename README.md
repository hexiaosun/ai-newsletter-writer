# 📬 NewsLetterCraft

**AI-powered newsletter writer.** Turn bullet points into polished newsletters in seconds.

Built as a solopreneur SaaS — one person, one product, global audience.

---

## 🚀 Quick Start

### 1. Create Accounts (30 min)

| Service | What For | Sign Up Link |
|---|---|---|
| **GitHub** | Host the code | https://github.com |
| **Vercel** | Deploy the app (free) | https://vercel.com (login with GitHub) |
| **Clerk** | User authentication (free tier) | https://dashboard.clerk.com |
| **Supabase** | PostgreSQL database (free tier) | https://supabase.com |
| **OpenAI** | AI generation ($5 credit free) | https://platform.openai.com |
| **Stripe** | Payment processing | https://dashboard.stripe.com |

### 2. Get Your API Keys

**Clerk:**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com) → Create Application
2. Name it "NewsLetterCraft"
3. Copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
4. Go to **Webhooks** → Add Endpoint
   - Endpoint: `https://your-app.vercel.app/api/clerk/webhook`
   - Subscribe to: `user.created`, `user.updated`, `user.deleted`
   - Copy the "Signing Secret"

**OpenAI:**
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy it

**Supabase:**
1. Create a new project
2. Go to Project Settings → Database → Connection string
3. Copy the `DATABASE_URL` (the `postgresql://...` one)

**Stripe:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Enable "Test mode" (toggle in sidebar)
3. Get `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Go to Products → Create a product:
   - Name: "Pro Plan"
   - Price: $9/month (recurring)
   - Copy the Price ID
5. Go to Developers → Webhooks → Add endpoint:
   - Endpoint: `https://your-app.vercel.app/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`
   - Copy the "Signing secret"

### 3. Deploy to Vercel

```bash
# 1. Extract the project files
tar -xzf ai-newsletter-writer.tar.gz
cd ai-newsletter-writer

# 2. Create GitHub repo & push
git init
git add .
git commit -m "🎉 Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ai-newsletter-writer.git
git push -u origin main

# 3. Go to https://vercel.com → Add New Project → Import your GitHub repo
# 4. Add all environment variables from .env.example
# 5. Deploy!
```

### 4. Set Up Database

After deploying to Vercel:

```bash
# Install Vercel CLI locally
npm i -g vercel

# Link to your project
vercel link

# Push the database schema to Supabase
vercel env pull .env   # Get your production env vars
npx prisma db push     # Create the database tables
```

### 5. Done! 🎉

Visit your Vercel URL. Sign up, write some bullet points, and generate your first newsletter.

---

## 📋 Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Where to Get It |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Dashboard |
| `CLERK_SECRET_KEY` | Clerk Dashboard |
| `OPENAI_API_KEY` | OpenAI Platform |
| `STRIPE_SECRET_KEY` | Stripe Dashboard |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard (Webhooks) |
| `STRIPE_PRO_PRICE_ID` | Stripe Dashboard (Products) |
| `DATABASE_URL` | Supabase Project Settings |

---

## 🧰 Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | Clerk v7 |
| Database | PostgreSQL (Supabase) + Prisma |
| AI | OpenAI GPT-4o |
| Payments | Stripe |
| Deployment | Vercel |

---

## 📊 Revenue Model

| Plan | Price | Features |
|---|---|---|
| Free | $0 | 3 newsletters/month |
| Pro | $9/month | Unlimited, priority processing, history |

---

## 🛣️ Roadmap

- [ ] Email sending integration (Resend / SendGrid)
- [ ] Newsletter templates library
- [ ] AI tone customization
- [ ] Team/agency plans
- [ ] Substack & ConvertKit integration

---

## 🤝 Contributing

This is a solopreneur project. But if you find a bug or have an idea, open an issue!

---

_Built with ❤️ by one person for creators everywhere._
