import { Space, Tag, Typography } from 'antd';
import { CustomAvatar } from '../../../../components/header/CustomAvatar';
import { User } from '../../../../interfaces';

type Props = {
  user?: User;
};

export const UserHeader = ({ user}: Props) => {
   if(user?.id) {
     return (
      <Space size={[0, 8]} wrap>
       
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
                  style={{
                    display: "inline-flex",
                    fontSize: "14px",
                  }}
                  size={30}
                  name={user?.first_name}
                  last_name={user?.last_name}
                />               
                {user.first_name + " " + user.last_name}
            </Space>
            </Tag>              
      </Space>
    );
}

  return <Typography.Link>Asignar Usuario</Typography.Link>;
};
