import React from 'react'
import {formatDate} from '_app/time'
import Dates from '_components/dates'
import Pages from '_components/pagination'
import WithAccess from '_hoc/WithAccess'

export default ()=>(
    <WithAccess>
        {({data, filter, setDateRange, setSkip, count})=>{
        if(!data)return <h1 className="title">Загрузка...</h1>
        return (
            <>
                <h1 className="title">Контроль доступа</h1>
                <Dates startDate={filter.startDate} endDate={filter.endDate} setDateRange={setDateRange}/>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Время</th>
                            <th>Пользователь</th>
                            <th>Код ключа</th>
                            <th>Действие</th>
                        </tr>
                        {data.map(access=>(
                            <tr key={access._id}>
                                <td>{formatDate(access.time)}</td>
                                <td>{access.key.owner?access.key.owner:'Неизвестный пользователь'}</td>
                                <td>{access.key.data}</td>
                                <td>{access.action===1?'Вход':'Выход'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pages count={count} limit={filter.limit} skip={filter.skip} setSkip={setSkip}/>
            </>
        )
    }}
    </WithAccess>
)