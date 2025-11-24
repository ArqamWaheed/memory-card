import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/Gameboard.css'
import Gameboard from './ui/components/Gameboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Gameboard></Gameboard>
  </StrictMode>,
)
