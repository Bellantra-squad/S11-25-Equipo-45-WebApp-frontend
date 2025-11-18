import { Outlet } from "react-router";
import { ThemedLayout, ThemedSider } from "@refinedev/antd";

import { AppTitle } from "../components/layout/Title";
import { Header } from "../components";

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
      <Outlet />
    </ThemedLayout>
  );
}