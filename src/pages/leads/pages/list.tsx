import { FC, PropsWithChildren, useMemo } from "react";
import {
    useList,
    useUpdate,
    useUpdateMany,
    useDelete,
    useNavigation,
} from "@refinedev/core";

import { DragEndEvent } from "@dnd-kit/core";
import { MenuProps } from "antd";
import { KanbanBoard, KanbanBoardSkeleton } from "../components/board";
import { KanbanColumn, KanbanColumnSkeleton } from "../components/column";
import { KanbanItem } from "../components/item";// tu tarjeta real
import { KanbanAddCardButton } from "../components/KanbanAddCardButton";
import { KanbanAddStageButton } from "../components/KanbanAddStageButton";
import { LeadCardMemo, LeadCardSkeleton } from "../components/project-kanban-card";
import { Lead } from "../../../interfaces/models/lead.interface";
import { LeadStatus } from "../../../interfaces/models/lead-status.interfaces";

export const LeadListPage: FC<PropsWithChildren> = ({ children }) => {

    const { create, edit } = useNavigation();

    // 1️⃣ ESTADOS DE LEADS (columnas del kanban)
    const { result: statusData } = useList<LeadStatus>({
        resource: "lead-statuses",
        pagination: { mode: "off" },
    });

    // 2️⃣ LEADS (tarjetas dentro de columnas)
    const { result: leadsData } = useList<Lead>({
        resource: "leads",
        pagination: { mode: "off" },
    });

    const leads: Lead[] = useMemo(
        () => leadsData?.data ?? [],
        [leadsData?.data]
    );

    const statuses: LeadStatus[] = useMemo(
        () => statusData?.data ?? [],
        [statusData?.data]
    );

      // 3️⃣ AGRUPAR LEADS POR ESTADO
    const leadStages = useMemo(() => {
        if (!statuses || !leads)
        return {
            unassignedStage: [],
            stages: [],
        };

        const unassignedStage = leads.filter((l) => !l.status);

        const winLead = leads.filter((lead) => lead.status.name === "Ganado (Cliente)");

        const lostLead = leads.filter((lead) => lead.status.name === "Perdido");

        const filteredStages = leads.filter(
            (lead) =>
                lead.status.name !== "No asignado" &&
                lead.status.name !== "Ganado (Cliente)" &&
                lead.status.name !== "Perdido"
        );

        const filteredStatus = statuses.filter(
            (s) =>
                s.name !== "No asignado" &&
                s.name !== "Ganado (Cliente)" &&
                s.name !== "Perdido"
        );

        const stages = filteredStatus.map((status) => ({
            ...status,
            leads: filteredStages.filter((l) => l.status?.id === status.id),
        }));

        return {
            unassignedStage,
            winLead,
            lostLead,
            stages,
        };
    }, [leads, statuses]);

    // 4️⃣ MUTATIONS
    const { mutate: updateLead } = useUpdate();
    const { mutate: updateMany } = useUpdateMany();
    const { mutate: deleteStatus } = useDelete();

    // 5️⃣ Drag & Drop
    const handleOnDragEnd = (event: DragEndEvent) => {
        const leadId = Number(event.active.id);
        const newStatusId = event.over?.id ? Number(event.over.id) : null;
        const oldStatusId = event.active.data.current?.statusId ?? null;

        if (newStatusId === oldStatusId) return;

        updateLead({
            resource: "leads",
            id: leadId,
            values: {
                status: newStatusId === null ? null : { id: newStatusId },
            },
            mutationMode: "pessimistic",
        });
    };


    // 6️⃣ Add / Edit / Delete columnas
    const handleAddStage = () => create("lead-status");
    const handleEditStage = (id: number) => edit("lead-status", id);
    const handleDeleteStage = (id: number) =>
        deleteStatus({
            resource: "lead-status",
            id,
        });

    // 7️⃣ Context menu de cada columna
    const getContextMenuItems = (column: any): MenuProps["items"] => {
        const hasItems = column.leads.length > 0;

        return [
            {
                label: "Editar etapa",
                key: "1",
                onClick: () => handleEditStage(column.id),
            },
            {
                label: "Vaciar tarjetas",
                key: "2",
                disabled: !hasItems,
                onClick: () =>
                    updateMany({
                        resource: "leads",
                        ids: column.leads.map((l: any) => l.id),
                        values: { status: null },
                    }),
            },
            {
                label: "Eliminar etapa",
                danger: true,
                key: "3",
                disabled: hasItems,
                onClick: () => handleDeleteStage(column.id),
            },
        ];
    };

    const isLoading = false;

    if (isLoading) return <PageSkeleton />;

    return (
        <>
            <KanbanBoard onDragEnd={handleOnDragEnd}>
                {/* 8️⃣ Columna sin asignar */}
                <KanbanColumn
                    id="unassigned"
                    title="Sin estado"
                    count={leadStages.unassignedStage.length || 0}
                    onAddClick={() => create("leads")}
                >
                    {leadStages.unassignedStage.map((lead) => (
                        <KanbanItem
                            id={lead.id}
                            key={lead.id}
                            data={{ ... lead, statusId: "unassigned" }}
                        >
                            <LeadCardMemo {...lead} />
                        </KanbanItem>
                    ))}

                    {!leadStages.unassignedStage.length && (
                        <KanbanAddCardButton
                            onClick={() => create("leads")}
                        />                       
                    )}
                </KanbanColumn>
                    {leadStages.stages?.map((column) => {
                    const contextMenuItems = getContextMenuItems(column);

                    return (
                        <KanbanColumn
                        key={column.id}
                        id={column.id}
                        title={column.name}
                        count={column.leads.length}
                        contextMenuItems={contextMenuItems}
                         onAddClick={() =>
                            create("leads")
                        }
                        >
                        {isLoading && <LeadCardSkeleton />}
                        {!isLoading &&
                            column.leads.map((lead) => {
                            return (
                                <KanbanItem
                                key={lead.id}
                                id={lead.id}
                                data={{
                                    ...lead,
                                    stageId: column.id,
                                }}
                                >
                                <LeadCardMemo {...lead} />
                                </KanbanItem>
                            );
                            })}
                        {!column.leads.length && (
                            <KanbanAddCardButton
                            onClick={() =>
                                    create("leads")
                            }
                            />
                        )}
                        </KanbanColumn>
                    );
                    })}

                {/* 10️⃣ Botón agregar columna */}
                <KanbanAddStageButton onClick={handleAddStage} />
            </KanbanBoard>

            {children}
        </>
    );
};


export default  LeadListPage;


const PageSkeleton = () => {
  const columnCount = 6;
  const itemCount = 4;

  return (
    <KanbanBoardSkeleton>
      {Array.from({ length: columnCount }).map((_, index) => {
        return (
          <KanbanColumnSkeleton key={index} type="project">
            {Array.from({ length: itemCount }).map((_, index) => {
              return <LeadCardSkeleton key={index} />;
            })}
          </KanbanColumnSkeleton>
        );
      })}
    </KanbanBoardSkeleton>
  );
};

