import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru';
import {observer} from 'mobx-react'

const Dates = observer(({startDate, endDate, setDateRange}) => {
    return (
        <DatePicker
            dateFormat="dd.MM.yyyy"
            className="date-peacker-custom-input"
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
                setDateRange(update);
            }}
            withPortal
            shouldCloseOnSelect={true}
            selectsRange={true}
            locale={ru}
        />
    )
})

export default Dates;