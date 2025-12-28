import { Card, Typography, Skeleton } from "antd";
import { StatsCardProps } from "../../../interfaces";
import styles from "./StatsCard.module.css";

const { Text } = Typography;

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value = "—",
  icon,
  color = "#9254c9",
  loading = false,
}) => {
  const formatValue = (val: number | string) => {
    if (typeof val === "number") {
      return val.toLocaleString("es-ES");
    }
    return val;
  };

  return (
    <Card
      hoverable
      className={styles.card}
      styles={{
        body: {
          padding: "20px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        },
      }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 1 }} />
      ) : (
        <>
          {/* Header con ícono */}
          <div className={styles.header}>
            <Text type="secondary" className={styles.title}>
              {title}
            </Text>
            {icon && (
              <div
                className={styles.iconWrapper}
                style={{
                  background: `${color}15`,
                  color: color,
                }}
              >
                {icon}
              </div>
            )}
          </div>

          {/* Valor principal */}
          <div className={styles.valueWrapper}>
            <span className={styles.value}>{formatValue(value)}</span>
          </div>
        </>
      )}
    </Card>
  );
};
