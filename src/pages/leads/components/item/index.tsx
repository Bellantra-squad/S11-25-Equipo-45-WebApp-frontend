import { FC, PropsWithChildren } from "react";
import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { LeadResponse } from "../../../../interfaces/models/lead.interface";

interface Props {
  id: string | number;
  data?: LeadResponse;
}

export const KanbanItem: FC<PropsWithChildren<Props>> = ({
  children,
  id,
  data,
}) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id,
    data,
  });

  const isActive = active?.id === id;

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          opacity: active ? (isActive ? 1 : 0.5) : 1,
          borderRadius: "8px",
          cursor: "grab",
        }}
      >
        {children}
      </div>

      {isActive && (
        <DragOverlay zIndex={1000}>
          <div
            style={{
              borderRadius: "8px",
              boxShadow:
                "0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0,0,0,0.12), 0px 6px 16px rgba(0,0,0,0.08)",
              cursor: "grabbing",
            }}
          >
            {children}
          </div>
        </DragOverlay>
      )}
    </div>
  );
};