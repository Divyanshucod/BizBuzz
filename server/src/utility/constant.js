export const arrayOfMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  export const arrayOfDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
 
 export const GetCurrentDate = ()=>{
    const currentDate = new Date();
    const getDate = {
    //getting current date her
    month: arrayOfMonths[currentDate.getMonth()],
    year: currentDate.getFullYear(),
    day: arrayOfDays[currentDate.getDay()],
    hour: currentDate.getHours(),
    minutes: currentDate.getMinutes(),
  };
  return getDate;
 }
