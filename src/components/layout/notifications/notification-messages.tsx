import { Text } from "../../base/text";
import { Activity } from "../../../interfaces/models/activity.interface";
import { useUpdate, useInvalidate } from "@refinedev/core";
import { ActivityType } from "../../../interfaces/models/activity.interface";
import { useNavigate } from "react-router";

type Props = {
  audit: Activity;
};

export const NotificationMessage: React.FC<Props> = ({ audit }) => {
  const navigate = useNavigate();
  const invalidate = useInvalidate();

  const { mutate: markRead } = useUpdate();

  const handleClick = () => {
    markRead(
      {
        resource: "activities",
        id: audit.id,
        values: { is_read: true },
      },
      {
        onSuccess: () => {
          invalidate({
            resource: "activities",
            invalidates: ["list"],
          });

          redirectUser();
        },
      }
    );
  };

  const redirectUser = () => {
    switch (audit.activity_type) {
      case ActivityType.Meeting:
        navigate("/calendar");
        break;

      case ActivityType.Message:
        if (audit.metadata.channel === "whatsapp") navigate("/whatsapp");
        else navigate("/email");
        break;

      case ActivityType.Call:
        navigate(`/calls/${audit.user?.id}`);
        break;

      case ActivityType.Email:
        navigate("/email");
        break;

      case ActivityType.Task:
        navigate(`/tasks/`);
        break;

      case ActivityType.Note:
        navigate(`/notes/`);
        break;

      default:
        navigate("/notifications");
        break;
    }
  };

  // === Generar título dinámico ===
  const getTitle = () => {
    switch (audit.activity_type) {
      case ActivityType.Meeting:
        return "Nueva reunión programada";
      case ActivityType.Message:
        return "Mensaje recibido";
      case ActivityType.Call:
        return "Llamada registrada";
      case ActivityType.Email:
        return "Nuevo correo recibido";
      case ActivityType.Task:
        return "Tarea asignada";
      case ActivityType.Note:
        return "Nota agregada";
      case ActivityType.status_change:
        return "Estado actualizado";
      default:
        return "Nueva actividad";
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Text size="sm" strong>
        {getTitle()}
      </Text>

      <Text size="xs" type="secondary">
        {audit.description || ""}
      </Text>
    </div>
  );
};