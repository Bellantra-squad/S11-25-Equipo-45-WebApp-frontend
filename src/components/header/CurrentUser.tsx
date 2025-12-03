import { useGetIdentity, useLogout } from "@refinedev/core";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { Text } from "../base/text";
import { CustomAvatar } from "./CustomAvatar";
import { User } from "../../interfaces/models/user.interface";
import { useState } from "react";
import { AccountSettings } from "../layout/account-settings";

export const CurrentUser: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const { mutate: logout } = useLogout();
  const { data: user } = useGetIdentity<User>();

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text
        strong
        style={{
          padding: "12px 20px",
        }}
      >
        {user?.first_name} {user?.last_name}
      </Text>
      <div
        style={{
          borderTop: "1px solid #d9d9d9",
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Button
          style={{ textAlign: "left" }}
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setOpened(true)}
        >
          Account settings
        </Button>
        <Button
          style={{ textAlign: "left" }}
          icon={<LogoutOutlined />}
          type="primary"
          variant="text"
          block
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        content={content}
        trigger="click"
        styles={{
          body: { padding: 0 },
          root: { zIndex: 999 },
        }}
      >
        <CustomAvatar
          name={user?.first_name}
          last_name={user?.last_name}
          style={{ cursor: "pointer" }}
          size="large"
        />
      </Popover>
      {user && (
        <AccountSettings opened={opened} setOpened={setOpened} user={user} />
      )}
    </>
  );
};
