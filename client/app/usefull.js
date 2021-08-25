function shortName(fullName){
    if(fullName){
        const arr = fullName.split(" ")
        let result = arr[0];
        if(arr[1]) result += " " + arr[1][0] +". ";
        if(arr[2]) result += arr[2][0] + ".";
        return result;
    }
    else return fullName;
}

export {shortName};