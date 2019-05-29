import React from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

export default function DatePickerComponent(props) {
    const { rangeHandler} = props 
    function onChange(dates, dateStrings) {
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        rangeHandler( dateStrings[0],dateStrings[1])
    }

    function disabledDate(current) {
        // Can not select days before today and today
        return  current < moment('2019-04-10')  ||  current > moment('2019-04-23'); 
    }

    return (<div>
        <RangePicker
            disabledDate={disabledDate}
            ranges={{
                Today: [moment('2019-04-10'), moment("2019-04-23")],
            }}
            onChange={onChange}
        />
    </div>)

}

