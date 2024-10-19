import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import EnglishQuizApp from './components/EnglishQuizApp.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EnglishQuizApp />
  </StrictMode>,
)
