import React, {useEffect, useState} from "react";
import WithAccess from "_hoc/WithAccess";
import Dates from "_components/dates"
import {addZero} from "_app/time.js"

export default ()=>(
    <WithAccess>
        {({data, filter, setDateRange, setSkip, count})=>{
            const [dates, setDates] = useState([])
            useEffect(()=>{
                if(filter.endDate){
                    const dates = getDates();
                    const owners = getOwners();
                    dates.map(date=>{
                        console.log(date)
                        const accesses = data.filter(d=>new Date(d.time).getDate()===date.getDate())
                        console.log("ACCESSES ", accesses)
                    })
                }
            }, [filter.endDate])
            function getDates(){
                const date = new Date(filter.startDate);
                const dates = [];
                while (date.getDate()!==filter.endDate.getDate()+1){
                    dates.push(new Date(date))
                    date.setDate(date.getDate()+1)
                }
                return dates;
            }
            function getOwners(){
                const owners = []
                for(let i=0; i<data.length; i++){
                    if(!data[i].key.owner)continue;
                    if(owners.indexOf(data[i].key.owner)===-1)owners.push(data[i].key.owner)
                }
                return owners;
            }
            if(!data)return <h1 className="title">Загрузка...</h1>
            return (
                <>
                    <h1 className="subtitle">Учёт рабочего времени</h1>
                    <Dates startDate={filter.startDate} endDate={filter.endDate} setDateRange={setDateRange}/>
                    {(!filter.startDate || !filter.endDate)?
                        <h1 className="subtitle mt-2 has-text-primary">Необходимо выбрать временной интервал</h1>
                        :<table className="table">
                            <tbody>
                                <tr>
                                    <th></th>
                                    {dates.map((d)=>(<th>{d.getDate()}.{addZero((d.getMonth()+1).toString())}</th>))}
                                </tr>
                            </tbody>
                        </table>
                    }
                </>
            )
        }}
    </WithAccess>
)