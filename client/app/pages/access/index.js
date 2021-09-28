import React, {useEffect} from 'react'
import {formatDate} from '_app/time'
import Dates from '_components/dates'
import Pages from '_components/pagination'
import WithAccess from '_hoc/WithAccess'
import Calendar from '_components/calendar'
import {observer} from "mobx-react";
import accessStore from '_entities/Accesses/store'
import setDateRange from "_app/custom/setDateRange";

// export default ()=>(
    // <WithAccess limit={10}>
    const Accesses = ()=>{
        const {cachedData:accesses, filter, updateFilter, count, get} = accessStore;
        function onChange(startDate, endDate){
            setDateRange(startDate, endDate, get, updateFilter)
        }
        if(!accesses)return <h1 className="title">Загрузка...</h1>
        return (
            <>
                <h1 className="subtitle">Контроль доступа</h1>
                <Calendar startDate={filter.startDate} endDate={filter.endDate} onChange={onChange} range/>
                {/*<Calendar range startDate={filter.startDate} endDate={filter.endDate} onChange={(update)=>setDateRange(update)}/>*/}
                {/* <Dates startDate={filter.startDate} endDate={filter.endDate} setDateRange={setDateRange}/> */}
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Время</th>
                            <th>Пользователь</th>
                            <th>Код ключа</th>
                            <th>Действие</th>
                        </tr>
                        {accesses.map(access=>(
                            <tr key={access._id}>
                                <td>{formatDate(access.time)}</td>
                                <td>{(access.key && access.key.owner)?access.key.owner:'Неизвестный пользователь'}</td>
                                <td>{(access.key && access.key.data)?access.key.data:'?????????'}</td>
                                <td className={access.action===0?'has-background-danger':'has-background-success'}>{access.action===1?'Вход':'Выход'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filter.limit && <Pages count={count} limit={filter.limit} skip={filter.skip} updateFilter={updateFilter} get={get}/>}
            </>
        )
    }
// }
    // </WithAccess>
// )

export default observer(Accesses)