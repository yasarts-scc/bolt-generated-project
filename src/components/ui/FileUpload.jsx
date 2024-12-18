import { Group, Text, useMantineTheme, rem } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconUpload, IconX, IconFile } from '@tabler/icons-react'

export default function FileUpload({ onDrop, accept, maxSize = 5 * 1024 ** 2 }) {
  const theme = useMantineTheme()

  return (
    <Dropzone
      onDrop={onDrop}
      maxSize={maxSize}
      accept={accept}
    >
      <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={theme.colors[theme.primaryColor][6]}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFile size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag files here or click to select
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Files should not exceed {maxSize / 1024 / 1024}mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  )
}
