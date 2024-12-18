import { useEffect } from 'react'
import { Table, ActionIcon, Group, Text, Badge } from '@mantine/core'
import { IconDownload, IconEye, IconTrash } from '@tabler/icons-react'
import { useDocumentStore } from '../../stores/documentStore'
import { formatDate, formatFileSize } from '../../utils/formatters'

export default function DocumentList({ 
  folderId, 
  searchQuery, 
  selectedType,
  onDocumentSelect,
  selectedDocument 
}) {
  const { documents, loading, fetchDocuments, deleteDocument, getDocumentUrl } = useDocumentStore()

  useEffect(() => {
    fetchDocuments(folderId)
  }, [folderId])

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = !searchQuery || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedType || doc.file_type.includes(selectedType)
    return matchesSearch && matchesType
  })

  const handleDownload = async (document) => {
    const url = await getDocumentUrl(document.file_path)
    if (url) {
      window.open(url, '_blank')
    }
  }

  if (loading) {
    return <Text>Loading documents...</Text>
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Size</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredDocuments.map((document) => (
          <tr 
            key={document.id}
            style={{
              backgroundColor: selectedDocument?.id === document.id ? '#f8f9fa' : undefined
            }}
          >
            <td>{document.name}</td>
            <td>
              <Badge>
                {document.file_type.split('/')[1]}
              </Badge>
            </td>
            <td>{formatFileSize(document.file_size)}</td>
            <td>{formatDate(document.created_at)}</td>
            <td>
              <Group spacing={4}>
                <ActionIcon
                  color="blue"
                  onClick={() => onDocumentSelect(document)}
                >
                  <IconEye size={18} />
                </ActionIcon>
                <ActionIcon
                  color="green"
                  onClick={() => handleDownload(document)}
                >
                  <IconDownload size={18} />
                </ActionIcon>
                <ActionIcon
                  color="red"
                  onClick={() => deleteDocument(document.id, document.file_path)}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
