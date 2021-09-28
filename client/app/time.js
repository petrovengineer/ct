function formatDate(isoDate){
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const result = addZero(day.toString()) + '.' + addZero((month+1).toString()) + '.' + year + ' ' 
    + addZero(hours.toString()) + ':' + addZero(minutes.toString());;
    return result;
}

function formatTime(isoDate){
    const date = new Date(isoDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const result = addZero(hours.toString()) + ':' + addZero(minutes.toString());;
    return result;
}

function addZero(num){
    num = num.toString();
    if(num.length===1){
        return '0' + num;
    }else return num;
}

function getClearDate(date){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function getAmount(inTime, outTime){
    if(!inTime || !outTime)return 'x';
    const amount = outTime.getTime() - inTime.getTime()
    return (Math.floor(amount / (1000*60*60)))
}

function daysBefore(date, days){
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return new Date(date.getTime()-days*24*60*60*1000)
}

const weekDaysShort = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб',]
const monthList = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
const monthListDec = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря']
const dayList = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']

module.exports = {formatDate, formatTime, addZero, weekDaysShort, monthList, dayList, monthListDec, getClearDate, getAmount, daysBefore}