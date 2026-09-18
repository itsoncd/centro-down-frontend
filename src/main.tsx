import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@/config/i18n'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { TanStackProvider } from './plugins/TanStackProvider' 
import { ToastProvider } from './plugins/ToastProvider'
import { ensureCsrf } from './lib/axios'

// Prime the CSRF cookie; the 419 interceptor retries if it is missing or stale.
void ensureCsrf().catch(() => undefined)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanStackProvider>
      <ToastProvider>
        <RouterProvider router={router}/>
      </ToastProvider>
    </TanStackProvider>
  </StrictMode>,
)
