import { useState } from "react";

import { KanbanColumn } from "./KanbanColumn";

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
} from "@dnd-kit/sortable";

import { Button } from "antd";
import { leads } from "../../../../mocks/leads";
import { statuses } from "../../../../mocks/statuses";

export const KanbanBoard = () => {
    const [allLeads, setAllLeads] = useState(leads);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDelete = (id) => {
        setAllLeads(prev => prev.filter(l => l.id !== id));
    };

    const handleEdit = (lead) => {
        console.log("Abrir modal de edición", lead);
    };

    const handleCreate = () => {
        console.log("Abrir modal de creación");
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;

        const activeLead = allLeads.find(l => l.id === activeId);
        const overLead = allLeads.find(l => l.id === overId);

        // Cambiar columna si es necesario
        if (activeLead.status.id !== overLead.status.id) {
            setAllLeads(prev =>
                prev.map(l =>
                    l.id === activeId
                        ? { ...l, status: { id: overLead.status.id } }
                        : l
                )
            );
            return;
        }

        // Reordenar dentro de la columna
        const leadsInColumn = allLeads.filter(
            l => l.status.id === activeLead.status.id
        );
        const oldIndex = leadsInColumn.findIndex(l => l.id === activeId);
        const newIndex = leadsInColumn.findIndex(l => l.id === overId);

        const moved = arrayMove(leadsInColumn, oldIndex, newIndex);

        // reconstruir la lista global
        const updated = allLeads.map(l =>
            l.status.id === activeLead.status.id
                ? moved.find(m => m.id === l.id)
                : l
        );

        setAllLeads(updated);
    };

    const sortedStatuses = [...statuses].sort(
        (a, b) => a.order_position - b.order_position
    );

    return (
        <div style={{ padding: 20 }}>
            <Button
                type="primary"
                style={{ marginBottom: 20 }}
                onClick={handleCreate}
            >
                + Create Lead
            </Button>

            <div style={{ display: "flex", overflowX: "auto" }}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    {sortedStatuses.map((status) => {
                        const leadsByStatus = allLeads.filter(
                            (lead) => lead.status.id === status.id
                        );

                        return (
                            <KanbanColumn
                                key={status.id}
                                status={status}
                                leads={leadsByStatus}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        );
                    })}
                </DndContext>
            </div>
        </div>
    );
};