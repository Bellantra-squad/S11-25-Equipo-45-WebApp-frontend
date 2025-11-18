import { DashboardFilters } from "../components/DashboardFilters";
import { DashboardGrid } from "../components/DashboardGrid";

export const DashboardPage = () => {
  return (
    <div className="p-6">
      <DashboardFilters />
      <DashboardGrid />
    </div>
  );
};