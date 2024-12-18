import { useEffect, useState } from 'react'
import { Paper, Text, Group, Stack, Image, Code } from '@mantine/core'
import { useDocumentStore } from '../../stores/documentStore'

export default function DocumentPreview({ document }) {
  const [previewUrl, setPreviewUrl] = useState(null)
  const { getDocumentUrl } = useDocumentStore()

  useEffect(() => {
    if (document) {
      getDocumentUrl(document.file_path).then(url => setPreviewUrl(url))
    } else {
      setPreviewUrl(null)
    }
  }, [document])

  if (!document) {
    return (
      <Paper p="md" withBorder>
        <Text align="center" color="dimmed">
          Select a document to preview
        </Text>
      </Paper>
    )
  }

  const renderPreview = () => {
    if (!previewUrl) return null

    if (document.file_type.startsWith('image/')) {
      return (
        <Image
          src={previewUrl}
          alt={document.name}
          fit="contain"
          height={400}
        />
      )
    }

    if (document.file_type === 'application/pdf') {
      return (
        <iframe
          src={previewUrl}
          width="100%"
          height="500px"
          style={{ border: 'none' }}
        />
      )
    }

    if (document.file_type.startsWith('text/')) {
      return (
        <Code block>
          {/* Text content would be loaded here */}
          Preview not available
        </Code>
      )
    }

    return (
      <Text align="center" color="dimmed">
        Preview not available for this file type
      </Text>
    )
  }

  return (
    <Paper p="md" withBorder>
      <Stack>
        <Group position="apart">
          <Text weight={500}>{document.name}</Text>
          <Text size="sm" color="dimmed">
            {document.file_type}
          </Text>
        </Group>

        {renderPreview()}
      </Stack>
    </Paper>
  )
}
