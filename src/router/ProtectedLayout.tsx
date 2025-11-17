import { Outlet } from "react-router";
import { ThemedLayout, ThemedSider } from "@refinedev/antd";
import { Header } from "../components/header";
import { AppTitle } from "../components/layout/Title";

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