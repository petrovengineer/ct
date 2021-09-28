function setDateRange(startDate, endDate, get, updateFilter){
    if(endDate!=null)endDate.setHours(23,59,59,999);
    updateFilter(()=>({
        startDate: new Date(startDate.getTime()),
        endDate: endDate?new Date(endDate.getTime()):null,
        skip: endDate?0:undefined
    }))
    if(endDate!=null)get()
}

export default  setDateRange