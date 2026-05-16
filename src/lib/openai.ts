import OpenAI from "openai";

// Lazy initialization — only create the client when actually needed
function getOpenAI(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not configured. AI generation requires an API key."
    );
  }

  // Support OpenAI and DeepSeek (compatible API)
  const baseURL = process.env.OPENAI_BASE_URL || "https://api.deepseek.com";
  return new OpenAI({ apiKey, baseURL });
}

export const STYLES = {
  professional: {
    name: { en: "Professional", zh: "专业" },
    prompt: {
      en: `Write in a professional, authoritative tone.
- Use formal language and industry-appropriate terminology
- Structure with clear headings and subheadings
- Include data points, statistics, or research where relevant
- Keep paragraphs concise and scannable
- Suitable for B2B audiences, executives, and industry professionals`,
      zh: `以专业、权威的语气撰写。
- 使用正式语言和行业术语
- 用清晰的标题和副标题组织结构
- 适当引用数据、统计或研究
- 段落简洁有力，便于快速阅读
- 适合 B2B 受众、高管和行业专业人士`,
    },
  },
  casual: {
    name: { en: "Casual", zh: "随意" },
    prompt: {
      en: `Write in a friendly, conversational tone.
- Use simple, everyday language like you're writing to a friend
- Include personal anecdotes and relatable experiences
- Keep sentences short and punchy
- Use "I", "we", "you" to create connection
- Add a touch of humor or warmth where appropriate`,
      zh: `以友好、对话式的语气撰写。
- 使用日常语言，像给朋友写信一样
- 加入个人趣事和读者有共鸣的经历
- 句子简短有力
- 多用"我"、"我们"、"你"来拉近距离
- 适当加入幽默或温暖的元素`,
    },
  },
  storytelling: {
    name: { en: "Storytelling", zh: "讲故事" },
    prompt: {
      en: `Write in an engaging narrative style.
- Open with a compelling hook or anecdote
- Use vivid examples and sensory details
- Build tension or curiosity, then deliver the payoff
- Weave the bullet points into a cohesive narrative arc
- End with an emotional or inspiring call-to-action`,
      zh: `以富有感染力的叙事风格撰写。
- 用一个引人入胜的开头或故事吸引读者
- 使用生动的例子和细节描写
- 制造悬念或好奇心，然后揭晓答案
- 把各个要点编织成一个连贯的故事
- 结尾要有情感共鸣或令人振奋的号召`,
    },
  },
} as const;

export type NewsletterStyle = keyof typeof STYLES;

/** Detect whether the input is primarily Chinese */
function detectLanguage(texts: string[]): "en" | "zh" {
  const combined = texts.join(" ");
  const chineseChars = (combined.match(/[\u4e00-\u9fff]/g) || []).length;
  return chineseChars > combined.length * 0.3 ? "zh" : "en";
}

export async function generateNewsletter(
  bulletPoints: string[],
  style: NewsletterStyle = "professional"
): Promise<string> {
  const openai = getOpenAI();
  const styleInfo = STYLES[style];
  const lang = detectLanguage(bulletPoints);
  const stylePrompt = styleInfo.prompt[lang];

  const systemPrompt =
    lang === "zh"
      ? `你是一位专业的 Newsletter 写手。你的任务是根据用户提供的要点，生成一封高质量的 Newsletter。

规则：
1. **语言**：用中文撰写全文
2. **格式**：严格按以下结构输出：

Subject: [吸引眼球的标题]

[开篇引言 —— 用 1-2 句话抓住读者注意力]

## [第一部分标题]
[展开第一个要点，200-300字]

## [第二部分标题]
[展开第二个要点，200-300字]

## [第三部分标题]
[展开第三个要点，200-300字]

[结尾 —— 总结 + 行动号召]

3. **风格要求**：${stylePrompt}
4. **字数**：控制在 600-1200 字之间
5. 不要直接在正文中写"根据您提供的要点"或"根据您的bullet points"这类话
6. 内容要自然流畅，像是自己写的一样`
      : `You are an expert newsletter writer. Your task is to craft a high-quality newsletter based on the user's bullet points.

Rules:
1. **Language**: Write entirely in English
2. **Format**: Follow this exact structure:

Subject: [Catchy subject line that grabs attention]

[Hook paragraph — 1-2 sentences to grab the reader]

## [Section title]
[Expand on the first bullet point, 200-300 words]

## [Section title]
[Expand on the second bullet point, 200-300 words]

## [Section title]
[Expand on the third bullet point, 200-300 words]

[Closing — summary + call to action]

3. **Style**: ${stylePrompt}
4. **Length**: 300-800 words
5. Do NOT say "based on your bullet points" or "as you mentioned" in the body
6. Make it flow naturally, as if you wrote it yourself`;

  const userContent =
    lang === "zh"
      ? `请根据以下要点写一封 Newsletter：\n\n${bulletPoints.map((b, i) => `${i + 1}. ${b}`).join("\n")}`
      : `Write a newsletter based on these bullet points:\n\n${bulletPoints.map((b, i) => `${i + 1}. ${b}`).join("\n")}`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "deepseek-chat",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  return response.choices[0]?.message?.content || "Failed to generate newsletter.";
}
