import { DashboardFilters } from "../components/DashboardFilters";
import { DashboardGrid } from "../components/DashboardGrid";

const DashboardPage = () => {
  return (
    <div className="p-6">
      <DashboardFilters />
      <DashboardGrid />
    </div>
  );
};

export default DashboardPage;