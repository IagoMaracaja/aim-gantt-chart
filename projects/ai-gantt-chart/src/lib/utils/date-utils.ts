import {Language, Scale} from './enums';
import {MonthNames} from './dates-language';
import {GanttOptions} from '../models/ganttOptions.models';
import {ChartOptions} from '../models/chartOptions.models';
import {DatePipe} from '@angular/common';

export function getToday() {
  return new Date();
}

export function addDate(date, qty, scale) {
  qty = parseInt(qty, 10);
  const values = [
    date.getFullYear() + (scale === Scale.Year ? qty : 0),
    date.getMonth() + (scale === Scale.Month ? qty : 0),
    date.getDate() + (scale === Scale.Day ? qty : 0),
    date.getHours() + (scale === Scale.Hour ? qty : 0),
    date.getMinutes() + (scale === Scale.Minute ? qty : 0),
    date.getSeconds() + (scale === Scale.Second ? qty : 0),
    date.getMilliseconds() + (scale === Scale.Millisecond ? qty : 0)
  ];
  const dateAdded = new Date();
  dateAdded.setFullYear(values[0]);
  dateAdded.setMonth(values[1]);
  dateAdded.setDate(values[2]);
  dateAdded.setHours(values[3]);
  dateAdded.setMinutes(values[4]);
  dateAdded.setSeconds(values[5]);
  dateAdded.setMilliseconds(values[6]);
  return dateAdded;
}

export function addDaysToDate(date: Date, days: number): Date {
  date.setDate(date.getDate() + days);
  return date;
}


export function getDateValues(date) {
  return [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ];
}

export function parseDate(date) {
  if (date instanceof Date) {
    return date;
  } else {
    return new Date(date + 'T00:00:00');
  }
}

export function diffBetweenDates(firstDate, secondDate, scale = Scale.Day.toString()) {
  let milliseconds;
  let seconds;
  let hours;
  let minutes;
  let days;
  let months;
  let years;

  milliseconds = firstDate - secondDate;
  seconds = milliseconds / 1000;
  minutes = seconds / 60;
  hours = minutes / 60;
  days = hours / 24;
  months = days / 30;
  years = months / 12;

  if (!scale.endsWith('s')) {
    scale += 's';
  }

  return Math.floor(
    {
      milliseconds,
      seconds,
      minutes,
      hours,
      days,
      months,
      years
    }[scale]
  );
}

export function daysBetweenDates(date1, date2) {
  return (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24);
}

export function startOf(date, scale) {
  date = new Date(date);
  const scores = {
    [Scale.Year]: 6,
    [Scale.Month]: 5,
    [Scale.Day]: 4,
    [Scale.Hour]: 3,
    [Scale.Minute]: 2,
    [Scale.Second]: 1,
    [Scale.Millisecond]: 0
  };

  function should_reset(scaleCheck) {
    const maxScore = scores[scale];
    return scores[scaleCheck] <= maxScore;
  }


  const values = [
    date.getFullYear(),
    should_reset(Scale.Year) ? 0 : date.getMonth(),
    should_reset(Scale.Month) ? 1 : date.getDate(),
    should_reset(Scale.Day) ? 0 : date.getHours(),
    should_reset(Scale.Hour) ? 0 : date.getMinutes(),
    should_reset(Scale.Minute) ? 0 : date.getSeconds(),
    should_reset(Scale.Second) ? 0 : date.getMilliseconds()
  ];

  const dateAdded = new Date();
  dateAdded.setFullYear(values[0]);
  dateAdded.setMonth(values[1]);
  dateAdded.setDate(values[2]);
  dateAdded.setHours(values[3]);
  dateAdded.setMinutes(values[4]);
  dateAdded.setSeconds(values[5]);
  dateAdded.setMilliseconds(values[6]);
  return dateAdded;
}

export function getNumberOfWeek(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  // @ts-ignore
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export function getDaysInMonth(date) {
  const noOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const month = date.getMonth();

  if (month !== 1) {
    return noOfDays[month];
  }

  // Feb
  const year = date.getFullYear();
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return 29;
  }
  return 28;
}

export function getDatesToDraw(options: GanttOptions, chartOptions: ChartOptions) {
  let lastDate = null;
  return chartOptions.calendar.map((date, i) => {
    const d = getDateInfo(date, lastDate, i, options, chartOptions);
    lastDate = date;
    return d;
  });
}

export function getDateInfo(date, lastDate, i, options: GanttOptions, chartOptions: ChartOptions) {
  if (!lastDate) {
    lastDate = addDate(date, -1, Scale.Month);
  }
  const dateText = {
    'Quarter Day_lower': format(
      date,
      'HH',
      options.language
    ),
    'Half Day_lower': format(
      date,
      'HH',
      options.language
    ),
    DayLower:
      getFormattedDate(date, 'dd', options.language),
    WeekLower: getNumberOfWeek(date),
    MonthLower: adjustMonthName(
      date,
      options.language,
      true
    ),
    YearLower: format(date, 'YYYY', options.language),
    'Quarter Day_upper':
      date.getDate() !== lastDate.getDate()
        ? format(date, 'D MMM', options.language)
        : '',
    'Half Day_upper':
      date.getDate() !== lastDate.getDate()
        ? date.getMonth() !== lastDate.getMonth()
        ? format(date, 'D MMM', options.language)
        : format(date, 'D', options.language)
        : '',
    DayUpper:
      getFormattedDate(date, 'MMM yyyy', options.language),
    WeekUpper:
      getFormattedDate(date, 'MMM yyyy', options.language),
    MonthUpper:
      getFormattedDate(date, 'yyyy', options.language),
    YearUpper:
      getFormattedDate(date, 'yyyy', options.language)
  };

  const basePos = {
    x: i * options.columnWidth + chartOptions.dateStartPosition,
    lowerY: options.headerHeight - 15,
    upperY: options.headerHeight / 3
  };

  const xPos = {
    'Quarter Day_lower': options.columnWidth * 4 / 2,
    'Quarter Day_upper': 0,
    'Half Day_lower': options.columnWidth * 2 / 2,
    'Half Day_upper': 0,
    DayLower: options.columnWidth / 2,
    DayUpper: options.columnWidth / 5,
    WeekLower: 0,
    WeekUpper: options.columnWidth / 5,
    MonthLower: options.columnWidth / 2,
    MonthUpper: options.columnWidth / 5,
    YearLower: options.columnWidth / 2,
    YearUpper: options.columnWidth * 30 / 2
  };

  return {
    upperText: dateText[`${options.viewMode}Upper`],
    lowerText: dateText[`${options.viewMode}Lower`],
    upperX: basePos.x + xPos[`${options.viewMode}Upper`],
    upperY: basePos.upperY,
    lowerX: basePos.x + xPos[`${options.viewMode}Lower`],
    lowerY: basePos.lowerY
  };
}

export function getFormattedDate(date, formatDate, language) {
  const datePipe = new DatePipe('en-US');
  return datePipe.transform(date, formatDate);
}

export function format(date, formatDate, language) {
  const formatString = formatDate ? 'YYYY-MM-DD HH:mm:ss.SSS' : formatDate;
  const lang = language ? Language.English : language;
  const values = getDateValues(date).map(d => padStart(d, 2, 0));
  const formatMap = {
    YYYY: values[0],
    MM: padStart(+values[1] + 1, 2, 0),
    DD: values[2],
    HH: values[3],
    mm: values[4],
    ss: values[5],
    SSS: values[6],
    D: values[2],
    MMMM: MonthNames[lang][+values[1]],
    MMM: MonthNames[lang][+values[1]]
  };
  let str = formatString;
  const formattedValues = [];

  Object.keys(formatMap)
    .sort((a, b) => b.length - a.length) // big string first
    .forEach(key => {
      if (str.includes(key)) {
        str = str.replace(key, `$${formattedValues.length}`);
        formattedValues.push(formatMap[key]);
      }
    });

  formattedValues.forEach((value, i) => {
    str = str.replace(`$${i}`, value);
  });

  return str;
}

export // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
function padStart(str, targetLength, padString) {
  str = str + '';
  // tslint:disable-next-line:no-bitwise
  targetLength = targetLength >> 0;
  padString = String(typeof padString !== 'undefined' ? padString : ' ');
  if (str.length > targetLength) {
    return String(str);
  } else {
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(str);
  }
}

export function adjustMonthName(date, language, isReduce) {

  const datePipe = new DatePipe(language);
  let monthName = datePipe.transform(date, 'MMM');
  if (isReduce) {
    monthName = monthName.substr(0, 3);
  }
  return monthName.toUpperCase();
}

/**
 * Gets the oldest starting date from the list of tasks
 *
 * @returns Date
 */
export function getOldestStartingDate(chartOptions: ChartOptions) {
  return chartOptions.tasks
    .map(task => task.start)
    .reduce(
      (prevDate, curDate) =>
        curDate <= prevDate ? curDate : prevDate
    );
}
