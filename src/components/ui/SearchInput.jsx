import { TextInput, ActionIcon } from '@mantine/core'
import { IconSearch, IconX } from '@tabler/icons-react'

export default function SearchInput({ value, onChange, onClear }) {
  return (
    <TextInput
      placeholder="Search..."
      value={value}
      onChange={onChange}
      rightSection={
        value ? (
          <ActionIcon onClick={onClear}>
            <IconX size={16} />
          </ActionIcon>
        ) : (
          <IconSearch size={16} />
        )
      }
    />
  )
}
