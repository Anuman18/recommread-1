const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateStory(prompt) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY;

  const body = {
    contents: [{ parts: [{ text: `Write a short fictional story about: ${prompt}. Keep it under 300 words.` }] }]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  const story = data.candidates?.[0]?.content?.parts?.[0]?.text || "No story generated.";
  return story;
}
