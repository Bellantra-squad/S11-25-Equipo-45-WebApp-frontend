import React from "react";

import { useCreateMany, useDelete, useList } from "@refinedev/core";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, ModalProps, Popconfirm } from "antd";
import { Text } from "../../../../../components/base/text";

import styles from "./index.module.css";
import { ICategory } from "../../../../../interfaces/calendar/calendar";

type CalendarManageCategoriesProps = {
  saveSuccess?: () => void;
} & ModalProps;

export const CalendarManageCategories: React.FC<
  CalendarManageCategoriesProps
> = ({ saveSuccess, ...rest }) => {
  const [form] = Form.useForm();
  const { mutate: createManyMutation } = useCreateMany();
  const { mutate: deleteMutation } = useDelete();
  const { result: data } = useList<ICategory>({
    resource: "eventCategories",
  });

  return (
    <Modal
      {...rest}
      title="Manage Categories"
      okText="Save"
      destroyOnHidden
      style={{ paddingTop: "1rem" }}
      okButtonProps={{
        onClick: () => {
          form.submit();
        },
      }}
    >
      <div className={styles.container}>
        {data?.data.map((category) => (
          <div key={category.id} className={styles.category}>
            <Text className={styles.title}>{category.title}</Text>
            <Popconfirm
              title="Delete the category"
              description="Are you sure to delete this category?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                deleteMutation({
                  resource: "eventCategories",
                  id: category.id,
                  successNotification: () => ({
                    key: "event-category-delete",
                    message: "Successfully deleted category",
                    description: "Successful",
                    type: "success",
                  }),
                });
              }}
            >
              <Button
                type="text"
                icon={<DeleteOutlined className="tertiary" />}
              />
            </Popconfirm>
          </div>
        ))}

        <Form
          form={form}
          onFinish={(formValues: { title: string[] }) => {
            if (!formValues?.title || formValues.title.length === 0) {
              return saveSuccess?.();
            }

            // remove undefined values
            formValues.title = formValues.title.filter(
              (title) => title !== undefined
            );

            const values = formValues.title.map((title) => ({
              title,
            }));

            createManyMutation(
              {
                resource: "eventCategories",
                values,
                successNotification: () => ({
                  key: "event-category-create",
                  message: "Successfully created categories",
                  description: "Successful",
                  type: "success",
                }),
              },
              {
                onSuccess: () => {
                  saveSuccess?.();
                  form.resetFields();
                },
              }
            );
          }}
        >
          <Form.List name="title">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <div key={field.key} className={styles.category}>
                    <Form.Item required={false} noStyle>
                      <Form.Item {...field} noStyle>
                        <Input
                          className={styles["new-category-input"]}
                          placeholder="Please enter category title"
                          bordered={false}
                        />
                      </Form.Item>
                    </Form.Item>
                    <Button
                      type="text"
                      onClick={() => {
                        remove(field.name);
                      }}
                      icon={<DeleteOutlined className="tertiary" />}
                    />
                  </div>
                ))}

                <div className={styles.category}>
                  <Button
                    type="link"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      add();
                    }}
                    className={styles["new-category-button"]}
                  >
                    Add category
                  </Button>
                </div>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    </Modal>
  );
};
