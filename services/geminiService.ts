import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from '../constants';

// Initialize the client.
// Note: In a real production app, ensure the key is restricted or proxied.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are 'Aura', the dedicated AI Personal Stylist and Shopping Assistant for MNR Brand Store.
Your goal is to help customers find products, offer styling advice, and provide information about the brand.

Brand Identity:
MNR stands for Modern, Noble, Radiant. We sell high-quality, minimalist fashion staples, accessories, and loungewear.
Our aesthetic is "Quiet Luxury".

Here is our current Product Inventory (JSON format):
${JSON.stringify(PRODUCTS)}

Guidelines:
1. Always be polite, sophisticated, and helpful.
2. If a user asks for recommendations, use the product list provided to suggest specific items. Mention the price.
3. If you suggest a product, try to mention why it fits their request (e.g., "The Minimalist Trench is perfect for that weather...").
4. Keep responses concise (under 3 sentences unless asked for a detailed styling guide).
5. If asked about shipping/returns, say: "We offer free worldwide shipping on orders over $300 and a 30-day return policy."
6. Do not mention products that are not in the inventory.
7. Use Markdown formatting for bolding product names (e.g., **The Minimalist Trench**).
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string) => {
  const chat = getChatSession();
  const streamResult = await chat.sendMessageStream({ message });
  return streamResult;
};
