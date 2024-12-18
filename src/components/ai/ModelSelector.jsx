import { Select, Paper, Text } from '@mantine/core'

const AI_MODELS = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'claude-2', label: 'Claude 2' },
  { value: 'gemini-pro', label: 'Gemini Pro' },
]

export default function ModelSelector({ value, onChange }) {
  return (
    <Paper p="md">
      <Text size="sm" mb="xs">Select AI Model</Text>
      <Select
        data={AI_MODELS}
        value={value}
        onChange={onChange}
        placeholder="Choose a model"
      />
    </Paper>
  )
}
