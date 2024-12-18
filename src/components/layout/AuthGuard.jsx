import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Loader, Center } from '@mantine/core'
import { useAuthStore } from '../../stores/authStore'

export default function AuthGuard({ children }) {
  const { user, loading, initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [])

  if (loading) {
    return (
      <Center h="100vh">
        <Loader size="xl" />
      </Center>
    )
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return children
}
