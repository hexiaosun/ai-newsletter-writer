"use client";

import { useState } from "react";

const styles = [
  { id: "professional", label: "Professional", emoji: "💼" },
  { id: "casual", label: "Casual", emoji: "😊" },
  { id: "storytelling", label: "Storytelling", emoji: "📖" },
];

const demoSubjects = [
  "AI is changing how we work — here's what you need to know",
  "This week's top stories in tech and business",
  "3 lessons I learned building my first SaaS product",
];

function generateDemoNewsletter(bulletPoints: string[], style: string): { subject: string; content: string } {
  const subject = demoSubjects[Math.floor(Math.random() * demoSubjects.length)];
  
  let intro = "";
  
  switch (style) {
    case "professional":
      intro = "I hope this newsletter finds you well. This week, we're diving into the most important developments that deserve your attention.";
      break;
    case "casual":
      intro = "Hey team! 👋 A lot happened this week, and I've rounded up the highlights so you don't have to scroll through everything yourself.";
      break;
    case "storytelling":
      intro = "Last month, I nearly gave up on my project. Here's the story of what changed — and why it matters for all of us.";
      break;
  }

  const body = bulletPoints
    .map((point, i) => {
      const expansions = [
        `\n\n**${point}**\n\nThis is a significant trend that's reshaping how we think about the space. Industry leaders are taking note, and early adopters are already seeing results. The key takeaway? Those who adapt quickly will have a competitive advantage.`,
        `\n\n**${point}**\n\nWhat makes this interesting is the ripple effect. When one piece changes, everything around it shifts too. We're watching this play out in real-time, and the implications are broader than most people realize.`,
        `\n\n**${point}**\n\nHere's the thing — this isn't just a flash in the pan. The data shows sustained momentum, with adoption rates climbing week over week. If you're not paying attention yet, now's the time to start.`,
      ];
      return expansions[i % expansions.length];
    })
    .join("");

  const closing = `\n\n**What do you think?**\n\nI'd love to hear your take on these topics. Hit reply and let me know — your insights make this newsletter better for everyone.\n\nSee you next week! 👋`;

  return {
    subject,
    content: `${intro}${body}${closing}`,
  };
}

export default function DemoSection() {
  const [input, setInput] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("professional");
  const [output, setOutput] = useState<{ subject: string; content: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const handleGenerate = () => {
    if (!input.trim()) return;
    
    setIsGenerating(true);
    setShowFull(false);
    
    setTimeout(() => {
      const bullets = input.split("\n").filter((b) => b.trim().length > 0);
      const result = generateDemoNewsletter(bullets, selectedStyle);
      setOutput(result);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <section id="demo" className="py-20 bg-surface">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm px-4 py-1.5 rounded-full mb-4">
            <span>🎯 Try It Now</span>
          </div>
          <h2 className="text-2xl md:text-5xl font-extrabold text-gray-900 mb-3 md:mb-4">
            See It in Action — <span className="text-primary">No Signup Needed</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-lg max-w-xl mx-auto">
            Type a few bullet points below, pick your style, and watch AI turn them into a polished newsletter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Input Side */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Your Ideas</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste your bullet points here...\n\nExample:\n• AI tools are getting cheaper\n• My team switched to a 4-day week\n• New funding round for our startup`}
              className="w-full h-40 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none"
            />
            
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Choose a style:</p>
              <div className="flex gap-2 flex-wrap">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStyle(s.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedStyle === s.id
                        ? "bg-primary text-white shadow-sm"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {s.emoji} {s.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!input.trim() || isGenerating}
              className="mt-6 w-full py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Writing...
                </span>
              ) : (
                "✨ Generate Demo"
              )}
            </button>
          </div>

          {/* Output Side */}
          <div className={`rounded-2xl p-5 md:p-6 border min-h-[300px] transition ${
            output ? "bg-white border-gray-200 shadow-sm" : "bg-gray-50 border-dashed border-gray-300"
          }`}>
            {!output && !isGenerating && (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 min-h-[200px]">
                <span className="text-4xl mb-3">📝</span>
                <p className="text-sm">Your newsletter preview will appear here</p>
                <p className="text-xs mt-1">Type your ideas on the left and click Generate</p>
              </div>
            )}
            {isGenerating && (
              <div className="flex flex-col items-center justify-center text-center min-h-[200px]">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-sm text-gray-500">Crafting your newsletter...</p>
              </div>
            )}
            {output && !isGenerating && (
              <div>
                <div className={!showFull ? "max-h-[360px] overflow-hidden relative" : ""}>
                  <div className="mb-3 pb-3 border-b border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Subject Line</p>
                    <p className="text-sm font-semibold text-gray-900">{output.subject}</p>
                  </div>
                  <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {output.content}
                  </div>
                  {!showFull && (
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                  )}
                </div>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => setShowFull(!showFull)}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    {showFull ? "Show less ↑" : "Read more ↓"}
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500 mb-3">
                    ✨ This is a demo preview. Sign up to generate real newsletters with AI.
                  </p>
                  <a
                    href="/sign-up"
                    className="inline-block bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition shadow-sm"
                  >
                    Start Writing Free →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
