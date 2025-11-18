import { Card, Typography } from "antd";
import { StatsCardProps } from "../../../interfaces";

const { Title } = Typography;

export const StatsCard: React.FC<StatsCardProps> = ({ title, value = "—" }) => {
    return (
        <Card
            variant="borderless"
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Title level={5}>{title}</Title>
            <Title level={2}>{value}</Title>
        </Card>
    );
};