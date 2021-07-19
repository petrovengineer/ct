import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru';
import ObservationStore from '_store/observations'
import {action} from 'mobx'
import {observer} from 'mobx-react'

const Dates = observer(() => {
    const {startDate: startDateStore, endDate: endDateStore, setDateRange: setDateRangeStore} = ObservationStore;
    return (
        <DatePicker
            dateFormat="dd.MM.yyyy"
            className="date-peacker-custom-input"
            // startDate={startDate}
            startDate={startDateStore}
            // endDate={endDate}
            endDate={endDateStore}
            onChange={action((update) => {
                setDateRangeStore(update);
            })}
            // showTimeInput
            // customTimeInput={<TimeInput />}
            withPortal
            disabledKeyboardNavigation
            shouldCloseOnSelect={true}
            selectsRange={true}
            // timeInputLabel=""
            locale={ru}
            // showMonthDropdown
            // openToDate={new Date("1993/09/28")}
        />
    )
})

export default Dates;