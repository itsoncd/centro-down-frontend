import { parse, format } from "date-fns";

export function formatHour(hour: string): string {
  const parsed = parse(hour, hour.length > 5 ? "HH:mm:ss" : "HH:mm", new Date());
  return format(parsed, "HH:mm");
}