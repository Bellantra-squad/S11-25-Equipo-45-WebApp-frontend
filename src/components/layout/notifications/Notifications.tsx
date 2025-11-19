import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Popover } from "antd";


export const Notifications: React.FC = () => {
  return (
    <Popover
      placement="bottomRight"     
      trigger="click"
    >
      <Badge dot>
        <Button shape="circle" size="large" icon={<BellOutlined />} />
      </Badge>
    </Popover>
  );
};