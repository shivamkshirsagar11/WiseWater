import {DateTime} from "luxon";

const todayDate = ()=>{
    const todayD = DateTime.local();
    return `${todayD.day}/${todayD.month}/${todayD.year}`;
}

const todayDatePlusNDays = (n)=>{
    const todayD = DateTime.local();
    const tomorrowD = todayD.plus({day:n});
    return `${tomorrowD.day}/${tomorrowD.month}/${tomorrowD.year}`;
}


export {todayDate, todayDatePlusNDays};
