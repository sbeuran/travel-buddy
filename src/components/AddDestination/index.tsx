import React from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { AddTitle, Container, Location } from './styled';

interface Props {
    onClick: any
}

function AddDestination (props: Props) {
    const { onClick } = props;

    return (
        <Container onClick={onClick}>
            <Location><IoAddCircleOutline /></Location>
            <AddTitle>Add destination</AddTitle>
        </Container>
    );
}

export default AddDestination;