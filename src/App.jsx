import { AppShell, Navbar, Header } from '@mantine/core'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import AuthGuard from './components/layout/AuthGuard'
import AuthForm from './components/auth/AuthForm'
import Dashboard from './pages/Dashboard'
import AIModels from './pages/AIModels'
import Prompts from './pages/Prompts'
import Documents from './pages/Documents'

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthForm />} />
      
      <Route
        path="/*"
        element={
          <AuthGuard>
            <AppShell
              padding="md"
              navbar={<Navigation />}
              header={<Header height={60} p="xs">AI Prompt Manager</Header>}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/ai-models" element={<AIModels />} />
                <Route path="/prompts" element={<Prompts />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AppShell>
          </AuthGuard>
        }
      />
    </Routes>
  )
}
