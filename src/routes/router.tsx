import { createBrowserRouter } from "react-router-dom";
import HomeLayoutDev from "@/layouts/HomeLayoutDev";
import HomePageDev from "@/pages/HomePageDev";
import AppLayout from "@/layouts/AppLayout";
import { DashboardAppointment } from "@/features/appointments/pages/DashboardAppointment";
import { InDevelopment } from "@/pages/InDevelopment";
import { HomePageDirector } from "@/features/appointments/pages/HomePageDirector";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { DashboardManageUser } from "@/features/manage-user/pages/DashboardManageUser";
import { AuthGuard } from "@/guards/AuthGuard";
import { ItemPage } from "@/features/evaluation-template/ItemPage";
import CreateEvaluationTemplate from "@/features/evaluation-templates/pages/CreateEvaluationTemplate";
import EditEvaluationTemplate from "@/features/evaluation-templates/pages/EditEvaluationTemplate";
import MyTemplates from "@/features/evaluation-templates/pages/MyTemplates";
import { DashboardEvaluations } from "@/features/evaluations/pages/DashboardEvaluations";
import { EvaluationPanel } from "@/features/evaluations/pages/EvaluationPanel";
import { ListEvaluations } from "@/features/evaluations/pages/ListEvaluations";
import DefaultLayout from "@/layouts/DefaultLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePageDev />,
      },
      {
        // Páginas de evaluaciones: /evaluaciones/<página>
        path: "evaluaciones/aplicacion-de-evaluaciones",
        element: <ListEvaluations />,
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
      },
      {
        path: "administrar-usuarios",
        element: <DashboardManageUser />
      },
      {
        path: "plantillas",
        element: <CreateEvaluationTemplate />
      },
      {
        path: "plantillas/editar/:id",
        element: <EditEvaluationTemplate />
      },
      {
        path: "plantillas/mis-plantillas",
        element: <MyTemplates />
      }
    ],
  },
  {
    path: "/tutor",
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
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
        path: "evaluaciones",
        element: <DashboardEvaluations />,
      },
      {
        path: "calificar/:id",
        element: <EvaluationPanel />
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/items",
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <ItemPage />
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  },
]);
