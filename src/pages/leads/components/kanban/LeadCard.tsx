import { Card, Tag, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const LeadCard = ({ lead, onEdit, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: lead.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card
                size="small"
                style={{
                    marginBottom: 12,
                    borderRadius: 8,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
                title={lead.company_name}
                extra={
                    <>
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => onEdit(lead)}
                        />
                        <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => onDelete(lead.id)}
                        />
                    </>
                }
            >
                <p style={{ margin: 0, fontSize: 13, color: "#888" }}>
                    {lead.industry}
                </p>

                <div style={{ marginTop: 6 }}>
                    <Tag color={lead.category?.color}>{lead.category?.name}</Tag>
                    {lead.tags?.map(tag => (
                        <Tag key={tag.id} color={tag.color}>{tag.name}</Tag>
                    ))}
                </div>

                <div style={{ marginTop: 8, fontSize: 12 }}>
                    <b>Assigned:</b> {lead.assigned_to?.first_name} {lead.assigned_to?.last_name}
                </div>

                <div style={{ marginTop: 4, fontSize: 12 }}>
                    <b>Value:</b> ${lead.estimated_value}
                </div>
            </Card>
        </div>
    );
};