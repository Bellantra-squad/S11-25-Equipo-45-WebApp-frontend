type UseCustomAvatarProps = {
  name?: string;
  last_name?: string;
};

type UseCustomAvatarReturn = {
  isLoading: boolean;
  initials: string;
  hasInitials: boolean;
  bgColor: string;
};

const getInitials = (name?: string, lastName?: string): string => {
  const firstInitial = name?.charAt(0)?.toUpperCase() || "";
  const lastInitial = lastName?.charAt(0)?.toUpperCase() || "";
  return firstInitial + lastInitial;
};

const getColorFromName = (name: string): string => {
  const colors = [
    "#f56a00",
    "#7265e6",
    "#ffbf00",
    "#00a2ae",
    "#87d068",
    "#108ee9",
    "#eb2f96",
    "#722ed1",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const useCustomAvatar = ({
  name,
  last_name,
}: UseCustomAvatarProps): UseCustomAvatarReturn => {
  const isLoading = name === undefined && last_name === undefined;
  const initials = getInitials(name, last_name);
  const hasInitials = initials.length > 0;
  const bgColor = hasInitials
    ? getColorFromName((name || "") + (last_name || ""))
    : "#d9d9d9";

  return {
    isLoading,
    initials,
    hasInitials,
    bgColor,
  };
};

