import { Provider } from '@/components/ui/provider'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/Router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <AppRouter />
    </Provider>
  </StrictMode>,
)
