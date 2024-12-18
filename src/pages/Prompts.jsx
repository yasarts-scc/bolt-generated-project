import { useState, useMemo } from 'react'
import { Grid, Paper, Title, Button, Group, Stack } from '@mantine/core'
import PromptList from '../components/prompts/PromptList'
import PromptEditor from '../components/prompts/PromptEditor'
import PromptPreview from '../components/prompts/PromptPreview'
import PromptSearch from '../components/prompts/PromptSearch'
import FolderTree from '../components/prompts/FolderTree'
import ImportExportButtons from '../components/prompts/ImportExportButtons'
import { usePromptStore } from '../stores/promptStore'

export default function Prompts() {
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)

  const { prompts } = usePromptStore()

  // Get unique tags from all prompts
  const availableTags = useMemo(() => {
    const tags = new Set()
    prompts.forEach(prompt => {
      prompt.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }, [prompts])

  // Filter prompts based on search and tags
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = !searchQuery || 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesTag = !selectedTag || 
        prompt.tags?.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [prompts, searchQuery, selectedTag])

  const handleNewPrompt = () => {
    setSelectedPrompt(null)
    setIsEditing(true)
  }

  return (
    <Grid>
      <Grid.Col span={3}>
        <Stack>
          <Paper p="md" withBorder>
            <FolderTree 
              onFolderSelect={setSelectedFolder}
              selectedFolder={selectedFolder}
            />
          </Paper>
          
          <Paper p="md" withBorder>
            <ImportExportButtons folderId={selectedFolder} />
          </Paper>
        </Stack>
      </Grid.Col>
      
      <Grid.Col span={9}>
        <Stack>
          <Paper p="md" withBorder>
            <Group position="apart" mb="md">
              <Title order={3}>
                {isEditing ? 'Edit Prompt' : 'Prompts'}
              </Title>
              <Button onClick={handleNewPrompt}>
                New Prompt
              </Button>
            </Group>

            <PromptSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTags={selectedTag}
              onTagsChange={setSelectedTag}
              availableTags={availableTags}
            />
          </Paper>

          <Grid>
            <Grid.Col span={isEditing ? 12 : 6}>
              {isEditing ? (
                <PromptEditor
                  prompt={selectedPrompt}
                  folderId={selectedFolder}
                  onSave={() => setIsEditing(false)}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <Paper p="md" withBorder>
                  <PromptList
                    prompts={filteredPrompts}
                    folderId={selectedFolder}
                    onPromptSelect={(prompt) => {
                      setSelectedPrompt(prompt)
                      setIsEditing(true)
                    }}
                  />
                </Paper>
              )}
            </Grid.Col>
            
            {!isEditing && (
              <Grid.Col span={6}>
                <PromptPreview prompt={selectedPrompt} />
              </Grid.Col>
            )}
          </Grid>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
