import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { TanStackProvider } from './plugins/TanStackProvider' 
import { ToastProvider } from './plugins/ToastProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanStackProvider>
      <ToastProvider>
        <RouterProvider router={router}/>
      </ToastProvider>
    </TanStackProvider>
  </StrictMode>,
)
