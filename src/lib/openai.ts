import OpenAI from "openai";

// Lazy initialization — only create the client when actually needed
function getOpenAI(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not configured. AI generation requires an OpenAI API key."
    );
  }

  return new OpenAI({ apiKey });
}

export const STYLES = {
  professional: {
    name: "Professional",
    prompt:
      "Write in a professional, authoritative tone. Use formal language, data-driven insights, and clear structure with headings. Suitable for B2B and industry newsletters.",
  },
  casual: {
    name: "Casual",
    prompt:
      "Write in a friendly, conversational tone. Use simple language, personal anecdotes, and an approachable style. Like writing to a friend.",
  },
  storytelling: {
    name: "Storytelling",
    prompt:
      "Write in an engaging narrative style. Use stories, metaphors, vivid examples, and emotional hooks to keep readers engaged from start to finish.",
  },
} as const;

export type NewsletterStyle = keyof typeof STYLES;

export async function generateNewsletter(
  bulletPoints: string[],
  style: NewsletterStyle = "professional"
): Promise<string> {
  const openai = getOpenAI();
  const styleInfo = STYLES[style];

  const prompt = `You are an expert newsletter writer. Create a compelling newsletter based on the following bullet points.

Style: ${styleInfo.prompt}

Bullet points:
${bulletPoints.map((b, i) => `${i + 1}. ${b}`).join("\n")}

Write the full newsletter with:
1. A catchy subject line (prefixed with "Subject: ")
2. A brief intro/hook paragraph
3. The main content expanding on each bullet point naturally
4. A call-to-action or closing thought

Use Markdown formatting. Keep it between 300-800 words. Make it engaging and valuable to the reader.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
    max_tokens: 1500,
  });

  return response.choices[0]?.message?.content || "Failed to generate newsletter.";
}
