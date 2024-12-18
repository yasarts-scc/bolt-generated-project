import { TextInput, Select, Group } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

export default function PromptSearch({ 
  searchQuery, 
  onSearchChange,
  selectedTags,
  onTagsChange,
  availableTags 
}) {
  return (
    <Group>
      <TextInput
        placeholder="Search prompts..."
        icon={<IconSearch size={16} />}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ flex: 1 }}
      />
      <Select
        placeholder="Filter by tag"
        data={availableTags}
        value={selectedTags}
        onChange={onTagsChange}
        clearable
        searchable
        style={{ width: 200 }}
      />
    </Group>
  )
}
