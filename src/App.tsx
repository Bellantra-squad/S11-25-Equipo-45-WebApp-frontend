import { BrowserRouter } from "react-router";
import { Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import {
  useNotificationProvider,
} from "@refinedev/antd";
import routerProvider from "@refinedev/react-router";
import "@refinedev/antd/dist/reset.css";
import "antd/dist/reset.css";
import { App as AntdApp } from "antd";
import AppRouter from "./router/AppRouter";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { refineOptions } from "./refine/options";
import { resources } from "./refine/resources";
import { authProvider, dataProvider } from "./refine/providers";
import { accessControlProvider } from "./refine/providers/accessControlProvider";

function App() {
  return (
    <BrowserRouter>     
        <RefineKbarProvider>
          <ColorModeContextProvider>
            <AntdApp>
              <DevtoolsProvider>              
                <Refine
                  dataProvider={dataProvider}
                  authProvider={authProvider}
                  accessControlProvider={accessControlProvider}
                  routerProvider={routerProvider}
                  notificationProvider={useNotificationProvider}
                  resources={resources}
                  options={refineOptions}
                >                
                  <AppRouter />
                  <DevtoolsPanel />                
                </Refine>             
              </DevtoolsProvider>
            </AntdApp>
          </ColorModeContextProvider>
        </RefineKbarProvider>     
    </BrowserRouter>
  );
}

export default App;

