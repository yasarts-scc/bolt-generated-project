import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useFolderStore = create((set, get) => ({
  folders: [],
  loading: false,

  fetchFolders: async (type) => {
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .eq('type', type)
        .order('created_at', { ascending: true })
      
      if (error) throw error
      set({ folders: data })
    } finally {
      set({ loading: false })
    }
  },

  createFolder: async (name, type, parentId = null) => {
    const { data, error } = await supabase
      .from('folders')
      .insert({
        name,
        type,
        parent_id: parentId,
        user_id: supabase.auth.user().id
      })
      .select()
      .single()
    
    if (error) throw error
    set({ folders: [...get().folders, data] })
    return data
  },

  updateFolder: async (id, updates) => {
    const { data, error } = await supabase
      .from('folders')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    set({
      folders: get().folders.map(f => 
        f.id === id ? data : f
      )
    })
    return data
  },

  deleteFolder: async (id) => {
    const { error } = await supabase
      .from('folders')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    set({
      folders: get().folders.filter(f => f.id !== id)
    })
  }
}))
