export const generateHourSlots = (start: string, end: string) => {
  const slots = [];
  let [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  while (
    startHour < endHour ||
    (startHour === endHour && startMinute < endMinute)
  ) {
    const hourStr = `${String(startHour).padStart(2, "0")}:${String(
      startMinute
    ).padStart(2, "0")}`;
    slots.push(hourStr);
    startHour++;
  }

  return slots;
};