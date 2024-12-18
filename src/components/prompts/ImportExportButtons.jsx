import { Group, Button, FileButton } from '@mantine/core'
import { IconDownload, IconUpload } from '@tabler/icons-react'
import { exportPrompts, validateImportData } from '../../utils/promptExport'
import { usePromptStore } from '../../stores/promptStore'

export default function ImportExportButtons({ folderId }) {
  const { prompts, createPrompt } = usePromptStore()

  const handleImport = async (file) => {
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      const validPrompts = validateImportData(data)
      
      for (const prompt of validPrompts) {
        await createPrompt({
          ...prompt,
          folder_id: folderId
        })
      }
    } catch (error) {
      console.error('Import error:', error)
    }
  }

  return (
    <Group>
      <FileButton
        accept="application/json"
        onChange={handleImport}
      >
        {(props) => (
          <Button 
            {...props}
            leftIcon={<IconUpload size={16} />}
            variant="light"
          >
            Import
          </Button>
        )}
      </FileButton>

      <Button
        leftIcon={<IconDownload size={16} />}
        variant="light"
        onClick={() => exportPrompts(prompts)}
      >
        Export
      </Button>
    </Group>
  )
}
