import { useState, useEffect } from 'react'
import { 
  TextInput, 
  Textarea, 
  Button, 
  Stack, 
  Group,
  MultiSelect,
  JsonInput
} from '@mantine/core'
import { usePromptStore } from '../../stores/promptStore'

export default function PromptEditor({ prompt, folderId, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [],
    model_settings: {},
    folder_id: folderId
  })

  const { createPrompt, updatePrompt } = usePromptStore()

  useEffect(() => {
    if (prompt) {
      setFormData({
        title: prompt.title,
        content: prompt.content,
        tags: prompt.tags || [],
        model_settings: prompt.model_settings || {},
        folder_id: prompt.folder_id
      })
    }
  }, [prompt])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (prompt) {
        await updatePrompt(prompt.id, formData)
      } else {
        await createPrompt(formData)
      }
      onSave()
    } catch (error) {
      console.error('Error saving prompt:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="md">
        <TextInput
          label="Title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <Textarea
          label="Prompt Content"
          required
          minRows={5}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />

        <MultiSelect
          label="Tags"
          data={formData.tags}
          value={formData.tags}
          onChange={(value) => setFormData({ ...formData, tags: value })}
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
        />

        <JsonInput
          label="Model Settings"
          placeholder="{ }"
          validationError="Invalid JSON"
          formatOnBlur
          value={JSON.stringify(formData.model_settings, null, 2)}
          onChange={(value) => {
            try {
              setFormData({
                ...formData,
                model_settings: JSON.parse(value)
              })
            } catch (e) {
              // Handle invalid JSON
            }
          }}
        />

        <Group position="right">
          <Button variant="light" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {prompt ? 'Update' : 'Create'} Prompt
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
