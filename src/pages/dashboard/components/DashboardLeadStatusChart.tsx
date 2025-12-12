import React, { lazy, Suspense, useMemo } from "react";
import { Card, Button, Spin } from "antd";
import { ProjectOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useNavigation } from "@refinedev/core";
import { useDashboardMetrics } from "../../../hooks/useDashboardMetrics";
import { Text } from "../../../components/base/text";
import { PieConfig } from "@ant-design/plots";

const Pie = lazy(() => import("@ant-design/plots/es/components/pie"));

export const DashboardLeadStatusChart: React.FC = () => {
  const { list } = useNavigation();
  const { leadStatusMetric: metrics, loading, error } = useDashboardMetrics();

  const leadsData = useMemo(() => {
    if (!metrics?.leads_by_status?.length) return [];

    return metrics.leads_by_status
      .filter((s) => s.count > 0)
      .map((s) => ({
        title: s.status_name,
        value: s.count,
        color: s.color,
        percentage: s.percentage,
      }));
  }, [metrics]);

  const config: PieConfig = {
    width: 168,
    height: 168,
    data: leadsData,
    angleField: "value",
    colorField: "title",
    color: leadsData.map((s) => s.color),
    legend: false,
    radius: 1,
    innerRadius: 0.6,
    label: false,
    syncViewPadding: true,
    statistic: {
      title: false,
      content: false,
    },
  };

  if (loading) return <Spin />;
  if (error || !leadsData.length) return null;

  return (
    <Card
      style={{ height: "100%" }}
      headStyle={{ padding: "8px 16px" }}
      bodyStyle={{ padding: "32px" }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ProjectOutlined />
          <Text size="sm" style={{ marginLeft: ".5rem" }}>
            Leads por estado
          </Text>
        </div>
      }
      extra={
        <Button onClick={() => list("leads")} icon={<RightCircleOutlined />}>
          Ver tablero
        </Button>
      }
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Suspense>
          <Pie {...config} />
        </Suspense>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {leadsData.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              width: "50%",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: item.color,
                marginRight: ".5rem",
              }}
            />
            <Text
              size="md"
              style={{
                textTransform: "capitalize",
                whiteSpace: "nowrap",
              }}
            >
              {item.title.toLowerCase()}
            </Text>
          </div>
        ))}
      </div>
    </Card>
  );
};
