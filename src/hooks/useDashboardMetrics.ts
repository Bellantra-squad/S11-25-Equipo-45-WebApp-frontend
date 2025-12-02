import { useState, useEffect, useCallback } from "react";
import { httpApi } from "../refine/api/httpApi";
import type {
  DashboardMetrics,
  RecentTask,
} from "../interfaces/models/metrics.interface";

interface UseDashboardMetricsResult {
  metrics: DashboardMetrics | null;
  recentTasks: RecentTask[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useDashboardMetrics = (): UseDashboardMetricsResult => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  const [recentTasks, setRecentTasks] = useState<RecentTask[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch todas las métricas en paralelo
      const [metricsRes, tasksRes] = await Promise.allSettled([
        httpApi.get("/metrics/dashboard/"),
        httpApi.get("/tasks/?ordering=asc&page_size=5"),
      ]);

      // Procesar métricas principales
      if (metricsRes.status === "fulfilled") {
        setMetrics(metricsRes.value.data);
      }

      // Procesar tareas recientes ultimas 5
      if (tasksRes.status === "fulfilled") {
        const data = tasksRes.value.data;
        setRecentTasks(Array.isArray(data) ? data : data.results ?? []);
      }

      // Si todos fallaron, mostrar error
      const allFailed = [metricsRes, tasksRes].every(
        (r) => r.status === "rejected"
      );

      if (allFailed) {
        setError("No se pudieron cargar las métricas");
      }
    } catch (err) {
      setError("Error al cargar las métricas del dashboard");
      console.error("Dashboard metrics error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return {
    metrics,
    recentTasks,
    loading,
    error,
    refetch: fetchMetrics,
  };
};
