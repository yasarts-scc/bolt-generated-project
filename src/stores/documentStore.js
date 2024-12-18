import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useDocumentStore = create((set, get) => ({
  documents: [],
  loading: false,

  fetchDocuments: async (folderId = null) => {
    set({ loading: true })
    try {
      let query = supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })

      if (folderId) {
        query = query.eq('folder_id', folderId)
      }

      const { data, error } = await query
      if (error) throw error
      set({ documents: data })
    } finally {
      set({ loading: false })
    }
  },

  uploadDocument: async (file, folderId = null) => {
    const fileName = `${Date.now()}-${file.name}`
    const filePath = `/upload/fichiers/${fileName}`

    // Create FormData for file upload
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', filePath)

    // Upload file to local server
    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!uploadResponse.ok) {
      throw new Error('Upload failed')
    }

    // Create document record in the database
    const { data, error } = await supabase
      .from('documents')
      .insert({
        name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size,
        folder_id: folderId,
        user_id: supabase.auth.user().id
      })
      .select()
      .single()

    if (error) throw error
    set({ documents: [...get().documents, data] })
    return data
  },

  deleteDocument: async (id, filePath) => {
    // Delete file from local server
    const deleteResponse = await fetch('/api/delete-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filePath })
    })

    if (!deleteResponse.ok) {
      throw new Error('File deletion failed')
    }

    // Delete record from database
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id)

    if (error) throw error
    set({
      documents: get().documents.filter(d => d.id !== id)
    })
  },

  getDocumentUrl: (filePath) => {
    return `/api/files${filePath}`
  }
}))
