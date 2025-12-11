import { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router";
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
const WhatsAppListPage = lazy(() => import("../pages/whatsapp/pages/ListWhatsappMessages"));
const LeadCreateModal = lazy(()=> import("../pages/leads/pages/create"));
const LeadEditModal = lazy(()=> import("../pages/leads/pages/edit"));
const TableViewTags = lazy(()=> import("../pages/tags/pages/list"));
const TagShow = lazy(()=> import("../pages/tags/pages/show"));
const TagEdit = lazy(()=> import("../pages/tags/pages/edit"));
const TagCreatePage = lazy(()=> import("../pages/tags/pages/create"));
const UsersListPage = lazy(()=> import("../pages/administration/users/pages/list"));
const UserCreate = lazy(()=> import("../pages/administration/users/pages/create"));
const UserEdit = lazy(()=> import("../pages/administration/users/pages/edit"));
const UserShow = lazy(()=> import("../pages/administration/users/pages/show"));
const EmailPageWrapper = lazy(()=> import("../pages/email/pages/wrapper"));
const EmailTemplate = lazy(()=> import("../pages/email/pages/templates/list"));
const TemplateEdit = lazy(()=> import("../pages/email/pages/templates/edit"));
const TemplateCreatePage = lazy(()=> import("../pages/email/pages/templates/create"));
const SendEmailTemplatePage = lazy(()=> import("../pages/email/pages/templates/send-email-template"));
const CalendarPageWrapper = lazy(()=> import("../pages/calender/pages/wrapper"));
const CalendarCreatePage = lazy(()=> import("../pages/calender/pages/create"));
const TaskListPage = lazy(()=> import("../pages/calender/pages/list"));
const TaskShowModal = lazy(()=> import("../pages/calender/pages/show"));
const TaskEdit = lazy(()=> import("../pages/calender/pages/edit"));
const KanbanCreateStage = lazy(()=> import("../pages/leads/pages/create-status"));
const KanbanEditStage = lazy(()=> import("../pages/leads/pages/edit-status"));
const EmailTemplateShow = lazy(()=> import("../pages/email/pages/templates/show"));
const SettingsPage = lazy(()=> import("../pages/administration/settings/pages/wrapper"));
const EmailSettingsPage = lazy(()=> import("../pages/administration/settings/pages/email-settings-page"));
const IntegrationPage = lazy(()=> import("../pages/administration/settings/pages/integration-page"));
const BillingPage = lazy(()=> import("../pages/administration/settings/pages/billing-page"));

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

          <Route path="/kanbas" element={<Outlet />}>
            <Route path="leads" element={<LeadListPage ><Outlet /> </LeadListPage>} >
              <Route path="create" element={<LeadCreateModal />} />
              <Route path="edit/:id" element={<LeadEditModal/>} />
              <Route path="lead-statuses/create" element={<KanbanCreateStage />} />
              <Route path="lead-statuses/edit/:id" element={<KanbanEditStage />} />
            </Route>
          </Route>

          <Route path="whatsapp">
            <Route index element={<WhatsAppListPage />} />
          </Route>

          <Route path="tags">
            <Route index element={<TableViewTags />} />
            <Route path="show/:id" element={<TagShow />} />
            <Route path="create" element={<TagCreatePage />} />
            <Route path="edit/:id" element={<TagEdit />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersListPage />} />
            <Route path="show/:id" element={<UserShow />} />
            <Route path="create" element={<UserCreate />} />
            <Route path="edit/:id" element={<UserEdit />} />
          </Route>

          <Route path="emails">
            <Route index element={<EmailPageWrapper />} />
          </Route>

          <Route path="email-templates">
            <Route index element={<EmailTemplate />} />
            <Route path="create" element={<TemplateCreatePage />} />
            <Route path="edit/:id" element={<TemplateEdit />} />
            <Route path="show/:id" element={<EmailTemplateShow />} />
          </Route>

          <Route path="/email-templates/send" element={<SendEmailTemplatePage />} />

          <Route path="calendar">
            <Route index element={<CalendarPageWrapper />} />
          </Route>

          <Route path="tasks">
            <Route index element={<TaskListPage />} />
            <Route path="create" element={<CalendarCreatePage />} />
            <Route path="edit/:id" element={<TaskEdit />} />
            <Route path="show/:id" element={<TaskShowModal />} />
          </Route>
         
          <Route>
            <Route path="/settings" element={<SettingsPage />}>
              <Route path="email" element={<EmailSettingsPage />} />
              <Route path="integration" element={<IntegrationPage />} />
              <Route path="billing" element={<BillingPage />} />
            </Route>
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