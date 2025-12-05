
import { Activity } from "../../../interfaces/models/activity.interface";
import { Text } from "../../base/text";

type Props = {
  audit:Activity;
};

export const NotificationMessage = ({ audit}: Props) => {
    return (
      <Text style={{display:"flex", flexDirection:"column"}}>
        <Text   strong>Tipo: {audit.activity_type.toUpperCase()}</Text>        
        <Text style={{width:"100%"}}>{audit?.description || ""}</Text>
      </Text>
    );
};
