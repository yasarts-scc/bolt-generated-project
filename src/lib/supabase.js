import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bzgzedanohykqiomifwf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6Z3plZGFub2h5a3Fpb21pZndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMTY5OTcsImV4cCI6MjA0OTU5Mjk5N30.Evq8AkWsiaiepVXr_K4omDpL4SloyrxoF8j3fJRe8dk'

export const supabase = createClient(supabaseUrl, supabaseKey)
