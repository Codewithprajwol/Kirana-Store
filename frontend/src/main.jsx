import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'

createRoot(document.getElementById('root')).render(
    <ThemeProvider  storageKey="vite-ui-theme">
        <StrictMode>
        <BrowserRouter>
        <App />
        </BrowserRouter>
        </StrictMode>
    </ThemeProvider>
)
