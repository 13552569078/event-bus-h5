import dayjs from 'dayjs';

/**
 * 获取近多少天，至当天结束（23:59:59）
 * @param number
 */
const getDaysBetween = (number: number) => {
  let day1: string|number = '';
  let day2 = '';
  const oneDay = 24 * 60 * 60 * 1000;
  const endTime = new Date(new Date().toLocaleDateString()).getTime() + oneDay - 1;
  day1 = dayjs(endTime).format('YYYY-MM-DD HH:mm:ss');
  const startTime = new Date(new Date().toLocaleDateString()).getTime() + oneDay - number * oneDay;
  day2 = dayjs(startTime).format('YYYY-MM-DD HH:mm:ss');
  return { startTime: day2, endTime: day1 };
};

/*
*获取今日的起始和结束时间
*返回值："起始时间,结束时间"
*/
function ToDayStr() {
  let returnStr = "";
  const date = new Date(); // 当前时间
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  returnStr = year + "-" + month + "-" + day + " 00:00:00,"; // 起始时间
  returnStr += year + "-" + month + "-" + day + " 23:59:59"; // 结束时间
  return returnStr;
}

/*
*获取昨日的起始和结束时间
*返回值："起始时间,结束时间"
*/
function YesterDayStr() {
  const date = GetDate(1, 1); // 当前时间前一天
  let returnStr = "";
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  returnStr = year + "-" + month + "-" + day + " 00:00:00,"; // 起始时间
  returnStr += year + "-" + month + "-" + day + " 23:59:59"; // 结束时间
  return returnStr;
}

/*
*获取本周的起始和结束时间
*返回值："起始时间,结束时间"
*/
function ThisWeekStr() {
  let returnStr = "";
  const date = new Date(); // 当前时间
  const week = date.getDay(); // 获取今天星期几
  const monday = GetDate2(week - 1, 1, date); // 获取星期一
  const sunday = GetDate2(7 - week, 2, date); // 获取星期天
  // 起始时间的年月日
  const year1 = monday.getFullYear();
  let month1: string|number = monday.getMonth() + 1;
  let day1: string|number = monday.getDate();
  // 结束时间的年月日
  const year2 = sunday.getFullYear();
  let month2 = sunday.getMonth() + 1;
  let day2 = sunday.getDate();
  // 处理起始时间小于10的追加"0"在前面
  month1 = month1 < 10 ? "0" + month1 : month1;
  day1 = day1 < 10 ? "0" + day1 : day1;
  // 处理结束时间小于10的追加"0"在前面
  month2 = month2 < 10 ? "0" + month2 : month2;
  day2 = day2 < 10 ? "0" + day2 : day2;

  returnStr = year1 + "-" + month1 + "-" + day1 + " 00:00:00,"; // 起始时间
  returnStr += year2 + "-" + month2 + "-" + day2 + " 23:59:59"; // 结束时间
  return returnStr;
}

/*
*获取上周的起始和结束时间
*返回值："起始时间,结束时间"
*/
function LastWeekStr() {
  let returnStr = "";
  const date = new Date(); // 当前时间
  const week = date.getDay(); // 获取今天星期几
  const monday = GetDate2(week + 6, 1, date); // 获取上周星期一
  const sunday = GetDate2(week, 1, date); // 获取上周星期天
  // 起始时间的年月日
  const year1 = monday.getFullYear();
  let month1: string|number = monday.getMonth() + 1;
  let day1: string|number = monday.getDate();
  // 结束时间的年月日
  const year2 = sunday.getFullYear();
  let month2 = sunday.getMonth() + 1;
  let day2 = sunday.getDate();
  // 处理起始时间小于10的追加"0"在前面
  month1 = month1 < 10 ? "0" + month1 : month1;
  day1 = day1 < 10 ? "0" + day1 : day1;
  // 处理结束时间小于10的追加"0"在前面
  month2 = month2 < 10 ? "0" + month2 : month2;
  day2 = day2 < 10 ? "0" + day2 : day2;

  returnStr = year1 + "-" + month1 + "-" + day1 + " 00:00:00,"; // 起始时间
  returnStr += year2 + "-" + month2 + "-" + day2 + " 23:59:59"; // 结束时间
  return returnStr;
}

/*
*获取本月的起始和结束时间
*返回值："起始时间,结束时间"
*/
function ThisMonthStr() {
  let returnStr = "";
  const date = new Date(); // 当前时间
  const year = date.getFullYear();
  const month = date.getMonth();

  const min = new Date(year, month, 1); // 本月月初
  const max = new Date(year, month + 1, 0); // 本月月底

  // 起始时间的年月日
  const year1 = min.getFullYear();
  let month1: string|number = min.getMonth() + 1;
  let day1: string|number = min.getDate();
  // 结束时间的年月日
  const year2 = max.getFullYear();
  let month2 = max.getMonth() + 1;
  let day2 = max.getDate();
  // 处理起始时间小于10的追加"0"在前面
  month1 = month1 < 10 ? "0" + month1 : month1;
  day1 = day1 < 10 ? "0" + day1 : day1;
  // 处理结束时间小于10的追加"0"在前面
  month2 = month2 < 10 ? "0" + month2 : month2;
  day2 = day2 < 10 ? "0" + day2 : day2;

  returnStr = year1 + "-" + month1 + "-" + day1 + " 00:00:00,"; // 起始时间
  returnStr += year2 + "-" + month2 + "-" + day2 + " 23:59:59"; // 结束时间
  return returnStr;
}

/*
*获取当前日期前N天或后N日期(N = day)
*type:1：前；2：后
*/
function GetDate(day, type) {
  const zdate = new Date();
  let edate;
  if (type === 1) {
    edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
  } else {
    edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
  }
  return edate;
}

/*
*获取传入的日期前N天或后N日期(N = day)
*type:1：前；2：后
*date：传入的日期
*/
function GetDate2(day, type, date) {
  let zdate;
  if (date === null || date === undefined) {
    zdate = new Date();
  } else {
    zdate = date;
  }
  let edate;
  if (type === 1) {
    edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
  } else {
    edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
  }
  return edate;
}

/*
*获取本年的起始和结束时间
*返回值："起始时间,结束时间"
*/
function ThisYearStr() {
  let returnStr = "";
  const date = new Date(); // 当前时间
  const year = date.getFullYear();

  const min = new Date(year, 0, 1); // 本月月初
  const max = new Date(year, 12, 0); // 本月月底

  // 起始时间的年月日
  const year1 = min.getFullYear();
  let month1: string|number = min.getMonth() + 1;
  let day1: string|number = min.getDate();
  // 结束时间的年月日
  const year2 = max.getFullYear();
  let month2 = max.getMonth() + 1;
  let day2 = max.getDate();
  // 处理起始时间小于10的追加"0"在前面
  month1 = month1 < 10 ? "0" + month1 : month1;
  day1 = day1 < 10 ? "0" + day1 : day1;
  // 处理结束时间小于10的追加"0"在前面
  month2 = month2 < 10 ? "0" + month2 : month2;
  day2 = day2 < 10 ? "0" + day2 : day2;

  returnStr = year1 + "-" + month1 + "-" + day1 + " 00:00:00,"; // 起始时间
  returnStr += year2 + "-" + month2 + "-" + day2 + " 23:59:59"; // 结束时间
  return returnStr;
}

export { getDaysBetween, ToDayStr, ThisWeekStr, ThisMonthStr, ThisYearStr };
