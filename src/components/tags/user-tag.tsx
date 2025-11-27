import { FC } from "react";

import { Space, Tag } from "antd";

// Pending review
interface User {
  id: number | string;
  name: string;
  avatarUrl: string;
}

import { CustomAvatar } from "../header/CustomAvatar";

type Props = { user: User };

export const UserTag: FC<Props> = ({ user }) => {
  return (
    <Tag
      key={user.id}
      style={{
        padding: 2,
        paddingRight: 8,
        borderRadius: 24,
        lineHeight: "unset",
        marginRight: "unset",
      }}
    >
      <Space size={4}>
        <CustomAvatar
          src={user.avatarUrl}
          name={user.name}
          style={{ display: "inline-flex" }}
        />
        {user.name}
      </Space>
    </Tag>
  );
};
