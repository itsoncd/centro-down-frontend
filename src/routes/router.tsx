import { createBrowserRouter } from "react-router-dom";
import HomeLayoutDev from "@/layouts/HomeLayoutDev";
import HomePageDev from "@/pages/HomePageDev";
import DirectorLayout from "@/layouts/DirectorLayout";
import { DashboardAppointment } from "@/features/appointments/pages/DashboardAppointment";
import { InDevelopment } from "@/pages/InDevelopment";
import { HomePageDirector } from "@/features/appointments/pages/HomePageDirector";


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
    element: <DirectorLayout />,
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
]);
