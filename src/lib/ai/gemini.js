const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

export async function sendGeminiPrompt(apiKey, model, messages) {
  const response = await fetch(`${GEMINI_API_URL}/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }))
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Gemini API error')
  }

  return response.json()
}
