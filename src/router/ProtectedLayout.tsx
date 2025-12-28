import { Outlet } from "react-router";
import { ThemedLayout, ThemedSider } from "@refinedev/antd";

import { AppTitle } from "../components/layout/Title";
import { Header } from "../components";
import { CanAccess } from "@refinedev/core";

export default function ProtectedLayout() {
  return (
    <ThemedLayout Header={Header} Sider={(props) => 
      <ThemedSider
            {...props}
            render={({ items }) => items} 
            Title={({ collapsed }) => <AppTitle collapsed={collapsed} />}
            fixed 
        />
    }>
      <CanAccess>
        <Outlet />
      </CanAccess>      
    </ThemedLayout>
  );
}