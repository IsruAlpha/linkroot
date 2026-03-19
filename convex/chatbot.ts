import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

export const chat = action({
  args: {
    username: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    const user = await ctx.runQuery(api.users.getUserByUsername, {
      username: args.username,
    });

    if (!user || !user.chatbotEnabled || !user.chatbotPrompt) {
      return "I'm sorry, I'm not available right now.";
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      throw new Error("GROQ_API_KEY not found");
    }

    const systemPrompt = `You are a chatbot representing ${user.username}. 
The owner's description: ${user.chatbotPrompt}
Respond as if you are the owner.
Guidelines:
- Short and precise sentences.
- Do NOT use "-" (dashes) or lists.
- Speak naturally like the person described.
- Keep it friendly and helpful.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: args.message },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  },
});
