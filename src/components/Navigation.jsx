import { NavLink } from '@mantine/core'
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
    <nav style={{ width: 250, padding: '1rem' }}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          onClick={() => navigate(item.path)}
          label={item.label}
          leftSection={<item.icon size={20} />}
        />
      ))}
    </nav>
  )
}
