import { Route, Routes } from "react-router";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router";
import { Authenticated, ErrorComponent } from "@refinedev/core";
import { ForgotPassword } from "../pages/forgotPassword";
import ProtectedLayout from "./ProtectedLayout";
import PublicLayout from "./PublicLayout";
import { Dashboard } from "../pages/dashboard";
import { LoginPage } from "../pages/login";
import { RegisterPage } from "../pages/register";

export default function AppRouter() {
  return (
    <Routes>


      {/* Rutas protegidas */}
      
      <Route
        element={
            <Authenticated
            key="authenticated-inner"
            fallback={<CatchAllNavigate to="/login" />}
            >
                <ProtectedLayout />              
            </Authenticated>
        }
        >
        <Route index element={<Dashboard />} />      

        <Route path="*" element={<ErrorComponent />} />
      </Route>

      {/* Rutas públicas (login / register / forgot password) */}
      <Route
        element={
          <Authenticated key="authenticated-outer" fallback={<PublicLayout />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
      </Route>
    </Routes>
  );
}