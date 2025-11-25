import { LeadCard } from "./LeadCard";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export const KanbanColumn = ({ status, leads, onEdit, onDelete }) => {
    return (
        <div style={{ width: 300, marginRight: 20 }}>
            <div
                style={{
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 10,
                    fontWeight: 600,
                    backgroundColor: status.color,
                    color: "white",
                }}
            >
                {status.name} ({leads.length})
            </div>

            <SortableContext
                items={leads.map(l => l.id)}
                strategy={verticalListSortingStrategy}
            >
                {leads.map(lead => (
                    <LeadCard
                        key={lead.id}
                        lead={lead}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </SortableContext>
        </div>
    );
};