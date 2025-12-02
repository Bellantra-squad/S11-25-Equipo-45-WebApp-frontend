import {
  DashboardOutlined,
  CalendarOutlined,
  ApartmentOutlined,
  MailOutlined,
  WhatsAppOutlined,
  TeamOutlined,
  SettingOutlined,
  CheckSquareOutlined,
  TagsOutlined,
  FolderOutlined,
} from "@ant-design/icons";

export const resources = [
  // -------------------------
  // SECCIÓN: GENERAL
  // -------------------------
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
      order: 1,
    },
  },

  {
    name: "calendar",
    list: "/calendar",
    meta: {
      label: "Calendario",
      icon: <CalendarOutlined />,
      order: 2,
    },
  },

  {
    name: "leads",
    list: "/leads",
    meta: {
      label: "Leads",
      icon: <ApartmentOutlined />,
      order: 3,
    },
  },

  {
    name: "emails",
    list: "/emails",
    meta: {
      label: "Correos",
      icon: <MailOutlined />,
      order: 4,
    },
  },
  {
    name: "whatsapp",
    list: "/whatsapp",
    meta: {
      label: "WhatsApp",
      icon: <WhatsAppOutlined />, // Puedes reemplazar con SVG
      order: 5,
    },
  },
  {
    name: "contacts",
    list: "/contacts",
    create: "/contacts/create",
    edit: "/contacts/edit/:id",
    show: "/contacts/show/:id",
    meta: {
      label: "Contactos",
      icon: <TeamOutlined />,
      order: 6,
    },
  },
  {
    name: "tasks",
    list: "/tasks",
    create: "/tasks",
    edit: "/tasks/:id",
    show: "/tasks/:id",
    meta: {
      label: "Tareas",
      icon: <CheckSquareOutlined />,
      order: 7,
    },
  },
  {
    name: "categories",
    list: "/categories",
    create: "/categories/create",
    edit: "/categories/edit/:id",
    show: "/categories/show/:id",
    meta: {
      label: "Categorías",
      icon: <FolderOutlined />,
      order: 8,
    },
  },
  {
    name: "tags",
    list: "/tags",
    create: "/tags",
    edit: "/tags/:id",
    show: "/tags/:id",
    delete: "/tags/:id",
    meta: {
      label: "Etiquetas",
      icon: <TagsOutlined />,
      order: 9,
    },
  },

  // -------------------------
  // SECCIÓN: AJUSTES (solo admin)
  // -------------------------

  {
    name: "settings",
    list: "/settings",
    meta: {
      label: "Ajustes",
      icon: <SettingOutlined />,
      parent: "admin",
      authority: ["admin"], // permisos
    },
  },

  {
    name: "users",
    list: "/users",
    meta: {
      label: "Usuarios",
      icon: <TeamOutlined />,
      parent: "admin",
      authority: ["admin"],
    },
  },

  // Definición de secciones como "contenedores virtuales"

  {
    name: "admin",
    meta: {
      label: "Administración",
      icon: <SettingOutlined />,
    },
  },
];
