import { FC, PropsWithChildren, useMemo } from "react";
import {
    useList,
    useUpdate,
    useUpdateMany,
    useDelete,
    useNavigation,
    HttpError,
} from "@refinedev/core";

import { DragEndEvent } from "@dnd-kit/core";
import { MenuProps } from "antd";
import { KanbanBoard, KanbanBoardSkeleton } from "../components/board";
import { KanbanColumn, KanbanColumnSkeleton } from "../components/column";
import { KanbanItem } from "../components/item";// tu tarjeta real
import { KanbanAddCardButton } from "../components/KanbanAddCardButton";
import { KanbanAddStageButton } from "../components/KanbanAddStageButton";
import { LeadCardMemo, LeadCardSkeleton } from "../components/project-kanban-card";
import { Lead, LeadResponse, LeadUpdate } from "../../../interfaces/models/lead.interface";
import { LeadStatus } from "../../../interfaces/models/lead-status.interfaces";
import { ClearOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";


type LeadStageColumn = LeadStatus & {
    leads: LeadResponse[];
};


export const LeadListPage: FC<PropsWithChildren> = ({ children }) => {

    const { create, edit } = useNavigation();

    // const go = useGo();

    // 1️⃣ ESTADOS DE LEADS (columnas del kanban)
    const { result: statusData, query: qstatus } = useList<LeadStatus>({
        resource: "lead-statuses",
        pagination: { mode: "off" },
    });

    // 2️⃣ LEADS (tarjetas dentro de columnas)
    const { result: leadsData , query: qlead} = useList<LeadResponse>({
        resource: "leads",
        pagination: { pageSize:50},
    });

    const leads: LeadResponse[] = useMemo(
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

        // const winLead = leads.filter((lead) => lead.status.name === "Ganado (Cliente)");

        // const lostLead = leads.filter((lead) => lead.status.name === "Perdido");

        const filteredStages = leads.filter(
            (lead) =>
                lead.status.name !== "No asignado" 
                // lead.status.name !== "Ganado (Cliente)" &&
                // lead.status.name !== "Perdido"
        );

        const filteredStatus = statuses.filter(
            (s) =>
                s.name !== "No asignado" 
                // s.name !== "Ganado (Cliente)" &&
                // s.name !== "Perdido"
        );

        const stages = filteredStatus.map((status) => ({
            ...status,
            leads: filteredStages.filter((l) => l.status?.id === status.id),
        }));

        return {
            unassignedStage,
            // winLead,
            // lostLead,
            stages,
        };
    }, [leads, statuses]);

    // 4️⃣ MUTATIONS
    const { mutate: updateLead } = useUpdate<Lead, HttpError, LeadUpdate>();
    const { mutate: updateManyLead } = useUpdateMany();
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
                status_id: newStatusId === null ? 1 :  newStatusId ,
            },
            mutationMode: "pessimistic",
        });
    };
    
    const handleAddStage = () => {       
        create("lead-statuses", "replace");
    };  
   
    const handleEditStage = (id: number) => edit("lead-statuses", id,  "replace");   

   
    const handleDeleteStage = (id: number) =>
        deleteStatus({
            resource: "lead-statuses",
            id,
        });

    const handleClearCards = (args: { leads: number[] }) => {
        updateManyLead({
        resource: "leads",
        ids: args.leads,
        values: {
            status_id: 1,
        },
        successNotification: false,
        });
    };

    // 7️⃣ Context menu de cada columna
    const getContextMenuItems = (column: LeadStageColumn): MenuProps["items"] => {
        const hasItems = column.leads.length > 0;

        return [
            {
                label: "Editar Estado",
                key: "1",
                icon: <EditOutlined />,
                onClick: () => handleEditStage( column.id ),
            },
            {
                label: "Reiniciar Ciclo",
                key: "2",
                icon: <ClearOutlined />,
                disabled: !hasItems,
                onClick: () =>
                handleClearCards({
                    leads: column.leads.map((task) => task.id),
                }),
            },
            {
                label: "Eliminar Estado",
                danger: true,
                key: "3",
                icon: <DeleteOutlined />,
                disabled: hasItems,
                onClick: () => handleDeleteStage(column.id),
            },
        ];
    };

    const isLoading = qlead.isLoading || qstatus.isLoading;

    if (isLoading) return <PageSkeleton />;

    return (
        <>
            <KanbanBoard onDragEnd={handleOnDragEnd}>            
                {leadStages.stages?.map((column) => {
                    const contextMenuItems = getContextMenuItems({...column});

                    return (
                        <KanbanColumn
                        key={column.id}
                        id={column.id}
                        title={column.name}
                        color={column.color}
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
                                    id: column.id,
                                }}
                                >
                                <LeadCardMemo {...lead} />
                                </KanbanItem>
                            );
                            })}
                        {!column.leads.length && (
                            <KanbanAddCardButton
                                onClick={() => create("leads")}
                            />
                        )}
                        </KanbanColumn>
                    );
                    })}           
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

