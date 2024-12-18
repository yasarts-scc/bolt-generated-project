export function exportPrompts(prompts) {
  const exportData = {
    version: '1.0',
    prompts: prompts.map(prompt => ({
      title: prompt.title,
      content: prompt.content,
      tags: prompt.tags,
      model_settings: prompt.model_settings,
      created_at: prompt.created_at
    }))
  }

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
    type: 'application/json' 
  })
  
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `prompts-export-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function validateImportData(data) {
  if (!data.version || !data.prompts || !Array.isArray(data.prompts)) {
    throw new Error('Invalid import file format')
  }

  return data.prompts.map(prompt => ({
    title: prompt.title,
    content: prompt.content,
    tags: prompt.tags || [],
    model_settings: prompt.model_settings || {},
    folder_id: null // Will be set when importing
  }))
}
