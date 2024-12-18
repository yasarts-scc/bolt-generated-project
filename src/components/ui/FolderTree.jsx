import { useState } from 'react'
import { UnstyledButton, Group, Text } from '@mantine/core'
import { IconFolder, IconFolderOpen, IconFile } from '@tabler/icons-react'

export default function FolderTree({ data, onSelect }) {
  const [expanded, setExpanded] = useState({})

  const toggleFolder = (folderId) => {
    setExpanded(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }))
  }

  const renderItem = (item, level = 0) => {
    const isFolder = item.type === 'folder'
    const isExpanded = expanded[item.id]

    return (
      <div key={item.id}>
        <UnstyledButton
          onClick={() => isFolder ? toggleFolder(item.id) : onSelect(item)}
          sx={{ paddingLeft: level * 20 }}
          p="xs"
          w="100%"
        >
          <Group>
            {isFolder ? (
              isExpanded ? <IconFolderOpen size={20} /> : <IconFolder size={20} />
            ) : (
              <IconFile size={20} />
            )}
            <Text>{item.name}</Text>
          </Group>
        </UnstyledButton>
        
        {isFolder && isExpanded && item.children?.map(child => renderItem(child, level + 1))}
      </div>
    )
  }

  return <div>{data.map(item => renderItem(item))}</div>
}
