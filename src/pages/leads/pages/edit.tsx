import { useState } from "react";

import { useModal } from "@refinedev/antd";
import { HttpError, useNavigation, useShow, useUpdate } from "@refinedev/core";

import { Modal, Skeleton, Typography } from "antd";
import { Lead, LeadUpdate } from "../../../interfaces/models/lead.interface";
import { ModalFooter } from "../components/modal-footer";
import { AlignLeftOutlined, EditOutlined, TagsOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
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
                label="Description"
            >
                 <DescriptionForm
                    initialValues={{notes: lead!.notes }}
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
            icon={<UserOutlined />}
            label="Lead Details"
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
                accordionKey="Contactos"
                activeKey={activeKey}
                setActive={setActiveKey}
                fallback={<ContactssHeader contacts={lead?.contacts} />}
                isLoading={query.isLoading}
                icon={<UsergroupAddOutlined />}
                label="Users"
            >
                <ContactsForm
                initialValues={{
                    contactIds: lead?.contacts?.map((contact) => ({
                    label: contact.first_name + " " + contact.last_name,
                    value: contact.id,
                    })),
                }}
                cancelForm={() => setActiveKey(undefined)}
                />
            </Accordion>

            <Accordion
            accordionKey="categories"
            activeKey={activeKey}
            setActive={setActiveKey}
            fallback={<TagsHeader tags={lead?.tags} />}
            isLoading={query.isLoading}
            icon={<TagsOutlined />}
            label="Tags & Categories"
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
                backgroundColor: "#fcfbfb",
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