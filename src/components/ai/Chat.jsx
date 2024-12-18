import { useState, useRef, useEffect } from 'react'
import { 
  Paper, 
  Stack, 
  Textarea, 
  Button, 
  Text,
  ScrollArea,
  Avatar,
  Group
} from '@mantine/core'
import { useAiModelStore } from '../../stores/aiModelStore'
import { sendOpenAIPrompt } from '../../lib/ai/openai'
import { sendAnthropicPrompt } from '../../lib/ai/anthropic'
import { sendGeminiPrompt } from '../../lib/ai/gemini'

export default function Chat({ prompt }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const viewport = useRef(null)
  const { activeModel } = useAiModelStore()

  useEffect(() => {
    if (prompt) {
      setMessages([{ role: 'system', content: prompt.content }])
    }
  }, [prompt])

  const scrollToBottom = () => {
    if (viewport.current) {
      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' })
    }
  }

  useEffect(scrollToBottom, [messages])

  const sendMessage = async () => {
    if (!input.trim() || !activeModel) return

    const newMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, newMessage])
    setInput('')
    setLoading(true)

    try {
      let response
      const allMessages = messages.concat(newMessage)
        .filter(m => m.role !== 'system')

      switch (activeModel.provider) {
        case 'openai':
          response = await sendOpenAIPrompt(
            activeModel.api_key,
            activeModel.model,
            allMessages
          )
          setMessages(prev => [...prev, response.choices[0].message])
          break

        case 'anthropic':
          response = await sendAnthropicPrompt(
            activeModel.api_key,
            activeModel.model,
            allMessages
          )
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: response.content[0].text 
          }])
          break

        case 'gemini':
          response = await sendGeminiPrompt(
            activeModel.api_key,
            activeModel.model,
            allMessages
          )
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: response.candidates[0].content.parts[0].text 
          }])
          break
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, { 
        role: 'error', 
        content: `Error: ${error.message}` 
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper p="md" withBorder>
      <Stack spacing="md" h={600}>
        <ScrollArea h={500} viewportRef={viewport}>
          <Stack spacing="xs">
            {messages.map((message, index) => (
              <Group 
                key={index}
                align="flex-start"
                spacing="xs"
                style={{
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                {message.role !== 'user' && (
                  <Avatar color="blue" radius="xl">
                    AI
                  </Avatar>
                )}
                <Paper 
                  p="xs" 
                  style={{
                    maxWidth: '70%',
                    backgroundColor: message.role === 'user' ? '#e3f2fd' : '#f5f5f5'
                  }}
                >
                  <Text style={{ whiteSpace: 'pre-wrap' }}>
                    {message.content}
                  </Text>
                </Paper>
                {message.role === 'user' && (
                  <Avatar color="green" radius="xl">
                    You
                  </Avatar>
                )}
              </Group>
            ))}
          </Stack>
        </ScrollArea>

        <Group align="flex-start">
          <Textarea
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1 }}
            autosize
            maxRows={4}
            disabled={loading || !activeModel}
          />
          <Button 
            onClick={sendMessage}
            loading={loading}
            disabled={!input.trim() || !activeModel}
          >
            Send
          </Button>
        </Group>
      </Stack>
    </Paper>
  )
}
