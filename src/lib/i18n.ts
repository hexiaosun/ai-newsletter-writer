/** Simple i18n system — no external deps needed */

export type Locale = "en" | "zh";

export const locales: Locale[] = ["en", "zh"];

export const defaultLocale: Locale = "en";

const dict: Record<Locale, Record<string, string>> = {
  en: {
    // Brand
    "brand.name": "NewsLetterCraft",
    "brand.tagline": "AI-Powered Newsletters in Seconds",

    // Nav
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.dashboard": "Dashboard",
    "nav.getStarted": "Get Started",
    "nav.signOut": "Sign Out",

    // Hero
    "hero.badge": "Powered by GPT-4o",
    "hero.title": "Write Newsletters",
    "hero.title.highlight": "10x Faster",
    "hero.subtitle":
      "Drop in your bullet points, pick a style, and let AI craft a polished newsletter in seconds.",
    "hero.cta": "Start Writing Free →",
    "hero.cta.dashboard": "Go to Dashboard →",
    "hero.secondary": "See How It Works",
    "hero.note": "No credit card • 3 free generations",

    // Features
    "features.title": "From Ideas to Newsletter",
    "features.subtitle": "Three simple steps. No templates. No fluff.",
    "features.1.title": "Jot Down Ideas",
    "features.1.desc":
      "Write 3-5 bullet points. That's it — no drafts, no formatting.",
    "features.2.title": "Pick Your Style",
    "features.2.desc":
      "Professional, Casual, or Storytelling. We match your voice.",
    "features.3.title": "Get Results",
    "features.3.desc":
      "AI writes a complete newsletter with subject line, body, and CTA.",

    // Pricing
    "pricing.title": "Simple Pricing",
    "pricing.subtitle": "Start free. Upgrade when you're ready.",
    "pricing.free.title": "Free",
    "pricing.free.price": "$0",
    "pricing.free.desc": "Perfect for trying it out",
    "pricing.free.perks.0": "3 newsletters per month",
    "pricing.free.perks.1": "All 3 writing styles",
    "pricing.free.perks.2": "Markdown export",
    "pricing.free.perks.3": "Basic support",
    "pricing.free.cta": "Get Started Free",
    "pricing.free.current": "Current Plan",
    "pricing.pro.title": "Pro",
    "pricing.pro.price": "$9",
    "pricing.pro.desc": "For serious creators",
    "pricing.pro.perks.0": "Unlimited newsletters",
    "pricing.pro.perks.1": "Priority AI processing",
    "pricing.pro.perks.2": "Save & manage history",
    "pricing.pro.perks.3": "Email export",
    "pricing.pro.perks.4": "Priority support",
    "pricing.pro.cta": "Upgrade to Pro →",
    "pricing.pro.badge": "Most Popular",
    "pricing.signup": "Sign Up First",

    // CTA
    "cta.badge": "Ready in 30 seconds",
    "cta.title": "Your next newsletter is",
    "cta.title.highlight": "30 seconds away",
    "cta.subtitle": "Join creators who save hours every week.",

    // Auth
    "signin.title": "Welcome back",
    "signin.subtitle": "Sign in to NewsLetterCraft",
    "signin.email": "Email",
    "signin.password": "Password",
    "signin.placeholder.email": "you@example.com",
    "signin.cta": "Sign In →",
    "signin.loading": "Signing in...",
    "signin.noAccount": "Don't have an account?",
    "signin.signup": "Sign up",
    "signup.title": "Join NewsLetterCraft",
    "signup.subtitle": "Start writing better newsletters",
    "signup.name": "Name (optional)",
    "signup.placeholder.name": "Your name",
    "signup.email": "Email",
    "signup.password": "Password",
    "signup.placeholder.password": "At least 6 characters",
    "signup.cta": "Create Account",
    "signup.loading": "Creating account...",
    "signup.hasAccount": "Already have an account?",
    "signup.signin": "Sign in",

    // Settings
    "settings.title": "Settings",
    "settings.profile": "Profile",
    "settings.noName": "No name set",
    "settings.memberSince": "Member since",
    "settings.userId": "User ID",
    "settings.subscription": "Subscription & Usage",
    "settings.currentPlan": "Current Plan",
    "settings.upgrade": "Upgrade to Pro →",
    "settings.active": "Active",
    "settings.usage": "Usage",
    "settings.totalGenerated": "Generated",
    "settings.remaining": "Remaining",
    "settings.plan": "Plan",
    "settings.danger": "Danger Zone",
    "settings.dangerDesc": "Permanently delete your account and all data. This action cannot be undone.",
    "settings.confirmDelete": "Are you sure? This will permanently delete your account and all newsletters.",
    "settings.deleteAccount": "Delete Account",

    // Dashboard
    "dash.welcome": "Welcome back",
    "dash.plan": "Plan",
    "dash.upgrade": "Upgrade to Pro →",
    "dash.written": "Newsletters Written",
    "dash.credits": "Credits Remaining",
    "dash.recent": "Recent Newsletters",
    "dash.empty": "No newsletters yet",
    "dash.empty.cta": "Create Your First Newsletter",
    "dash.writeNew": "Write New",
    "dash.new": "+ New Newsletter",
    "dash.overview": "Overview",
    "dash.generate": "Generate",
    "dash.settings": "Settings",
    "dash.history": "History",

    // Generate
    "gen.title": "Create Newsletter",
    "gen.subtitle": "Write your bullet points, pick a tone, and let AI do the rest.",
    "gen.label": "Your Bullet Points",
    "gen.hint": "One idea per line. 3-5 points works best.",
    "gen.placeholder":
      'Example:\nLaunched our new AI feature this week\nCustomer feedback has been amazing\nPlanning the next release for Q3',
    "gen.style": "Style",
    "gen.style.professional": "Professional",
    "gen.style.casual": "Casual",
    "gen.style.storytelling": "Storytelling",
    "gen.style.professional.desc": "Formal, data-driven",
    "gen.style.casual.desc": "Friendly, conversational",
    "gen.style.storytelling.desc": "Narrative, engaging",
    "gen.cta": "Generate Newsletter →",
    "gen.loading": "Generating...",
    "gen.preview": "Preview",
    "gen.copy": "Copy to Clipboard",
    "gen.placeholder.result": "Your newsletter will appear here",
    "gen.error.min": "Enter at least 2-3 bullet points for a good newsletter.",
    "gen.error.network": "Network error. Please check your connection and try again.",
    "gen.error.credits":
      "You've used all your free credits. Upgrade to Pro for unlimited newsletters!",

    // History
    "history.title": "History",
    "history.empty": "No newsletters yet",
    "history.empty.cta": "Create Your First",

    // Demo
    "demo.title": "See it in action",
    "demo.subtitle": "Drop in 3 bullet points. Get a full newsletter. That's it.",
    "demo.badge": "AI Generated",
    "demo.subject": "Our Biggest Launch Yet",
    "demo.dear": "Dear readers,",
    "demo.p1": "This week we shipped something we've been working on for months. And the response? Overwhelming.",
    "demo.h2.1": "What We Launched",
    "demo.p2": "After countless iterations, our AI-powered dashboard is finally live. Users are reporting massive time savings.",
    "demo.h2.2": "What Users Are Saying",
    "demo.p3": "This tool changed how I work. — Sarah, PM at TechCorp",
    "demo.h2.3": "What's Next",
    "demo.p4": "We're hiring! If you're passionate about building tools that make people's lives easier, we want to talk.",
    "demo.cta": "Try it yourself →",

    // Logo cloud
    "logo.title": "Used by creators on",

    // Language
    "lang.switch": "中文",
    "lang.label": "Language",

    // Footer
    "footer.tagline": "Built for creators, by creators.",
  },

  zh: {
    // Brand
    "brand.name": "NewsLetterCraft",
    "brand.tagline": "AI 驱动的 Newsletter 生成器",

    // Nav
    "nav.features": "功能介绍",
    "nav.pricing": "价格方案",
    "nav.dashboard": "控制台",
    "nav.getStarted": "免费开始",
    "nav.signOut": "退出登录",

    // Hero
    "hero.badge": "由 GPT-4o 驱动",
    "hero.title": "写 Newsletter",
    "hero.title.highlight": "快 10 倍",
    "hero.subtitle":
      "写下你的要点，选择风格，AI 在几秒内帮你写出一篇完整的 Newsletter。",
    "hero.cta": "免费开始使用 →",
    "hero.cta.dashboard": "进入控制台 →",
    "hero.secondary": "了解工作原理",
    "hero.note": "无需信用卡 • 3 次免费生成",

    // Features
    "features.title": "从灵感到成文",
    "features.subtitle": "三个简单步骤。不需要模板，不需要折腾。",
    "features.1.title": "写下要点",
    "features.1.desc": "写 3-5 个要点。就这样——不需要草稿，不需要排版。",
    "features.2.title": "选择风格",
    "features.2.desc": "专业、随意、讲故事——三种风格任你选。",
    "features.3.title": "获得结果",
    "features.3.desc": "AI 自动生成完整的 Newsletter，包含标题、正文和行动号召。",

    // Pricing
    "pricing.title": "简洁定价",
    "pricing.subtitle": "免费开始。准备好了再升级。",
    "pricing.free.title": "免费版",
    "pricing.free.price": "¥0",
    "pricing.free.desc": "适合先试试看",
    "pricing.free.perks.0": "每月 3 篇 Newsletter",
    "pricing.free.perks.1": "全部 3 种写作风格",
    "pricing.free.perks.2": "Markdown 导出",
    "pricing.free.perks.3": "基础支持",
    "pricing.free.cta": "免费使用",
    "pricing.free.current": "当前方案",
    "pricing.pro.title": "专业版",
    "pricing.pro.price": "¥59",
    "pricing.pro.desc": "适合认真创作的你",
    "pricing.pro.perks.0": "无限 Newsletter 生成",
    "pricing.pro.perks.1": "优先 AI 处理",
    "pricing.pro.perks.2": "保存管理历史记录",
    "pricing.pro.perks.3": "邮件导出",
    "pricing.pro.perks.4": "优先支持",
    "pricing.pro.cta": "升级到专业版 →",
    "pricing.pro.badge": "最受欢迎",
    "pricing.signup": "先注册",

    // CTA
    "cta.badge": "30 秒开始",
    "cta.title": "你的下一封 Newsletter",
    "cta.title.highlight": "只需 30 秒",
    "cta.subtitle": "加入创作者的行列，每周节省数小时。",

    // Auth
    "signin.title": "欢迎回来",
    "signin.subtitle": "登录 NewsLetterCraft",
    "signin.email": "邮箱",
    "signin.password": "密码",
    "signin.placeholder.email": "you@example.com",
    "signin.cta": "登录 →",
    "signin.loading": "登录中...",
    "signin.noAccount": "还没有账号？",
    "signin.signup": "注册",
    "signup.title": "加入 NewsLetterCraft",
    "signup.subtitle": "开始写出更好的 Newsletter",
    "signup.name": "昵称（选填）",
    "signup.placeholder.name": "你的名字",
    "signup.email": "邮箱",
    "signup.password": "密码",
    "signup.placeholder.password": "至少 6 个字符",
    "signup.cta": "创建账号",
    "signup.loading": "创建中...",
    "signup.hasAccount": "已有账号？",
    "signup.signin": "登录",

    // Settings
    "settings.title": "设置",
    "settings.profile": "个人信息",
    "settings.noName": "未设置昵称",
    "settings.memberSince": "注册时间",
    "settings.userId": "用户 ID",
    "settings.subscription": "订阅与用量",
    "settings.currentPlan": "当前方案",
    "settings.upgrade": "升级到专业版 →",
    "settings.active": "已激活",
    "settings.usage": "使用情况",
    "settings.totalGenerated": "已生成",
    "settings.remaining": "剩余次数",
    "settings.plan": "方案",
    "settings.danger": "危险区",
    "settings.dangerDesc": "永久删除你的账号及所有数据。此操作不可撤销。",
    "settings.confirmDelete": "确定吗？这将永久删除你的账号和所有 Newsletter。",
    "settings.deleteAccount": "删除账号",

    // Dashboard
    "dash.welcome": "欢迎回来",
    "dash.plan": "当前方案",
    "dash.upgrade": "升级到专业版 →",
    "dash.written": "已写篇数",
    "dash.credits": "剩余次数",
    "dash.recent": "最近的 Newsletter",
    "dash.empty": "还没有写过 Newsletter",
    "dash.empty.cta": "创建你的第一篇",
    "dash.writeNew": "写新的",
    "dash.new": "+ 新建 Newsletter",
    "dash.overview": "概览",
    "dash.generate": "生成",
    "dash.settings": "设置",
    "dash.history": "历史记录",

    // Generate
    "gen.title": "创建 Newsletter",
    "gen.subtitle": "写下你的要点，选择语气风格，剩下的交给 AI。",
    "gen.label": "你的要点",
    "gen.hint": "每行一个观点。3-5 个效果最好。",
    "gen.placeholder": "示例：\n本周发布了新的 AI 功能\n客户反馈非常好\n正在规划 Q3 的发布计划",
    "gen.style": "风格",
    "gen.style.professional": "专业",
    "gen.style.casual": "随意",
    "gen.style.storytelling": "讲故事",
    "gen.style.professional.desc": "正式、数据驱动",
    "gen.style.casual.desc": "友好、对话式",
    "gen.style.storytelling.desc": "叙事、有感染力",
    "gen.cta": "生成 Newsletter →",
    "gen.loading": "生成中...",
    "gen.preview": "预览",
    "gen.copy": "复制到剪贴板",
    "gen.placeholder.result": "你的 Newsletter 将显示在这里",
    "gen.error.min": "至少输入 2-3 个要点才能生成好的 Newsletter。",
    "gen.error.network": "网络错误，请检查连接后重试。",
    "gen.error.credits": "免费次数已用完。升级到专业版获得无限次生成！",

    // History
    "history.title": "历史记录",
    "history.empty": "还没有写过 Newsletter",
    "history.empty.cta": "创建第一篇",

    // Demo
    "demo.title": "看效果",
    "demo.subtitle": "输入 3 个要点，AI 自动生成完整 Newsletter。就这么简单。",
    "demo.badge": "AI 生成",
    "demo.subject": "我们最大的一次发布",
    "demo.dear": "亲爱的读者们，",
    "demo.p1": "这周我们发布了几个月来一直在打磨的产品。用户的反馈如何？超出预期。",
    "demo.h2.1": "我们发布了什么",
    "demo.p2": "经过无数次迭代，我们的 AI 驱动仪表盘终于上线了。用户反馈节省了大量时间。",
    "demo.h2.2": "用户怎么说",
    "demo.p3": "这款工具改变了我的工作方式。—  Sarah，TechCorp 产品经理",
    "demo.h2.3": "下一步",
    "demo.p4": "我们在招人！如果你也热爱打造让生活更美好的工具，欢迎加入。",
    "demo.cta": "亲自试试 →",

    // Logo cloud
    "logo.title": "被这些平台的创作者使用",

    // Language
    "lang.switch": "English",
    "lang.label": "语言",

    // Footer
    "footer.tagline": "为创作者而生。",
  },
};

export function getTranslations(locale: Locale) {
  return (key: string): string => {
    return dict[locale]?.[key] ?? dict.en[key] ?? key;
  };
}

/** Get the locale from a cookie (set by language switcher) or Accept-Language header */
export function getLocaleFromCookies(cookieValue?: string): Locale {
  if (cookieValue && (cookieValue === "en" || cookieValue === "zh")) {
    return cookieValue as Locale;
  }
  return defaultLocale;
}
