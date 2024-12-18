import { useState } from 'react'
import { TextInput, PasswordInput, Button, Stack, Text, Group } from '@mantine/core'
import { useAuthStore } from '../../stores/authStore'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { signIn, signUp } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password, fullName)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        {!isLogin && (
          <TextInput
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}
        
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <Text color="red">{error}</Text>}

        <Button type="submit" loading={loading}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>

        <Group position="apart">
          <Button variant="subtle" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account?' : 'Already have an account?'}
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
