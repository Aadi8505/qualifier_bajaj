import axios from 'axios';

export const askAI = async (question) => {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      throw new Error("No API Key");
    }
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;



    const payload = {
      contents: [{
        parts: [{
          text: question + ". Reply in one word only."
        }]
      }]
    };

    const result = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    let text =
      result?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) return "Unknown";

    return text.trim().split(/\s+/)[0];

  } catch (err) {
    console.log("AI ERROR:", err.response?.data || err.message);
    throw err;
  }
};
