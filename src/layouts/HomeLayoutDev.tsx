import { Outlet } from 'react-router-dom'
import HeaderDev from '@/components/HeaderDev'
import FooterDev from '@/components/FooterDev'

export default function HomeLayoutDev() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-blue-900">
      <HeaderDev />
      <main className="flex-1">
        <Outlet />
      </main>
      <FooterDev />
    </div>
  )
}
