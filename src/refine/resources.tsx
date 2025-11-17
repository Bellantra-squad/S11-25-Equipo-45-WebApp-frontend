import {
    DashboardOutlined,
    GroupOutlined,
    TeamOutlined, 
} from "@ant-design/icons";

export const resources = [
    {
        name: "dashboard",
        list: "/",
        meta: {
            label: "Dashboard",
            icon: <DashboardOutlined />,
        },
    },
    {
        name: "contacts",
        list: "/contacs",
        create: "/contacs/create",
        edit: "/contacs/edit/:id",
        show: "/contacs/show/:id",
        meta: { 
            canDelete: true,
            label: "Contactos",
            icon: <TeamOutlined />
         },
    },
    {
        name: "categories",
        list: "/categories",
        create: "/categories/create",
        edit: "/categories/edit/:id",
        show: "/categories/show/:id",
        meta: { 
            canDelete: true, 
            label: "Categorías",
            icon: <GroupOutlined />,
        },
    },
    
];