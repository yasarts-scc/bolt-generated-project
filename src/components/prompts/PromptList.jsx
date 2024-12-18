import { useEffect } from 'react'
import { Table, ActionIcon, Group, Text, Badge } from '@mantine/core'
import { IconStar, IconEdit, IconTrash } from '@tabler/icons-react'
import { usePromptStore } from '../../stores/promptStore'
import { formatDate } from '../../utils/formatters'

export default function PromptList({ folderId, onPromptSelect }) {
  const { prompts, loading, fetchPrompts, toggleFavorite, deletePrompt } = usePromptStore()

  useEffect(() => {
    fetchPrompts(folderId)
  }, [folderId])

  if (loading) {
    return <Text>Loading prompts...</Text>
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Tags</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {prompts.map((prompt) => (
          <tr key={prompt.id}>
            <td>{prompt.title}</td>
            <td>
              {prompt.tags?.map((tag) => (
                <Badge key={tag} mr={4}>
                  {tag}
                </Badge>
              ))}
            </td>
            <td>{formatDate(prompt.created_at)}</td>
            <td>
              <Group spacing={4}>
                <ActionIcon
                  color={prompt.is_favorite ? 'yellow' : 'gray'}
                  onClick={() => toggleFavorite(prompt.id)}
                >
                  <IconStar size={18} />
                </ActionIcon>
                <ActionIcon
                  color="blue"
                  onClick={() => onPromptSelect(prompt)}
                >
                  <IconEdit size={18} />
                </ActionIcon>
                <ActionIcon
                  color="red"
                  onClick={() => deletePrompt(prompt.id)}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
