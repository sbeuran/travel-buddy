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

    return (
        <Container>
            <Label>Passengers</Label>
            <Select error={false}>
                <Button></Button>
                <Number>{value}</Number>
                <Button></Button>
            </Select>
            <ErrorText error={false}>Select passengers</ErrorText>
        </Container>
    );
}

export default Passengers;