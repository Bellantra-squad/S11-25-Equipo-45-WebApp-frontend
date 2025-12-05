type DateColors = "success" | "processing" | "error" | "default" | "warning";

export const getDateColor = (args: {
  date: string;
  defaultColor?: DateColors;
}): DateColors => {
  const inputDate = new Date(args.date);
  const today = new Date();

  // Normalizar (quitar horas) para comparación correcta
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Diferencia en días
  const diffMs = inputDate.getTime() - today.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 0) {
    return "error"; // Fecha pasada
  }

  if (diffDays < 3) {
    return "warning"; // Fecha próxima (< 3 días)
  }

  return args.defaultColor ?? "default";
};