export const AI_PROVIDERS = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  GOOGLE: 'google',
}

export async function sendPrompt(provider, model, prompt) {
  // Implementation will vary based on provider
  switch (provider) {
    case AI_PROVIDERS.OPENAI:
      return sendOpenAIPrompt(model, prompt)
    case AI_PROVIDERS.ANTHROPIC:
      return sendAnthropicPrompt(model, prompt)
    case AI_PROVIDERS.GOOGLE:
      return sendGooglePrompt(model, prompt)
    default:
      throw new Error('Unsupported AI provider')
  }
}

async function sendOpenAIPrompt(model, prompt) {
  // OpenAI implementation
}

async function sendAnthropicPrompt(model, prompt) {
  // Anthropic implementation
}

async function sendGooglePrompt(model, prompt) {
  // Google implementation
}
