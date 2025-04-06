import { Router } from "express";
import OpenAI from "openai";

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/analyze", async (req, res) => {
  const { base64Image, userDescription } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: `You are a moderator for a climate disaster crowdsourcing platform. Your job is to verify that images users upload are relevant and truthful representations of the disaster descriptions provided. Many people rely on this platform during emergencies, and false images can lead to harm. Please output either **"Yes"** or **"No"**, and briefly justify your decision.

A match means the image contains visual evidence of the natural disaster described — such as flooding, wildfires, tornadoes, earthquakes, or similar — and is clearly connected to the user's description.

Consider the following:
1. Does the image clearly depict a natural disaster or aftermath?
2. Is the image likely to be real, or does it look like AI-generated or spam content?
3. Does the visual scene align with the language in the user's description?

Only return "Yes" or "No" followed by a short justification.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Description: "${userDescription}"`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const content = response.choices[0].message?.content ?? "";
    const match = /^yes/i.test(content.trim());

    res.json({ match, message: content });
  } catch (e) {
    console.error("OpenAI Vision error:", e);
    res.status(500).json({ match: false, error: "Failed to analyze image" });
  }
});

export default router;
