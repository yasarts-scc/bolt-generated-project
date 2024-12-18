import { Group, TextInput, Select } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

const FILE_TYPES = [
  { value: 'pdf', label: 'PDF' },
  { value: 'image', label: 'Images' },
  { value: 'text', label: 'Text' },
  { value: 'document', label: 'Documents' }
]

export default function DocumentSearch({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange
}) {
  return (
    <Group>
      <TextInput
        placeholder="Search documents..."
        icon={<IconSearch size={16} />}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ flex: 1 }}
      />
      <Select
        placeholder="Filter by type"
        data={FILE_TYPES}
        value={selectedType}
        onChange={onTypeChange}
        clearable
        style={{ width: 200 }}
      />
    </Group>
  )
}
