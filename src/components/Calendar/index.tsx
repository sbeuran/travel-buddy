import React, { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { FaArrowCircleLeft, FaArrowCircleRight} from 'react-icons/fa';
import SelectComponent from '../Select';
import { 
    Container,
    Label,
    DateContainer,
    CalendarHeader,
    PrevNextMonth,
    MonthYear
} from './styled';
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from 'date-fns';

interface CalendarProps {
    value: string
    onChangeDate: any
}

function Calendar (props: CalendarProps) {
    const { value, onChangeDate } = props;
    const [startDate, setStartDate] = useState(new Date());

    const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034];
    const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
    ];

    const handleChange = (date: Date) => {
        onChangeDate(date.toDateString());
    }

    const CustomInput = forwardRef(({value, onClick}: any, ref) =>
        <DateContainer onClick={onClick} >
            {value}
        </DateContainer>
    );

    useEffect(() => {
        const date = value ? new Date(value) : new Date();
        setStartDate(date);
        onChangeDate(date.toDateString());
    }, [value])

    return (
        <Container>
            <Label>Date</Label>
            <DatePicker 
                customInput={<CustomInput />}
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                }) => 
                    <CalendarHeader>
                        <PrevNextMonth onClick={decreaseMonth} ><FaArrowCircleLeft /></PrevNextMonth>
                        <MonthYear>
                            <SelectComponent value={months[getMonth(date)]} onChange={changeMonth} options={months} />
                            <SelectComponent value={getYear(date)} onChange={changeYear} options={years} />
                        </MonthYear>
                        <PrevNextMonth onClick={increaseMonth}><FaArrowCircleRight /></PrevNextMonth>
                    </CalendarHeader>
                }
                selected={startDate} 
                onChange={handleChange}
            />
        </Container>
    );
}

export default Calendar;