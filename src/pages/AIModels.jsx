import { Grid, Tabs } from '@mantine/core'
import { IconSettings, IconMessage } from '@tabler/icons-react'
import ModelSettings from '../components/ai/ModelSettings'
import Chat from '../components/ai/Chat'
import { useAiModelStore } from '../stores/aiModelStore'

export default function AIModels() {
  const { activeModel } = useAiModelStore()

  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        <Tabs.Tab value="chat" icon={<IconMessage size={14} />}>
          Chat
        </Tabs.Tab>
        <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
          Settings
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="chat" pt="xs">
        <Grid>
          <Grid.Col span={12}>
            <Chat />
          </Grid.Col>
        </Grid>
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        <Grid>
          <Grid.Col span={6}>
            <ModelSettings />
          </Grid.Col>
        </Grid>
      </Tabs.Panel>
    </Tabs>
  )
}
