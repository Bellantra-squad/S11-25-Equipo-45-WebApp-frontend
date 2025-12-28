import React from "react";
import { useOne, useList } from "@refinedev/core";
import { Spin } from "antd";
import styles from "./index.module.css";

import { Lead } from "../../../interfaces/models/lead.interface";
import { LeadStatus } from "../../../interfaces/models/lead-status.interfaces";
import { Text } from "../../../components/base/text";

type Props = {
  leadId: number;
};

export const ContactStatusLead: React.FC<Props> = ({ leadId }) => {
  const { result: lead, query: leadQuery } = useOne<Lead>({
    resource: "leads",
    id: leadId,
    queryOptions: { enabled: !!leadId },
  });

  const { result: statusesData, query: statusesQuery } = useList<LeadStatus>({
    resource: "lead-statuses",
  });

  if (leadQuery.isLoading || statusesQuery.isLoading) {
    return <Spin />;
  }

  const currentStatus = lead?.status;
  const statuses = statusesData?.data ?? [];

  const currentIndex = statuses.findIndex((s) => s.id === currentStatus?.id);

 
  return (
    <>
        <Text strong>
            Estado del Lead:{" "}
            <Text
            style={{
                marginLeft: ".2rem",
                textTransform: "capitalize",
                fontWeight: "normal",
                color: currentStatus?.color || "inherit",               
            }}
            >
            {currentStatus?.name}
            </Text>
        </Text>
    
        <div className={styles.pipeline}>
        {statuses.map((status, index) => {
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;
            const backgroundColor = isCompleted || isActive ? currentStatus?.color : "#f0f0f0";
            const textColor = isActive ? "#fff" : "#000";
            const opacity = isActive ? 1 : isCompleted ? 1 : 0.4;

            return (
            <div
                key={status.id}
                className={`${styles.stage} ${isActive ? styles.active : ""}`}
                style={{
                backgroundColor,
                color: textColor,
                opacity,
                flex: 1,
                cursor: "pointer",
                }}                
            >
                {status.name}
            </div>
            );
        })}
        </div>
    </>
  );
};
