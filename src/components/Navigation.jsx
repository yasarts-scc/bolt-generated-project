import { Navbar, UnstyledButton, Stack } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { IconDashboard, IconRobot, IconPrompt, IconFiles } from '@tabler/icons-react'

export default function Navigation() {
  const navigate = useNavigate()

  const navItems = [
    { icon: IconDashboard, label: 'Dashboard', path: '/' },
    { icon: IconRobot, label: 'AI Models', path: '/ai-models' },
    { icon: IconPrompt, label: 'Prompts', path: '/prompts' },
    { icon: IconFiles, label: 'Documents', path: '/documents' },
  ]

  return (
    <Navbar width={{ base: 250 }} p="xs">
      <Stack>
        {navItems.map((item) => (
          <UnstyledButton
            key={item.path}
            onClick={() => navigate(item.path)}
            p="xs"
          >
            <item.icon size={20} />
            {item.label}
          </UnstyledButton>
        ))}
      </Stack>
    </Navbar>
  )
}
