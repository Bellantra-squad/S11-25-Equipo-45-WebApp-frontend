import { FC, memo } from "react";
import type { AvatarProps } from "antd";
import { Avatar as AntdAvatar, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useCustomAvatar } from "./useCustomAvatar";

type Props = AvatarProps & {
  name?: string;
  last_name?: string;
};

const CustomAvatarComponent: FC<Props> = ({
  name,
  last_name,
  style,
  size = "small",
  ...rest
}) => {
  const { isLoading, initials, hasInitials, bgColor } = useCustomAvatar({
    name,
    last_name,
  });

  if (isLoading) {
    return (
      <Skeleton.Avatar
        active
        size={size === "large" ? "large" : size === "small" ? "small" : "default"}
        style={{
          display: "flex",
          alignItems: "center",
          border: "none",
          ...style,
        }}
      />
    );
  }

  return (
    <AntdAvatar
      alt={name}
      size={size}
      icon={!hasInitials ? <UserOutlined /> : undefined}
      style={{
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style,
      }}
      {...rest}
    >
      {hasInitials ? initials : null}
    </AntdAvatar>
  );
};

export const CustomAvatar = memo(
  CustomAvatarComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.name === nextProps.name &&
      prevProps.last_name === nextProps.last_name &&
      prevProps.src === nextProps.src
    );
  }
);
