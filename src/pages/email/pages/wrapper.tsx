import React, { useState } from "react";

import { Button, Dropdown, Flex, Space, Splitter } from "antd";
import { Layout } from "antd";
import { CreateButton } from "@refinedev/antd";

import "./email.css";
import { SidebarFolders } from "../components/sidebar-folders";
import { EmailList } from "../components/email-list";
import { EmailPreview } from "../components/email-preview";
import { emailsByFolder } from "../../../mocks/mockData";
import { EmailMessage } from "../../../interfaces/internal/email.interface";
import { AppstoreOutlined, FileSearchOutlined, MoreOutlined } from "@ant-design/icons";
import { useNavigation } from "@refinedev/core";
const { Header, Footer, Sider, Content } = Layout;


const contentStyle: React.CSSProperties = {
   minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#FFF',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#FFF',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#fafafa',
};



  export default function EmailPageWrapper() {

     const { list } = useNavigation();
  
  const [folder, setFolder] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null);

  const emails = emailsByFolder[folder] || [];


    const menuItems = [
    {
      key: "1",
      label: "Configurar",
    },
    {
      key: "2",
      label: "Historial",
    },
    {
      key: "3",
      label: "Ayuda",
    },
  ];

    return (
    <Flex style={{width: "100%"}}>

      <Layout className="email-container">
      <Header className="headerStyle" style={{padding:"0px 10px"}}>
          <Flex  style={{ justifyContent:"space-between", width: "100%", display:"flex", }} align="center">
            <Space>
              <Button
                type="text"
                icon={<FileSearchOutlined />}
                style={{ fontWeight: 500 }}
                 onClick={() => list("email-templates")}
              >
                Ver Plantillas
              </Button>

              <Button
                type="text"
                icon={<AppstoreOutlined />}
                style={{ fontWeight: 500 }}
              >
                Plantillas
              </Button>

              <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                <Button type="text" icon={<MoreOutlined />} />
              </Dropdown>
            </Space>
            <Space>
              <CreateButton size="large" style={{ marginBottom: "1rem" }}>
                Enviar Email con plantillas
              </CreateButton>
            </Space>
          </Flex>
        </Header>
      <Layout>
        <Sider width="25%" style={siderStyle} className="email-sider">         
           <SidebarFolders
            selectedFolder={folder}
            onSelectFolder={(key) => {
              setFolder(key);
              setSelectedEmail(null);
            }}
        />        
        </Sider>
        <Content style={contentStyle}>
           <Splitter >
            <Splitter.Panel className="email-list">
               <EmailList
                emails={emails}
                selectedEmailId={selectedEmail?.id ?? null}
                onSelectEmail={(email) => setSelectedEmail(email)}
              />
            </Splitter.Panel>
            <Splitter.Panel style={{ padding: "24px"}} className="email-view">
               <EmailPreview email={selectedEmail} />
            </Splitter.Panel>
          </Splitter>
        </Content>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  </Flex>
  );
};

