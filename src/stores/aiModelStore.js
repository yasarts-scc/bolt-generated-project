import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAiModelStore = create((set, get) => ({
  models: [],
  loading: false,
  activeModel: null,

  fetchModels: async () => {
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('ai_models')
        .select('*')
        .order('created_at', { ascending: true })
      
      if (error) throw error
      set({ models: data })
    } finally {
      set({ loading: false })
    }
  },

  saveModel: async (modelData) => {
    const { data, error } = await supabase
      .from('ai_models')
      .upsert({
        ...modelData,
        user_id: supabase.auth.user().id
      })
      .select()
      .single()
    
    if (error) throw error
    
    const models = get().models
    const updatedModels = models.some(m => m.id === data.id)
      ? models.map(m => m.id === data.id ? data : m)
      : [...models, data]
    
    set({ models: updatedModels })
    return data
  },

  deleteModel: async (id) => {
    const { error } = await supabase
      .from('ai_models')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    set({
      models: get().models.filter(m => m.id !== id),
      activeModel: get().activeModel?.id === id ? null : get().activeModel
    })
  },

  setActiveModel: (model) => {
    set({ activeModel: model })
  }
}))
