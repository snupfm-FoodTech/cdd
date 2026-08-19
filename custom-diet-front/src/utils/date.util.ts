import { format, isValid } from 'date-fns';

const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

export const formatDate = (
  date: string | Date,
  dateFormat: string = DEFAULT_DATE_FORMAT
): string => {
  let dateObj: Date;

  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  if (!isValid(dateObj)) {
    console.error('Invalid date');
    return '';
  }

  return format(dateObj, dateFormat);
};
