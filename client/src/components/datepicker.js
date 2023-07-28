import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const ReactDatePicker = ({ handleDate }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().setDate(new Date().getDate() + 1));
    const days_left = Math.ceil((selectedDate - new Date()) / (1000 * 3600 * 24));
    if (days_left === 1) {
        return (
            <div className="deadline">
                <label>Deadline: <span>{days_left} day left!</span></label>
                <DatePicker showIcon placeholderText="Select a date" selected={selectedDate} onChange={(date) => { setSelectedDate(date); handleDate(date) }} dateFormat='dd/MM/yyyy' minDate={new Date().setDate(new Date().getDate() + 1)} maxDate={new Date().setDate(new Date().getDate() + 30)} />
            </div>
        )
    } else {
        return (
            <div className="deadline">
                <label>Deadline: <span>{days_left} days left!</span></label>
                <DatePicker showIcon placeholderText="Select a date" selected={selectedDate} onChange={(date) => { setSelectedDate(date); handleDate(date) }} dateFormat='dd/MM/yyyy' minDate={new Date().setDate(new Date().getDate() + 1)} maxDate={new Date().setDate(new Date().getDate() + 30)} />
            </div>
        )
    }
}
export default ReactDatePicker;
