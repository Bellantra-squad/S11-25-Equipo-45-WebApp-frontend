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
    list: "/kanbas/leads",        
    create: "/kanbas/leads/create",        
    edit: "/kanbas/leads/edit/:id",
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
    create: "/tasks/create",
    edit: "/tasks/edit/:id",
    show: "/tasks/show/:id",
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
    create: "/tags/create",
    edit: "/tags/edit/:id",
    show: "/tags/show/:id",
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
      authority: ["admin", "superadmin"], // permisos
    },
  },

  {
    name: "users",
    list: "/users",
    create: "/users/create",
    edit: "/users/edit/:id",
    show: "/users/show/:id",
    meta: {
        label: "Usuarios",
        icon: <TeamOutlined />,
        parent: "admin",
        authority: ["admin", "superadmin"],
    },
  },


  // Definición de secciones como "contenedores virtuales"

  {
    name: "admin",
    meta: {
      label: "Administración",
      icon: <SettingOutlined />,
      authority: ["admin", "superadmin"],
    },
  },

  //Definicion de recursos que no aparecen en el menu
    {
        name: "lead-statuses",
        create:"/kanbas/leads/lead-statuses/create",
        edit:"/kanbas/leads/lead-statuses/edit/:id",
        meta: {
          hide: true,
        }
    },
    {
      name: "email-templates",      
      list: "/email-templates",
      show: "/email-templates/show/:id",
      create:"/email-templates/create",
      edit:"/email-templates/edit/:id",
      meta: {
        label: "Plantillas de Correo",
        hide: true,
        routes: {
          send: "/email-templates/send", // ruta personalizada
        },
      }
    },
];