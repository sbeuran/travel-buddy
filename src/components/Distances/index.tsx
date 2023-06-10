import React, { useState, useEffect } from 'react';
import { MdPanoramaFishEye, MdOutlineLocationOn } from 'react-icons/md';
import { CityContainer, CityName, Container, Distance, DistanceConatiner, Dots, Location } from './styled';

interface DistancesProps {
    cities: Array<string>
    distances: Array<number>
}

function Distances (props: DistancesProps) {
    const { cities, distances } = props;
    console.log(distances)

    return (
        <Container>
            {
                cities.map((city, index) => 
                    <>
                        {
                            index > 0 &&
                                <DistanceConatiner>
                                    <Distance>{distances[index - 1].toFixed(2)} km</Distance>
                                    <Dots></Dots>
                                </DistanceConatiner>
                        }
                        <CityContainer>
                            <Location>
                                {
                                    index === cities.length - 1
                                        ? <MdOutlineLocationOn color='red' size={24} />
                                        : <MdPanoramaFishEye size={20} />
                                }
                            </Location>
                            <CityName>{city}</CityName>
                        </CityContainer>
                    </>
                )
            }
        </Container>
    );
}

export default Distances;