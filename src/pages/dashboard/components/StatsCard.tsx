// import { Card } from "antd";
// import React from "react";

interface StatsCardProps {
  title: string;
  value?: number | string;
  icon?: React.ReactNode;
}

// export const StatsCard: React.FC<StatsCardProps> = ({ title, value = "—", icon }) => {
//   return (
//     <Card className="shadow-sm flex items-center justify-between">
//       <div>
//         <h3 className="text-sm font-medium text-gray-500">{title}</h3>
//         <p className="text-2xl font-bold mt-2">{value}</p>
//       </div>
//       {icon && <div className="text-gray-400 text-3xl">{icon}</div>}
//     </Card>
//   );
// };

import { Card, Typography } from "antd";

const { Title } = Typography;

export const StatsCard: React.FC<StatsCardProps> = ({ title, value = "—" }) => {
    return (
        <Card
            bordered
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