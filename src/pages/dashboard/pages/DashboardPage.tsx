import { DashboardFilters } from "../components/DashboardFilters";
import { DashboardGrid } from "../components/DashboardGrid";
import styles from "./DashboardPage.module.css";

//Todo Dashboard Filters por ahora no esta funcional

const DashboardPage = () => {
  return (
    <div className={styles.container}>
      <DashboardFilters />
      <DashboardGrid />
    </div>
  );
};

export default DashboardPage;
