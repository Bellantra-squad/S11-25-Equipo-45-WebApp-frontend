// import { KanbanBoard } from "../components/kanban/KanbanBoard";

// export default function LeadListPage() {
//     return(
//         <KanbanBoard />
//     );
// }


// import { FC, PropsWithChildren, useMemo } from "react";
// import {
//   useList,
//   useUpdate,
//   useUpdateMany,
//   useDelete,
//   useNavigation,
// } from "@refinedev/core";

// import { ClearOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { DragEndEvent } from "@dnd-kit/core";
// import { MenuProps } from "antd";

// import { KanbanBoard, KanbanBoardSkeleton } from "../components/board";
// import { KanbanColumn, KanbanColumnSkeleton } from "../components/column";
// import { KanbanItem } from "../components/item";
// import { LeadCardMemo, ProjectCardSkeleton } from "../components/project-kanban-card";
// import { KanbanAddCardButton } from "../components/KanbanAddCardButton";
// import { KanbanAddStageButton } from "../components/KanbanAddStageButton";
// import { replace } from "react-router";



// // type Task = GetFieldsFromList<KanbanTasksQuery>;

// // type TaskStage = GetFieldsFromList<KanbanTaskStagesQuery>;

// // type TaskStageColumn = TaskStage & {
// //   tasks: Task[];
// // };

//  const LeadListPage: FC<PropsWithChildren> = ({ children }) => {
 
// const { create, edit } = useNavigation();

//   // 1️⃣ STATUS (Tus columnas del kanban)
//   const { result: statusData } = useList({
//     resource: "leads",
//     pagination: { mode: "off" },
//   });

//   // 2️⃣ LEADS (las tarjetas dentro de columnas)
//   const { result: leadsData, } = useList({
//     resource: "leads",
//     pagination: { mode: "off" },
//   });

//   const leads = leadsData?.data ?? [];
//   const statuses = statusData?.data ?? [];

//   // 3️⃣ AGRUPAR LEADS POR STATUS
//   const grouped = useMemo(() => {
//     if (!leads.length || !statuses.length)
//       return {
//         unassigned: [],
//         stages: [],
//       };

//     const unassigned = leads.filter((l) => !l.status);

//     const stageColumns = statuses.map((status) => ({
//       ...status,
//       leads: leads.filter((l) => l.status?.id === status.id),
//     }));

//     return {
//       unassigned,
//       stages: stageColumns,
//     };
//   }, [leads, statuses]);

//   // 4️⃣ MUTATIONS
//   const { mutate: updateLead } = useUpdate();
//   const { mutate: updateMany } = useUpdateMany();
//   const { mutate: deleteStatus } = useDelete();

//   // 5️⃣ DRAG & DROP: Cambiar el lead de columna
//   const handleOnDragEnd = (event: DragEndEvent) => {
//     const newStatusId = event.over?.id as string | null;
//     const leadId = event.active.id as string;
//     const oldStatusId = event.active.data.current?.statusId;

//     if (newStatusId === oldStatusId) return;

//     updateLead({
//       resource: "leads",
//       id: leadId,
//       values: {
//         status: newStatusId === "unassigned" ? null : newStatusId,
//       },
//       mutationMode: "optimistic",
//       successNotification: false,
//     });
//   };

//   // 6️⃣ Eventos: Add / Edit / Delete columnas
//   const handleAddStage = () => create("lead-status", "replace");
//   const handleEditStage = (id: string) => edit("lead-status", id);
//   const handleDeleteStage = (id: string) =>
//     deleteStatus({
//       resource: "lead-status",
//       id,
//     });

//   // 7️⃣ Buttons dentro de cada columna
//   const getContextMenuItems = (column: any): MenuProps["items"] => {
//     const hasItems = column.leads.length > 0;

//     return [
//       {
//         label: "Edit Status",
//         key: "1",
//         onClick: () => handleEditStage(column.id),
//       },
//       {
//         label: "Clear cards",
//         key: "2",
//         disabled: !hasItems,
//         onClick: () =>
//           updateMany({
//             resource: "leads",
//             ids: column.leads.map((l: any) => l.id),
//             values: { status: null },
//           }),
//       },
//       {
//         label: "Delete",
//         danger: true,
//         key: "3",
//         disabled: hasItems,
//         onClick: () => handleDeleteStage(column.id),
//       },
//     ];
//   };

//   const isLoading = false;

//   if (isLoading) return <div>Loading kanban...</div>;


//   return (
//     <>
//       <KanbanBoard onDragEnd={handleOnDragEnd}>
//         {/* 8️⃣ Columna "Sin asignar" */}
//         <KanbanColumn
//           id="unassigned"
//           title="Sin estado"
//           count={grouped.unassigned.length}
//           onAddClick={() => replace("create")}
//         >
//           {grouped.unassigned.map((lead) => (
//             <KanbanItem
//               id={lead.id}
//               key={lead.id}
//               data={{ ...lead, statusId: null }}
//             >
//               <LeadCardMemo {...lead} />
//             </KanbanItem>
//           ))}

//           {!grouped.unassigned.length && (
//             <KanbanAddCardButton onClick={() => replace("create")} />
//           )}
//         </KanbanColumn>

//         {/* 9️⃣ Columnas con estados */}
//         {grouped.stages.map((status) => (
//           <KanbanColumn
//             key={status.id}
//             id={status.id}
//             title={status.name}
//             count={status.leads.length}
//             contextMenuItems={getContextMenuItems(status)}
//             onAddClick={() => replace(`create?statusId=${status.id}`)}
//           >
//             {status.leads.map((lead: any) => (
//               <KanbanItem
//                 key={lead.id}
//                 id={lead.id}
//                 data={{
//                   ...lead,
//                   statusId: status.id,
//                 }}
//               >
//                 <ProjectCardMemo {...lead} />
//               </KanbanItem>
//             ))}

//             {!status.leads.length && (
//               <KanbanAddCardButton
//                 onClick={() => replace(`create?statusId=${status.id}`)}
//               />
//             )}
//           </KanbanColumn>
//         ))}

//         {/* 10️⃣ Botón agregar columna */}
//         <KanbanAddStageButton onClick={handleAddStage} />
//       </KanbanBoard>

//       {children}
//     </>
//   );
// };


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

