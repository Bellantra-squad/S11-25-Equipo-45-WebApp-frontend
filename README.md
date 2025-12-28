# 🧩 Startup CRM

![Startup CRM](image.png)

## 📌 Descripción

**Startup CRM** es un sistema de gestión de relaciones con clientes (CRM) diseñado para startups que necesitan centralizar la comunicación con leads y clientes en tiempo real.  
El proyecto está construido con **React 19**, **Vite**, **TypeScript** y el ecosistema de **Refine + Ant Design**, ofreciendo una experiencia moderna, colaborativa y personalizable.

---

## 🚀 Objetivo

Desarrollar un CRM inteligente con integración nativa a **WhatsApp Cloud API** y **Brevo (SMTP)** para correo electrónico.  
La herramienta permite gestionar conversaciones, automatizar tareas y segmentar usuarios, priorizando simplicidad, colaboración y trabajo asincrónico.

---

## 🛠️ Tecnologías principales

- **Frontend Framework:** React 19 + Vite
- **UI Library:** Ant Design 5 + @ant-design/icons
- **State & Data:** Refine Core, Refine Antd, Refine Router
- **Drag & Drop:** dnd-kit (board estilo kanban)
- **TypeScript:** Tipado estricto
- **Linting & Calidad:** ESLint + TypeScript ESLint
- **Routing:** React Router v7


This [Refine](https://github.com/refinedev/refine) project was generated with [create refine-app](https://github.com/refinedev/refine/tree/master/packages/create-refine-app).

## 📂 Módulos actuales
- **👤 Usuarios y Settings (Administrador)**
- **📊 Leads (estilo kanban board)**
- **📇 Contactos**
- **🏷️ Categorías y Etiquetas**
- **📧 Plantillas de correo y envío de emails**
- **💬 Integración con WhatsApp**
- **📩 Integración con Brevo (SMTP)**
- **⚙️ Tareas automáticas y manuales**
- **📅 Calendario de tareas**
- **📈 Dashboard de métricas**
- **🔔 Notificaciones**


## 🛠️Requerimientos funcionales
- Gestión de contactos y segmentación por estado del funnel.
- Integración de canales de comunicación (WhatsApp, Email).
- Envío de emails con plantillas.
- Tareas Automaticas.
- Panel de métricas y analítica.
- Exportación de datos en CSV o PDF.


##🔗 Integraciones externas
- WhatsApp Cloud API (Meta)
- Brevo / SMTP API para email

### Clonar e Instalar.

```bash
    git clone https://github.com/tu-org/crm-startup.git
    cd crm-startup
    npm install
```

### Ejecutar en modo desarrollo.

```bash
    npm run dev
```

### Compilar para producción.

```bash
    npm run build
```

### Running the production server.

```bash
    npm run start
```

## 🧑‍💻 Contribución
1. Haz un fork del repositorio.
2. Crea una rama de feature: ```bash git checkout -b feature/nueva-funcionalidad.```
3. Haz commit de tus cambios: ```bash git commit -m "Agrega nueva funcionalidad".```
4. Haz push a la rama: ```bash git push origin feature/nueva-funcionalidad.```
5. Abre un Pull Request.

## 📜 Licencia
Simulacion NoCountry.

## Documentacion Externa

To learn more about **Refine**, please check out the [Documentation](https://refine.dev/docs)

- **REST Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Ant Design** [Docs](https://refine.dev/docs/ui-frameworks/antd/tutorial/)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)
- **Custom Auth Provider** [Docs](https://refine.dev/docs/core/providers/auth-provider/)
