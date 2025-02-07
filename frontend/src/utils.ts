export const subDateDiff = (date: Date, diff: string): Date => {
  const newDate = new Date(date);
  switch (diff) {
    case "1W":
      newDate.setDate(newDate.getDate() - 7);
      break;
    case "2W":
      newDate.setDate(newDate.getDate() - 14);
      break;
    case "1M":
      newDate.setMonth(newDate.getMonth() - 1);
      break;
    case "1Q":
      newDate.setMonth(newDate.getMonth() - 3);
      break;
    case "6M":
      newDate.setMonth(newDate.getMonth() - 6);
      break;
    case "1Y":
      newDate.setMonth(newDate.getMonth() - 12);
      break;
    default:
      break;
  }
  return newDate;
};
