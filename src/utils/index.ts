import { addHours, format } from "date-fns";
import { ko } from "date-fns/locale";

export const localToISOString = (date: Date) => addHours(date, 9).toISOString();

export const ISOStringToLocal = (date: string) =>
  format(addHours(new Date(date), -9), "M월 d일 a h시", { locale: ko });
