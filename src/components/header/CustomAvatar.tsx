import { FC, memo } from "react";
import type { AvatarProps } from "antd";
import { Avatar as AntdAvatar } from "antd";

type Props = AvatarProps & {
  name?: string;
};

const getNameInitials = (name: string): string => {
  if (!name) return "?";

  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const getRandomColorFromString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Genera un color pastel
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 80%)`;
};

const CustomAvatarComponent: FC<Props> = ({ name = "", src, style, ...rest }) => {
  const initials = getNameInitials(name);
  const bgColor = getRandomColorFromString(name);

  return (
    <AntdAvatar
      alt={name}
      src={src}
      style={{
        backgroundColor: src ? "transparent" : bgColor,
        color: "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        border: "none",
        ...style,
      }}
      {...rest}
    >
      {!src && initials}
    </AntdAvatar>
  );
};

export const CustomAvatar = memo(
  CustomAvatarComponent,
  (prev, next) => prev.name === next.name && prev.src === next.src
);
