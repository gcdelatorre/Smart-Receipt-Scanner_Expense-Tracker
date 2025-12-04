import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

export async function extractTextFromImage(imagePath) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");

    const result = await model.generateContent({
        input: [
            {
                content: [
                    { type: "image", image: { data: base64Image, mimeType: "image/jpeg" } },
                    { type: "text", text: "Extract all text from this receipt clearly." }
                ]
            }
        ]
    });

    return result.output[0].content[0].text;
}

export async function categorizeExpense(text) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Parse this receipt text and return a JSON with ONLY these fields:
{
  "store": "",
  "amount": 0,
  "category": "",
  "items": [],
  "date": ""
}

Text:
${text}
`;

    const result = await model.generateContent({
        input: [
            {
                content: [
                    { type: "text", text: prompt }
                ]
            }
        ]
    });

    return JSON.parse(result.output[0].content[0].text);
}
