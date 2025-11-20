import { AuthPage } from "@refinedev/antd";
import { AppTitle } from "../../components/layout/Title";
import { GoogleOutlined } from "@ant-design/icons";

const LoginPage = () => {
  return (
    <AuthPage
      type="login"
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
      formProps={{
        initialValues: { email: "demo@refine.dev", password: "demodemo" },
      }}
    />
  );
};


export default LoginPage;