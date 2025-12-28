import { StatsCard } from "./StatsCard";
import { UpcomingEvents } from "./UpcomingEvents";
import { Col, Row, Spin, Alert, Button } from "antd";
import {
  ReloadOutlined,
  TeamOutlined,
  TrophyOutlined,
  CloseCircleOutlined,
  FundOutlined,
  SyncOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useDashboardMetrics } from "../../../hooks/useDashboardMetrics";
import { LeadsByStatus } from "../../../interfaces";
import styles from "./DashboardGrid.module.css";
import { DashboardLeadStatusChart } from './DashboardLeadStatusChart';
import { DashboardResponseRateChart } from "./DashboardResponseRateChart";

export const DashboardGrid = () => {
  const { metrics, recentTasks, responseRateData, loading, error, refetch } =
    useDashboardMetrics();

  //Todo Mock momentaneo hasta tener llamados de mensajes de whatsapp y emails agregados al hook
  // const recentMessages: RecentMessage[] = [];

  const statsCards = [
    {
      title: "Total Contactos",
      value: metrics?.active_contacts ?? 0,
      icon: <TeamOutlined />,
      color: "#1677ff",
    },
    {
      title: "Leads Ganados",
      value:
        metrics?.leads_by_status.find(
          (status: LeadsByStatus) => status.status__name === "Ganado (Cliente)"
        )?.count ?? 0,
      icon: <TrophyOutlined />,
      color: "#52c41a",
    },
    {
      title: "Leads Perdidos",
      value:
        metrics?.leads_by_status.find(
          (status: LeadsByStatus) => status.status__name === "Perdido"
        )?.count ?? 0,
      icon: <CloseCircleOutlined />,
      color: "#ff4d4f",
    },
    {
      title: "Total Leads",
      value: metrics?.total_leads ?? 0,
      icon: <FundOutlined />,
      color: "#722ed1",
    },
    {
      title: "En Seguimiento",
      value:
        metrics?.leads_by_status.find(
          (status: LeadsByStatus) => status.status__name === "En seguimiento"
        )?.count ?? 0,
      icon: <SyncOutlined />,
      color: "#13c2c2",
    },
    {
      title: "En Negociación",
      value:
        metrics?.leads_by_status.find(
          (status: LeadsByStatus) => status.status__name === "Negociación"
        )?.count ?? 0,
      icon: <DollarOutlined />,
      color: "#faad14",
    },
  ];

  // Filtrar mensajes por canal
  // const whatsappMessages = recentMessages.filter(
  //   (msg) => msg.channel === "whatsapp"
  // );
  // const emailMessages = recentMessages.filter((msg) => msg.channel === "email");

  if (error) {
    return (
      <Alert
        message="Error al cargar métricas"
        description={error}
        type="warning"
        showIcon
        action={
          <Button size="small" icon={<ReloadOutlined />} onClick={refetch}>
            Reintentar
          </Button>
        }
        className={styles.errorAlert}
      />
    );
  }

  return (
    <Spin spinning={loading} tip="Cargando métricas...">
      <Row gutter={[16, 16]}>
        {/* Primera fila: Stats Cards */}
        {statsCards.map((card, index) => (
          <Col key={index} xs={12} sm={12} md={8} lg={8} xl={4}>
            <StatsCard
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              loading={loading}
            />
          </Col>
        ))}

      </Row>

      {/* Segunda fila: Eventos, WhatsApp, Email */}
      <div className={styles.secondRow}>
        <div className={styles.cardWrapper}>
          <UpcomingEvents events={recentTasks} loading={loading} />
        </div>
        <div className={styles.cardWrapper}>
          {/* <IncomingMessages
            messages={whatsappMessages}
            loading={loading}
            title="WhatsApp"
            channel="whatsapp"
          /> 
                   */}

          <DashboardResponseRateChart  data={responseRateData} loading={loading} error={error} />
        </div>
        <div className={styles.cardWrapper}>
          <DashboardLeadStatusChart />
        </div>
      </div>
    </Spin>
  );
};
