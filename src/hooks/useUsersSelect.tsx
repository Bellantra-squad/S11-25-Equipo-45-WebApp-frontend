import { useSelect } from "@refinedev/antd";

export interface IUser {
  id: string;
  name: string;
  avartarUrl?: string;
}

export const useUsersSelect = () => {
  return useSelect<IUser>({
    resource: "users",
    optionLabel: "name",
    optionValue: "id",
  });
};
