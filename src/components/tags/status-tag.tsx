import { Tag, TagProps } from "antd";
import React from "react";

type StatusTagProps = {
    value: boolean;
    trueLabel?: string;
    falseLabel?: string;
    trueColor?: TagProps["color"];
    falseColor?: TagProps["color"];
    trueIcon?: React.ReactNode;
    falseIcon?: React.ReactNode;
};

export const StatusTag: React.FC<StatusTagProps> = ({
    value,
    trueLabel = "True",
    falseLabel = "False",
    trueColor = "green",
    falseColor = "red",
    trueIcon,
    falseIcon,
}) => {
    return (
        <Tag
            color={value ? trueColor : falseColor}
            icon={value ? trueIcon : falseIcon}
            style={{ textTransform: "capitalize" }}
        >
            {value ? trueLabel : falseLabel}
        </Tag>
    );
};