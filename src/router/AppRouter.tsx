import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router";
import { Authenticated, ErrorComponent } from "@refinedev/core";

import ProtectedLayout from "./ProtectedLayout";
import PublicLayout from "./PublicLayout";
import { AppLoader } from "../components/loading/AppLoader";

//lazy loading
const LoginPage = lazy(() => import("../pages/login"));
const ForgotPassword = lazy(() => import("../pages/forgotPassword"));
const RegisterPage = lazy(() => import("../pages/register"));
const DashboardPage = lazy(() => import("../pages/dashboard/pages/DashboardPage"));
const ContactList = lazy(() => import("../pages/contacts/pages/list"));
const ContactsCreate = lazy(() => import("../pages/contacts/pages/create"));
const ContactEdit = lazy(() => import("../pages/contacts/pages/edit"));
const ContactsShow = lazy(() => import("../pages/contacts/pages/show"));
const CategoryListPage = lazy(() => import("../pages/categories/pages/list"));
const CategoryCreatePage = lazy(() => import("../pages/categories/pages/create"));
const CategoryEdit = lazy(() => import("../pages/categories/pages/edit"));
const LeadListPage = lazy(() => import("../pages/leads/pages/list"));
const CategoryShow = lazy(() => import("../pages/categories/pages/show"));

export default function AppRouter() {
  return (
    <Suspense fallback={<AppLoader tip="Cargando..." />}>
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
          <Route index element={<DashboardPage />} />

          <Route path="contacts">
            <Route index element={<ContactList />} />
            <Route path="create" element={<ContactsCreate />} />
            <Route path="edit/:id" element={<ContactEdit />} />
            <Route path="show/:id" element={<ContactsShow />} />
          </Route>

          <Route path="categories">
            <Route index element={<CategoryListPage />} />
            <Route path="create" element={<CategoryCreatePage />} />
            <Route path="edit/:id" element={<CategoryEdit />} />
            <Route path="show/:id" element={<CategoryShow />} />
          </Route>

          <Route path="leads">
            <Route index element={<LeadListPage />} />
            <Route path="create" element={<CategoryCreatePage />} />
            {/* <Route path="edit/:id" element={<ContactEdit/>} />
            <Route path="show/:id" element={<ContactsShow />} />  */}
          </Route>

          <Route path="*" element={<ErrorComponent />} />
        </Route>

        {/* Rutas públicas (login / register / forgot password) */}
        <Route
          element={
            <Authenticated
              key="authenticated-outer"
              fallback={<PublicLayout />}
            >
              <NavigateToResource />
            </Authenticated>
          }
        >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </Suspense>
    
  );
}
