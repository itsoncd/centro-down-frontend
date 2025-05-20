import { createBrowserRouter } from "react-router-dom";
import HomeLayoutDev from "@/layouts/HomeLayoutDev";
import HomePageDev from "@/pages/HomePageDev";
import AppLayout from "@/layouts/AppLayout";
import { DashboardAppointment } from "@/features/appointments/pages/DashboardAppointment";
import { InDevelopment } from "@/pages/InDevelopment";
import { HomePageDirector } from "@/features/appointments/pages/HomePageDirector";
import { NotFoundPage } from "@/pages/NotFoundPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayoutDev />,
    children: [
      {
        index: true,
        element: <HomePageDev />,
      },
    ],
  },
  {
    path: "/director",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePageDirector/>
      },
      {
        path: "citas",
        element: <DashboardAppointment/>,
      },
      {
        path: "agenda",
        element: <InDevelopment />
      },
      { 
        path: "profesores",
        element: <InDevelopment />
      },
      { path: "alumnos",
        element: <InDevelopment />
      }
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />
  },
]);
