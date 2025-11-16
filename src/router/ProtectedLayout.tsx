import { Outlet } from "react-router";
import { ThemedLayout, ThemedSider } from "@refinedev/antd";
import { Header } from "../components/header";

export default function ProtectedLayout() {
  return (
    <ThemedLayout Header={Header} Sider={(props) => <ThemedSider fixed {...props} />}>
      <Outlet />
    </ThemedLayout>
  );
}