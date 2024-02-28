import AuthLayout from "@/layouts/auth";
import MainLayout from "@/layouts/main";
import BoardLayout from "@/layouts/board";
import LoadingScreen from "@/components/LoadingScreen";
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LandingLayout from "@/layouts/landing";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <LandingLayout />,
      children: [{ path: "", element: <LandingPage /> }],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { element: <Navigate to={"register"} replace />, index: true },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "organization", element: <BoardListPage /> },
        { path: "organization/activity", element: <BoardListPage /> },
        { path: "organization/settings", element: <BoardListPage /> },
        { path: "organization/billing", element: <BoardListPage /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/board",
      element: <BoardLayout />,
      children: [
        { path: "", element: <BoardPage /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// Auth
const RegisterPage = Loadable(lazy(() => import("@/pages/auth/Register")));
const LoginPage = Loadable(lazy(() => import("@/pages/auth/Login")));

// Marketing
const LandingPage = Loadable(lazy(() => import("@/pages/landing")));

// Dashoard
const BoardListPage = Loadable(
  lazy(() => import("@/pages/dashboard/BoardList"))
);

// Board
const BoardPage = Loadable(lazy(() => import("@/pages/board/Board")));
