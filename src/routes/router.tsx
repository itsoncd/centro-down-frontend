import HomeLayoutDev from '@/layouts/HomeLayoutDev'
import HomePageDev from '@/pages/HomePageDev'
import { createBrowserRouter } from 'react-router-dom'


export const router = createBrowserRouter([
  {
  path: '/',
  element: <HomeLayoutDev />,
  children: [
    {
      index: true,
      element: <HomePageDev />,
    },
  ],
}

])
