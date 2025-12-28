import { useState } from "react";

import { useModal } from "@refinedev/antd";
import { HttpError, useNavigation, useShow, useUpdate } from "@refinedev/core";

import { Modal, Skeleton, Typography } from "antd";
import { Lead, LeadUpdate } from "../../../interfaces/models/lead.interface";
import { ModalFooter } from "../components/modal-footer";
import { AlignLeftOutlined, EditOutlined, MenuUnfoldOutlined, TagsOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { StageForm } from "../components/form/stage-form";
import { Accordion } from "../components/accordion";
import { DescriptionHeader } from "../components/header/description-header";
import { DescriptionForm } from "../components/form/description-form";
import { ContactssHeader } from "../components/header/contacts-header";
import { ContactsForm } from "../components/form/contact-form";
import { TagsHeader } from "../components/header/tags-header";
import { TagsForm } from "../components/form/tags-form";
import { MessageList } from "../components/messages-list";
import { DetailsForm } from "../components/form/details-form";
import { DetailsHeader } from "../components/header/details-header";
import { UserHeader } from "../components/header/user-header";
import { UserLeadForm } from "../components/form/user-form";

const LeadEditModal = () => {
  const [activeKey, setActiveKey] = useState<string | undefined>();

  const { list } = useNavigation();
  const { modalProps, close } = useModal({
    modalProps: { open: true },
  });

const { mutate: updateMutation } = useUpdate<Lead, HttpError,LeadUpdate>();

  const {
    result: lead,
    query
  } = useShow<Lead>({
    resource: "leads",
  });
 
  return (
    <Modal
      {...modalProps}
      title={
        <Typography.Title
            level={3}
            style={{ padding: 0, margin: 0, width: "100%" }}            
            editable={{
              onChange(value) {
                updateMutation({
                  resource: "leads",
                  id: lead!.id ,
                  values: { company_name: value },
                  mutationMode: "optimistic",
                  successNotification: false,                  
                });
              },
              triggerType: ["text", "icon"],
              icon: <EditOutlined  />,
            }}
          >
            {lead?.company_name}
          </Typography.Title>
      }
      onCancel={() => {
        close();
        list("leads", "replace");
      }}
      width={700}
      footer={<ModalFooter />}
    >
      {query.isLoading ? (
         <Skeleton active />
      ) : (
        <>
            <StageForm initialValues={{ is_client:lead!.is_client, status: lead!.status }} isLoading={query.isLoading}/>

            <Accordion
                accordionKey="description"
                activeKey={activeKey}
                setActive={setActiveKey}
                fallback={<DescriptionHeader description={lead?.notes} />}
                isLoading={query.isLoading}
                icon={<AlignLeftOutlined />}
                label="Descripción"
            >
                 <DescriptionForm
                    initialValues={{notes: lead!.notes }}
                    cancelForm={() => setActiveKey(undefined)}
                />
            </Accordion>
            <Accordion
                accordionKey="user"
                activeKey={activeKey}
                setActive={setActiveKey}
                fallback={<UserHeader user={lead?.assigned_to} />}
                isLoading={query.isLoading}
                icon={<UserOutlined />}
                label="Asignar Usuario"
            >
                <UserLeadForm
                initialValues={{
                    userId: lead?.assigned_to
                    ? {
                        label: `${lead.assigned_to.first_name} ${lead.assigned_to.last_name}`,
                        value: lead.assigned_to.id,
                      }
                    : undefined,                            
                }}
                cancelForm={() => setActiveKey(undefined)}
                />
            </Accordion>

            <Accordion
            accordionKey="details"
            activeKey={activeKey}
            setActive={setActiveKey}
            fallback={
                <DetailsHeader {...lead}  />
            }
            isLoading={query.isLoading}
            icon={<MenuUnfoldOutlined />}
            label="Detalles del Lead"
        >
            <DetailsForm
                initialValues={{
                    industry: lead?.industry,
                    website: lead?.website,
                    category_id: lead?.category?.id,
                    assigned_to_id: lead?.assigned_to?.id,
                    lead_source: lead?.lead_source,
                    lead_score: lead?.lead_score,
                    estimated_value: lead?.estimated_value
                }}
                cancelForm={() => setActiveKey(undefined)}
            />
        </Accordion>

            <Accordion
                accordionKey="contact"
                activeKey={activeKey}
                setActive={setActiveKey}
                fallback={<ContactssHeader contacts={lead?.contacts} />}
                isLoading={query.isLoading}
                icon={<UsergroupAddOutlined />}
                label="Contactos"
            >
                <ContactsForm
                initialValues={{
                    contactIds: lead?.contacts?.map((contact) => ({
                    label: contact.first_name + " " + contact.last_name,
                    value: contact.id,
                    })),
                }}
                leadId={lead!.id}
                cancelForm={() => setActiveKey(undefined)}
                />
            </Accordion>

            <Accordion
            accordionKey="tasg"
            activeKey={activeKey}
            setActive={setActiveKey}
            fallback={<TagsHeader tags={lead?.tags} />}
            isLoading={query.isLoading}
            icon={<TagsOutlined />}
            label="Etiquetas"
            >
            <TagsForm
                initialValues={{               
                tag_ids: lead?.tags.map(t => ({
                    label: t.name,
                    value: t.id,
                })),
                }}
                cancelForm={() => setActiveKey(undefined)}
            />
            </Accordion>

           <div
            style={{                
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "48px",
                borderBottom: "1px solid #d9d9d9",
            }}
            >
            <MessageList />
            </div>
        </>
        
      )}
    </Modal>
  );
};


export default LeadEditModal;