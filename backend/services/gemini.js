import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function extractTextFromImage(imagePath) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");

    const result = await model.generateContent([
        {
            inlineData: {
                data: base64Image,
                mimeType: "image/jpeg",
            }
        },
        "Extract all text from this receipt clearly."
    ]);

    return result.response.text();
}

export async function categorizeExpense(text) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    category should be one only of the following: Food, Transport, Entertainment, Utilities, Health, 
    Education, Shopping, Travel, Miscellaneous, Other (if none of the above).
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

    const result = await model.generateContent(prompt);
    let output = result.response.text();

    output = output.replace(/```json|```/g, "").trim();

    return JSON.parse(output);
}

