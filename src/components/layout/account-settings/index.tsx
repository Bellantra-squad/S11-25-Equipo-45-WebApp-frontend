import {
  CloseOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Drawer,
  Space,  
} from "antd";

import styles from "./index.module.css";
import { Text } from "../../base/text";
import { CustomAvatar } from "../../header/Custom-avatar";

import { User } from "../../../interfaces/models/user.interface";

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  user: User;
};

export const AccountSettings = ({ opened, setOpened , user }: Props) => {
  const closeModal = () => {
    setOpened(false);
  };
  
  return (
    <Drawer
      onClose={closeModal}
      open={opened}
      width={756}
      styles={{
        body: { padding: 0 },
        header: { display: "none" },
      }}
    >
      <div className={styles.header}>
        <Text strong>Account Settings</Text>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => closeModal()}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.name}>
          <CustomAvatar
            style={{
              marginRight: "1rem",
              flexShrink: 0,
              fontSize: "40px",
            }}
            size={96}
            src={user.avatar}
            name={user.name}
          />          
            {user.name}
        </div>
        <Card
          title={
            <Space size={15}>
              <UserOutlined />
              <Text size="sm">User profile</Text>
            </Space>
          }
          headStyle={{ padding: "0 12px" }}
          bodyStyle={{ padding: "0" }}
        >          
        </Card>
        <Card
          title={
            <Space size={15}>
              <SafetyCertificateOutlined />
              <Text size="sm">Security</Text>
            </Space>
          }
          headStyle={{ padding: "0 12px" }}
          bodyStyle={{ padding: "0" }}
        >          
        </Card>
      </div>
    </Drawer>
  );
};
