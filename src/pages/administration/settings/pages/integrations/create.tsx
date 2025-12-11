import { Create, useForm } from "@refinedev/antd";
import { Form } from "antd";
import { IntegrationAPI } from "../../../../../interfaces/models/integration-api.interfaces";
import { IntegrationFormFields } from "../../components/integrations/integration-form-fields";

export default function IntegrationCreatePage() { 
  const { formProps, saveButtonProps } = useForm<IntegrationAPI>();

  return (
    <Create title="Crear Integración API"    
        saveButtonProps={{
        ...saveButtonProps,
        children: "Guardar"}} >
      <Form {...formProps} layout="vertical">
        <IntegrationFormFields />
      </Form>
    </Create>
  );
}