import {DateTime} from "luxon";

const todayDate = ()=>{
    const todayD = DateTime.local();
    return `${todayD.day<10?'0'+String(todayD.day):todayD.day}/${todayD.month<10?'0'+String(todayD.month):todayD.month}/${todayD.year}`;
}

const todayDatePlusNDays = (n)=>{
    const todayD = DateTime.local();
    const tomorrowD = todayD.plus({day:n});
    return `${tomorrowD.day<10?'0'+String(tomorrowD.day):tomorrowD.day}/${tomorrowD.month<10?'0'+String(tomorrowD.month):tomorrowD.month}/${tomorrowD.year}`;
}

function getNextMondayFromToday(){
    let date = DateTime.local()
    let givenWeekDay = date.weekday;
    let addWeekDay = 8 - givenWeekDay;
    if (givenWeekDay > 1){
        temp = date.plus({days:addWeekDay})
        date = temp
    }
    return `${date.day<10?'0'+String(date.day):date.day}/${date.month<10?'0'+String(date.month):date.month}/${date.year}`;
}

function formateStartDate(date){
    return DateTime.fromFormat(`${date}`, 'dd/MM/yyyy');
}

function toIndianStandard(date){
    let p = date.split('-')
    date = DateTime.fromFormat(`${p[2]}-${p[1]}-${p[0]}`, 'dd-MM-yyyy');
    return `${date.day<10?'0'+String(date.day):date.day}/${date.month<10?'0'+String(date.month):date.month}/${date.year}`;
}

function getStartDatePlus(date, n){
date = date.plus({days:n})
 return `${date.day<10?'0'+String(date.day):date.day}/${date.month<10?'0'+String(date.month):date.month}/${date.year}`;
}

export {todayDate, todayDatePlusNDays, getNextMondayFromToday, getStartDatePlus, formateStartDate, toIndianStandard};
