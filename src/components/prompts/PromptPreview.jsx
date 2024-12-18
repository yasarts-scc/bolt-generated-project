import { Paper, Text, Title, Badge, Group, Stack, Code } from '@mantine/core'
import { formatDate } from '../../utils/formatters'

export default function PromptPreview({ prompt }) {
  if (!prompt) return null

  return (
    <Paper p="md" withBorder>
      <Stack spacing="md">
        <Title order={4}>{prompt.title}</Title>
        
        <Group spacing="xs">
          {prompt.tags?.map(tag => (
            <Badge key={tag} size="sm">{tag}</Badge>
          ))}
        </Group>

        <Text size="sm" color="dimmed">
          Created: {formatDate(prompt.created_at)}
        </Text>

        <Paper p="sm" bg="gray.0" withBorder>
          <Text style={{ whiteSpace: 'pre-wrap' }}>
            {prompt.content}
          </Text>
        </Paper>

        {Object.keys(prompt.model_settings || {}).length > 0 && (
          <div>
            <Text size="sm" weight={500} mb="xs">Model Settings:</Text>
            <Code block>
              {JSON.stringify(prompt.model_settings, null, 2)}
            </Code>
          </div>
        )}
      </Stack>
    </Paper>
  )
}
