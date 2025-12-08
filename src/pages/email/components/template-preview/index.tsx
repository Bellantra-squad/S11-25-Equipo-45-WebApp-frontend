import { Card, Spin } from "antd";

interface TemplatePreviewProps {
  isLoading: boolean;
  templateData?: {
    name: string;
    subject: string;
    body: string;
  };
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ isLoading, templateData }) => {
  return (
    <Card title="Vista previa de la plantilla" variant="outlined">
      {isLoading ? (
        <Spin />
      ) : templateData ? (
        <div>
          <h3>{templateData.name}</h3>
          <p>
            <strong>Asunto:</strong> {templateData.subject}
          </p>
          <div
            style={{
              border: "1px solid #eee",
              padding: "12px",
              marginTop: "12px",
              background: "#fafafa",
            }}
            dangerouslySetInnerHTML={{ __html: templateData.body }}
          />
        </div>
      ) : (
        <p>Selecciona una plantilla para ver la vista previa</p>
      )}
    </Card>
  );
};
