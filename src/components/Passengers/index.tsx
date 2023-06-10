import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'
import { 
    Container,
    Label,
    Select,
    Button,
    Number,
    ErrorText
} from './styled';

interface PassengersProps {
    value: string,
    onChange: any,
}

function Passengers (props: PassengersProps) {
    const { value, onChange } = props;
    const [error, setError] = useState(false);

    const onChangeNum = (increase: boolean) => {
        if (increase) {
            const count = value ? parseInt(value) : 0; 
            onChange((count + 1).toString())
            setError(false)
        } else {
            if (value && parseInt(value) > 0) {
                onChange((parseInt(value) - 1).toString())
            } else {
                setError(true)
            }

        }
    }

    return (
        <Container>
            <Label>Passengers</Label>
            <Select error={error}>
                <Button onClick={() => onChangeNum(false)}><FaMinus /></Button>
                <Number>{value ? value : 0}</Number>
                <Button onClick={() => onChangeNum(true)}><FaPlus /></Button>
            </Select>
            <ErrorText error={error}>Select passengers</ErrorText>
        </Container>
    );
}

export default Passengers;