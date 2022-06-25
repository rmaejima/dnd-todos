import { format } from 'date-fns';

export const formatDateToString = (date: Date): string => {
  const fmt = 'yyyy年MM月dd日hh時mm分';
  return format(date, fmt);
};
