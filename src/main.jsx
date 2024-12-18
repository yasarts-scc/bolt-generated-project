import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import App from './App'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css'

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, sans-serif'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Notifications />
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
)
