import {
    DashboardOutlined,
    CalendarOutlined,
    ApartmentOutlined,
    MessageOutlined,
    MailOutlined,
    WhatsAppOutlined,
    TeamOutlined,
    BuildOutlined,
    TagOutlined,
    SettingOutlined,
    AppstoreOutlined,
    TabletOutlined,
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
        create: "/leads/create",        
        edit: "/leads/edit/:id",
        meta: {
            label: "Leads (Kanban)",
            icon: <ApartmentOutlined />,
            order: 3,          
        },
    },
    {
        name: "chats",
        list: "/chats",
        meta: {
            label: "Chats Internos",
            icon: <MessageOutlined />, 
            order: 4,          
        },
    },
    {
        name: "emails",
        list: "/emails",
        meta: {
            label: "Correos",
            icon: <MailOutlined />,
            order: 5,
        },
    },
    {
        name: "whatsapp",
        list: "/whatsapp",
        meta: {
            label: "WhatsApp",
            icon: <WhatsAppOutlined />, // Puedes reemplazar con SVG
            order: 6,
        },
    },
    {
        name: "Reports",
        list: "/reports",
        meta: {
            label: "Reportes",
            icon: <TabletOutlined />, // Puedes reemplazar con SVG
            order: 6,
        },
    },

    // -------------------------
    // SECCIÓN: ENTIDADES
    // -------------------------

    {
        name: "contacts",
        list: "/contacts",
        create: "/contacts/create",
        edit: "/contacts/edit/:id",
        show: "/contacts/show/:id",
        meta: {
            label: "Contactos",
            icon: <TeamOutlined />,
            parent: "entities",
        },
    },
    {
        name: "companies",
        list: "/companies",
        meta: {
            label: "Compañías",
            icon: <BuildOutlined />,
            parent: "entities",
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
            icon: <TagOutlined />,
            parent: "entities",
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
        create: "/users/create",
        edit: "/users/edit/:id",
        show: "/users/show/:id",
        meta: {
            label: "Usuarios",
            icon: <TeamOutlined />,
            parent: "admin",
            authority: ["admin"],
        },
    },


    //Definicion de recursos que no aparecen en el menu
    {
        name: "lead-statuses",
        create:"/lead-statuses/create",
        edit:"/lead-statuses/edit/:id",
        options: { hide: true },
    },
    
    // Definición de secciones como "contenedores virtuales"
    {
        name: "entities",
        meta: {
            label: "Listados",
            icon: <AppstoreOutlined />,
        },
    },
    {
        name: "admin",
        meta: {
            label: "Administración",
            icon: <SettingOutlined />,
        },
    },
];