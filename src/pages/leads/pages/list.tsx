import { FC, PropsWithChildren, useMemo, useState } from "react";
import {
    useList,
    useUpdate,
    useUpdateMany,
    useDelete,
    useNavigation,
    HttpError,
} from "@refinedev/core";

import { DragEndEvent } from "@dnd-kit/core";
import { Form, MenuProps } from "antd";
import { KanbanBoard, KanbanBoardSkeleton } from "../components/board";
import { KanbanColumn, KanbanColumnSkeleton } from "../components/column";
import { KanbanItem } from "../components/item";// tu tarjeta real
import { KanbanAddCardButton } from "../components/KanbanAddCardButton";
import { KanbanAddStageButton } from "../components/KanbanAddStageButton";
import { LeadCardMemo, LeadCardSkeleton } from "../components/project-kanban-card";
import { Lead, LeadResponse, LeadUpdate } from "../../../interfaces/models/lead.interface";
import { LeadStatus } from "../../../interfaces/models/lead-status.interfaces";
import { ClearOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useExportFile } from "../../../hooks/useExport";
import { LeadHeader } from "../components/header/lead-header";
import { PaginationControls } from "../../../interfaces/internal/pagination.interface";


type LeadStageColumn = LeadStatus & {
    leads: LeadResponse[];
};

export interface IFilter {
  assigned_to?: number,
  category?: number,
  lead_source?: string,
}

export const LeadListPage: FC<PropsWithChildren> = ({ children }) => {

    const { create, edit } = useNavigation();
    const { exportCsv, exportPdf } = useExportFile();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(20);
    const [filters, setFilters] = useState<IFilter>({});

    
    // ESTADOS DE LEADS (columnas del kanban)
    const { result: statusData, query: qstatus } = useList<LeadStatus>({
        resource: "lead-statuses",
        pagination: { pageSize:20 },       
    });

    // LEADS (tarjetas dentro de columnas)
    const { result: leadsData , query: qlead, } = useList<LeadResponse>({
        resource: "leads",
        pagination: {
            currentPage,
            pageSize,
        },
        filters: [
            {
                field: "assigned_to",
                operator: "eq",
                value: filters.assigned_to,
            },
            {
                field: "category",
                operator: "eq",
                value: filters.category,
            },
            {
                field: "lead_source",
                operator: "contains",
                value: filters.lead_source,
            },
            
        ]
    });

    const [form] = Form.useForm<IFilter>()    

    const total = leadsData?.total ?? 0;
    const maxPage = Math.ceil(total / pageSize);
    const pagination: PaginationControls = {
        currentPage,
        maxPage,
        setCurrentPage,
        pageSize,
        setPageSize,
    };

    const leads: LeadResponse[] = useMemo(
        () => leadsData?.data ?? [],
        [leadsData?.data]
    );

    const statuses: LeadStatus[] = useMemo(
        () => statusData?.data ?? [],
        [statusData?.data]
    );

      // AGRUPAR LEADS POR ESTADO
    const leadStages = useMemo(() => {
        if (!statuses || !leads)
        return {
            unassignedStage: [],
            stages: [],
        };

        const unassignedStage = leads.filter((l) => !l.status);      
        const filteredStages = leads.filter(
            (lead) =>
                lead.status.name !== "No asignado"                
        );

        const filteredStatus = statuses.filter(
            (s) =>
                s.name !== "No asignado"                 
        );

        const stages = filteredStatus.map((status) => ({
            ...status,
            leads: filteredStages.filter((l) => l.status?.id === status.id),
        }));

        return {
            unassignedStage,
            stages,
        };
    }, [leads, statuses]);

    // MUTATIONS
    const { mutate: updateLead } = useUpdate<Lead, HttpError, LeadUpdate>();
    const { mutate: updateManyLead } = useUpdateMany();
    const { mutate: deleteStatus } = useDelete();

    // Drag & Drop
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
    
    // Acciones
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

    
    const handleExportCsv = (status?: number) => {       
        exportCsv({
            url: "/exports/leads_csv",
            params: { status: status },
            filenameFallback: `leads_status${status}.csv`,
        });
    };

    const handleExportPdf = (status?: number)  => {
        exportPdf({
            url: "/exports/leads_pdf",
            params: { status: status },
            filenameFallback:  `leads_status${status}.pdf`,
        });
    };

    const handleChangeFilters = (values: IFilter) => {
        setFilters(values);
        setCurrentPage(1);
    };
   

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
                label: "Exportar a CSV",
                key: "2",
                icon: <ClearOutlined />,
                disabled: !hasItems,
                onClick: () =>
                handleExportCsv(column.id),
            },
             {
                label: "Exportar a PDF",
                key: "2",
                icon: <ClearOutlined />,
                disabled: !hasItems,
                onClick: () =>
                handleExportPdf(column.id),
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

    const menuItems: MenuProps["items"] = [
        {
            key: "csv",
            label: "Exportar CSV",
            onClick: () => handleExportCsv(),
        },
        {
            key: "pdf",
            label: "Exportar PDF",
            onClick: () => handleExportPdf(),
        },
    ];

    const isLoading = qlead.isLoading || qstatus.isLoading;
    
    if (isLoading) return <PageSkeleton />;

    return (
        <>
            <LeadHeader form={form} menuItems={menuItems} onChangeFilters={handleChangeFilters} pagination={pagination}/>
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

