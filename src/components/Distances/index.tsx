import React, { useState, useEffect } from 'react';
import { Container } from './styled';

interface DistancesProps {
    cities: Array<string>
    distances: Array<number>
}

function Distances (props: DistancesProps) {
    const { cities, distances } = props;

    return (
        <Container>
            
        </Container>
    );
}

export default Distances;