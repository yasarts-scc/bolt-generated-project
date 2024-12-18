import { Group, Text, useMantineTheme } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconUpload, IconFile, IconX } from '@tabler/icons-react'
import { useDocumentStore } from '../../stores/documentStore'
import '@mantine/dropzone/styles.css'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export default function DocumentUpload({ folderId }) {
  const theme = useMantineTheme()
  const { uploadDocument } = useDocumentStore()

  const handleDrop = async (files) => {
    try {
      for (const file of files) {
        await uploadDocument(file, folderId)
      }
    } catch (error) {
      console.error('Upload error:', error)
    }
  }

  return (
    <Dropzone
      onDrop={handleDrop}
      maxSize={MAX_FILE_SIZE}
      accept={[
        'application/pdf',
        'image/*',
        'text/*',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]}
    >
      <Group position="center" spacing="xl" style={{ minHeight: 100, pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            size={32}
            stroke={1.5}
            color={theme.colors[theme.primaryColor][6]}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size={32}
            stroke={1.5}
            color={theme.colors.red[6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFile size={32} stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag files here or click to select
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Files should not exceed {MAX_FILE_SIZE / 1024 / 1024}MB
          </Text>
        </div>
      </Group>
    </Dropzone>
  )
}
