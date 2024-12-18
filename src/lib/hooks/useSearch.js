import { useState, useEffect, useMemo } from 'react'

export function useSearch(items, searchKeys = ['name', 'title']) {
  const [query, setQuery] = useState('')
  
  const filteredItems = useMemo(() => {
    if (!query) return items
    
    return items.filter(item =>
      searchKeys.some(key =>
        item[key]?.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [items, query, searchKeys])

  return { query, setQuery, filteredItems }
}
