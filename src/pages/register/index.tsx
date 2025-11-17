import { AuthPage } from "@refinedev/antd";

import { GoogleOutlined } from "@ant-design/icons";
import { AppTitle } from "../../components/layout/Title";

export const RegisterPage: React.FC = () => {
  return <AuthPage 
  type="register" 
  title={<AppTitle collapsed={false} />}
  providers={[
        {
          name: "google",
          label: "Sign in with Google",
          icon: (
            <GoogleOutlined
              style={{
                fontSize: 24,
                lineHeight: 0,
              }}
            />
          ),
        },        
      ]}  
  />;
};
