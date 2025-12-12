import React, { lazy, Suspense } from "react";
import { Card, Spin } from "antd";
import { PieConfig } from "@ant-design/plots";
import { MessageOutlined } from "@ant-design/icons";
import { Text } from "../../../components/base/text";
import { ResponseRateData } from "../../../interfaces";

const Pie = lazy(() => import("@ant-design/plots/es/components/pie"));


interface Props {
  data: ResponseRateData | null;
  loading?: boolean;
  error?: string | null;
}

export const DashboardResponseRateChart: React.FC<Props> = ({
  data,
  loading = false,
  error = null,
}) => {
  const chartData = [
    {
      type: "Mensajes enviados",
      value: data?.messages_sent,
      color: "#1677FF",
    },
    {
      type: "Mensajes recibidos",
      value: data?.messages_received,
      color: "#52C41A",
    },
  ];

  const config: PieConfig = {
    width: 300,
    height: 300,
    data: chartData,
    angleField: "value",
    colorField: "type",
    color: chartData.map((s) => s.color),
    radius: 1,
    innerRadius: 0.6,
    legend: true,
    label: false,
    statistic: {
      title: {
        style: { fontSize: 14 },
        formatter: () => "Response Rate",
      },
      content: {
        style: { fontSize: 18, fontWeight: 600 },
        formatter: () => `${data?.response_rate.toFixed(1)}%`,
      },
    },
  };

  if (loading) return <Spin />;
  if (error) return <Text size="sm">{error}</Text>;

  return (
    <Card
      style={{ height: "100%" }}
      headStyle={{ padding: "8px 16px" }}
      bodyStyle={{ padding: "32px" }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MessageOutlined />
          <Text size="sm" style={{ marginLeft: ".5rem" }}>
            Tasa de respuesta
          </Text>
        </div>
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

      
    </Card>
  );
};

