import { useState } from 'react'
import { supabase } from '../supabase'

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file, bucket, path) => {
    try {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`
      const filePath = `${path}/${fileName}`

      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (error) throw error

      return filePath
    } finally {
      setUploading(false)
    }
  }

  return { uploadFile, uploading }
}
