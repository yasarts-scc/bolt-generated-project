import { useEffect, useState } from 'react'
import { 
  Stack, 
  Button, 
  TextInput,
  ActionIcon,
  Group,
  Text 
} from '@mantine/core'
import { 
  IconFolder,
  IconFolderPlus,
  IconEdit,
  IconTrash 
} from '@tabler/icons-react'
import { useFolderStore } from '../../stores/folderStore'

export default function FolderTree({ onFolderSelect, selectedFolder, type = 'prompt' }) {
  const [newFolderName, setNewFolderName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const { folders, loading, fetchFolders, createFolder, deleteFolder } = useFolderStore()

  useEffect(() => {
    fetchFolders(type)
  }, [type])

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return
    
    try {
      await createFolder(newFolderName, type)
      setNewFolderName('')
      setIsCreating(false)
    } catch (error) {
      console.error('Error creating folder:', error)
    }
  }

  const renderFolder = (folder) => (
    <Group 
      key={folder.id}
      spacing="xs"
      p="xs"
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        backgroundColor: 
          selectedFolder === folder.id 
            ? theme.colors.blue[1] 
            : 'transparent',
        '&:hover': {
          backgroundColor: theme.colors.gray[1]
        },
        cursor: 'pointer'
      })}
      onClick={() => onFolderSelect(folder.id)}
    >
      <IconFolder size={18} />
      <Text size="sm" style={{ flex: 1 }}>{folder.name}</Text>
      <ActionIcon
        size="sm"
        color="red"
        onClick={(e) => {
          e.stopPropagation()
          deleteFolder(folder.id)
        }}
      >
        <IconTrash size={14} />
      </ActionIcon>
    </Group>
  )

  return (
    <Stack spacing="xs">
      <Button
        leftIcon={<IconFolderPlus size={18} />}
        variant="light"
        onClick={() => setIsCreating(true)}
      >
        New Folder
      </Button>

      {isCreating && (
        <Group>
          <TextInput
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            size="xs"
            style={{ flex: 1 }}
          />
          <Button size="xs" onClick={handleCreateFolder}>
            Create
          </Button>
        </Group>
      )}

      <Stack spacing={4}>
        {folders.map(renderFolder)}
      </Stack>
    </Stack>
  )
}
