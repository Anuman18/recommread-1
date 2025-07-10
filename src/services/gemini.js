import axios from 'axios';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateStoryFromPrompt = async (prompt) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [{
          parts: [{ text: `Write a short fictional story based on this prompt: "${prompt}"` }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const text = response.data.candidates[0]?.content?.parts[0]?.text || '';
    return text;

  } catch (error) {
    console.error('Error generating story:', error);
    return null;
  }
};
