import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const usePromptStore = create((set, get) => ({
  prompts: [],
  loading: false,

  fetchPrompts: async (folderId = null) => {
    set({ loading: true })
    try {
      let query = supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false })

      if (folderId) {
        query = query.eq('folder_id', folderId)
      }

      const { data, error } = await query
      if (error) throw error
      set({ prompts: data })
    } finally {
      set({ loading: false })
    }
  },

  createPrompt: async (promptData) => {
    const { data, error } = await supabase
      .from('prompts')
      .insert({
        ...promptData,
        user_id: supabase.auth.user().id
      })
      .select()
      .single()
    
    if (error) throw error
    set({ prompts: [...get().prompts, data] })
    return data
  },

  updatePrompt: async (id, updates) => {
    const { data, error } = await supabase
      .from('prompts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    set({
      prompts: get().prompts.map(p => 
        p.id === id ? data : p
      )
    })
    return data
  },

  deletePrompt: async (id) => {
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    set({
      prompts: get().prompts.filter(p => p.id !== id)
    })
  },

  toggleFavorite: async (id) => {
    const prompt = get().prompts.find(p => p.id === id)
    const { data, error } = await supabase
      .from('prompts')
      .update({ is_favorite: !prompt.is_favorite })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    set({
      prompts: get().prompts.map(p => 
        p.id === id ? data : p
      )
    })
  }
}))
