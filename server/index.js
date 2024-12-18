import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const app = express()
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'upload/fichiers')
      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }
      cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
  })
})

// Serve static files from upload directory
app.use('/api/files/upload/fichiers', express.static(path.join(process.cwd(), 'upload/fichiers')))

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  res.json({ 
    filePath: `/upload/fichiers/${req.file.filename}`,
    size: req.file.size
  })
})

// File deletion endpoint
app.post('/api/delete-file', express.json(), (req, res) => {
  const { filePath } = req.body
  const fullPath = path.join(process.cwd(), filePath)

  if (!fullPath.startsWith(path.join(process.cwd(), 'upload/fichiers'))) {
    return res.status(403).json({ error: 'Invalid file path' })
  }

  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath)
    }
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
