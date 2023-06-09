import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { CITIES } from '../constants/const';

interface InputProps {
    label: string
    selectedIndexes: Array<number>
    onChange: any
    value: number
}

function SelectCity (props: InputProps) {
    const { label, selectedIndexes, onChange, value } = props;
    const options = CITIES.map((city, index) => {
        return {
            value: index,
            label: city[0],
            disabled: selectedIndexes.indexOf(index) > 0
        }
    });

    return (
        <div className='select'>
            <label>{label}</label>
            <Select options={options} onChange={onChange} isMulti />
            <p className='select-error'>
                {
                    value > -1 && <p>You must choose the city of origin</p>
                }
            </p>
        </div>
    );
}

export default SelectCity;