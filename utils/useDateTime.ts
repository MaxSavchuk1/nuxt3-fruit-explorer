import "dayjs/locale/en";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isToday from "dayjs/plugin/isToday";
import dayjs from "dayjs";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isToday);

export const useDateTime = (
  date?: dayjs.ConfigType,
  format?: dayjs.OptionType,
) => dayjs(date, format);
