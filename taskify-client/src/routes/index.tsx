import AuthLayout from "@/layouts/auth";
import MainLayout from "@/layouts/main";
import LoadingScreen from "@/pages/utils/LoadingScreen";
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

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
        { path: "", element: <LandingPage /> },
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
