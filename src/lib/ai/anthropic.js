const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

export async function sendAnthropicPrompt(apiKey, model, messages) {
  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      max_tokens: 1024
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Anthropic API error')
  }

  return response.json()
}
