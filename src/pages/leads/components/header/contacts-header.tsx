import { Space, Tag, Typography } from 'antd';
import { Contact } from '../../../../interfaces/models/contact.interface';
import { CustomAvatar } from '../../../../components/header/CustomAvatar';

type Props = {
  contacts?: Contact[];
};

export const ContactssHeader = ({ contacts = [] }: Props) => {
  if (contacts.length > 0) {
    return (
      <Space size={[0, 8]} wrap>
        {contacts.map((contact) => (
           <Tag
            key={contact.id}
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
                name={contact.first_name + " " + contact.last_name}
                style={{ display: "inline-flex" }}
                />
                {contact.first_name + " " + contact.last_name}
            </Space>
            </Tag>
        ))}
      </Space>
    );
  }

  return <Typography.Link>Assign to users</Typography.Link>;
};
