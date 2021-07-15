function formatDate(isoDate){
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const result = addZero(day.toString()) + '.' + addZero(month.toString()) + '.' + year + ' ' 
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
    if(num.length===1){
        return '0' + num;
    }else return num;
}

module.exports = {formatDate, formatTime}