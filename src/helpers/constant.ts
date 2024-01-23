import { format } from 'date-fns';

// export const PAGE_SIZE_OPTIONS = ['25', '50', '100'];
// export const PAGE_SIZE_OPTIONS = ['3', '5', '10'];
export const PAGE_SIZE_OPTIONS = ['5','10', '20', '50'];

const date = new Date();

export const now = format(new Date(), 'MMMM dd, yyyy');
export const appVersion: string | undefined =
  process.env.REACT_APP_VERSION_NAME;
export const thisYear = date.getFullYear();

export const getInitialName = (name: string) => {
  const split: string[] = name.split(' ');

  let start = 0;
  let initial = [];

  if (split.length > 1) {
    while (start <= 1) {
      initial.push(split[start].charAt(0));
      start++;
    }
  } else {
    initial.push(split[0].substr(0, 2));
  }

  return initial.join('').toUpperCase();
};

export const formatDate = (date: any) => {
  if (date) {
    const formated = format(new Date(date), 'MMMM dd, yyyy');
    return formated;
  }
  return '';
};

export const formatTime = (time: any) => {
  if (time) {
    const formated = format(new Date(time), 'HH:mm');
    return formated;
  }
  return '';
};

export const formatYearToTime = (date: any) => {
  if (date) {
    const formated = format(new Date(date), 'dd MMM yyyy, HH:mm');
    return formated;
  }
  return '';
};

export const formatYearToTimeWithSpace = (date: any) => {
  if (date) {
    const formattedDate = format(new Date(date), 'dd MMM yyyy');
    const formattedTime = format(new Date(date), 'HH:mm');
    
    // Add extra spaces between date and time
    const formatted = `
    ${formattedDate}   
    ‎ ‎ 
    ${formattedTime}`;
    
    return formatted;
  }
  return '';
};

export const formatUrlParams = (value: string) => {
  const param = value.split(' ').join('-').toLowerCase();
  return param;
};

export const formatMonth = (date: any) => {
  if (date) {
    const formated = format(new Date(date), 'MMM yyyy');
    return formated;
  }
  return '';
};
