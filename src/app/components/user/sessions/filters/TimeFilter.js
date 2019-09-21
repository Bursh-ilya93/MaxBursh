import React from 'react';

import DatePicker, {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

export const TimeFilter = ({changePeriod, value}) => {
    return (
        <DatePicker
            locale="ru"
            className="hasDatepicker"
            // dateFormat="DD-MM-YYYY"
            selected={new Date(value)}
            onChange={changePeriod}
        />

    )
};