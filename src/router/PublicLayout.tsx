import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div style={{ padding: 40 }}>
      <Outlet />
    </div>
  );
}