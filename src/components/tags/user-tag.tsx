import { FC } from "react";
import { Space, Tag } from "antd";
import { User } from "../../interfaces";
import { CustomAvatar } from "../header/CustomAvatar";



type Props = {
  user: User;
};

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
                  name={user?.first_name}
                  last_name={user?.last_name}
                  style={{ display: "inline-flex" }}
                  size="small"
                />        
        {`${user.first_name} ${user.last_name}`}
      </Space>
    </Tag>
  );
};
