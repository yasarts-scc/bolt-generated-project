import { useState } from 'react'
import { 
  Paper, 
  TextInput, 
  Select, 
  Button, 
  Stack,
  PasswordInput,
  Text
} from '@mantine/core'
import { useAiModelStore } from '../../stores/aiModelStore'

const MODEL_PROVIDERS = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'gemini', label: 'Google Gemini' }
]

const MODEL_OPTIONS = {
  openai: [
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
  ],
  anthropic: [
    { value: 'claude-2', label: 'Claude 2' },
    { value: 'claude-instant', label: 'Claude Instant' }
  ],
  gemini: [
    { value: 'gemini-pro', label: 'Gemini Pro' }
  ]
}

export default function ModelSettings() {
  const { models, saveModel, deleteModel } = useAiModelStore()
  const [formData, setFormData] = useState({
    provider: '',
    model: '',
    api_key: '',
    name: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await saveModel(formData)
      setFormData({ provider: '', model: '', api_key: '', name: '' })
    } catch (error) {
      console.error('Error saving model:', error)
    }
  }

  return (
    <Paper p="md" withBorder>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Select
            label="Provider"
            required
            data={MODEL_PROVIDERS}
            value={formData.provider}
            onChange={(value) => setFormData({ 
              ...formData, 
              provider: value,
              model: '' 
            })}
          />

          <Select
            label="Model"
            required
            data={MODEL_OPTIONS[formData.provider] || []}
            value={formData.model}
            onChange={(value) => setFormData({ ...formData, model: value })}
            disabled={!formData.provider}
          />

          <PasswordInput
            label="API Key"
            required
            value={formData.api_key}
            onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
          />

          <Button type="submit">Save Model</Button>
        </Stack>
      </form>

      <Stack mt="xl">
        <Text weight={500}>Configured Models</Text>
        {models.map((model) => (
          <Paper key={model.id} p="sm" withBorder>
            <Group position="apart">
              <div>
                <Text>{model.name}</Text>
                <Text size="sm" color="dimmed">
                  {model.provider} - {model.model}
                </Text>
              </div>
              <Button 
                color="red" 
                variant="subtle"
                onClick={() => deleteModel(model.id)}
              >
                Remove
              </Button>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Paper>
  )
}
