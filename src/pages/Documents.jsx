import { useState } from 'react'
import { Grid, Stack, Paper, Title, Group } from '@mantine/core'
import DocumentList from '../components/documents/DocumentList'
import DocumentUpload from '../components/documents/DocumentUpload'
import DocumentPreview from '../components/documents/DocumentPreview'
import DocumentSearch from '../components/documents/DocumentSearch'
import FolderTree from '../components/documents/FolderTree'
import { useDocumentStore } from '../stores/documentStore'

export default function Documents() {
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState(null)

  return (
    <Grid>
      <Grid.Col span={3}>
        <Stack>
          <Paper p="md" withBorder>
            <FolderTree
              onFolderSelect={setSelectedFolder}
              selectedFolder={selectedFolder}
              type="document"
            />
          </Paper>
          
          <Paper p="md" withBorder>
            <DocumentUpload folderId={selectedFolder} />
          </Paper>
        </Stack>
      </Grid.Col>

      <Grid.Col span={9}>
        <Stack>
          <Paper p="md" withBorder>
            <Group position="apart" mb="md">
              <Title order={3}>Documents</Title>
            </Group>

            <DocumentSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />
          </Paper>

          <Grid>
            <Grid.Col span={6}>
              <Paper p="md" withBorder>
                <DocumentList
                  folderId={selectedFolder}
                  searchQuery={searchQuery}
                  selectedType={selectedType}
                  onDocumentSelect={setSelectedDocument}
                  selectedDocument={selectedDocument}
                />
              </Paper>
            </Grid.Col>
            
            <Grid.Col span={6}>
              <DocumentPreview document={selectedDocument} />
            </Grid.Col>
          </Grid>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
