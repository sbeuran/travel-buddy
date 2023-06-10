import styled from 'styled-components';
import DistanceImg from '../../assets/images/distance.svg';
import DotsImg from '../../assets/images/dots.svg';

export const Container = styled.div`
`

export const CityContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 92px;
`;

export const Location = styled.div`
    display: flex;
    align-items: center;
`;

export const CityName = styled.div`
    margin-left: 16px;
`;

export const DistanceConatiner = styled.div`
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-right: 90px;
`;

export const Distance = styled.div`
    background-image: url(${DistanceImg});
    background-repeat: round;
    padding: 5px;
    color: #7786D2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
`;
    
export const Dots = styled.div`
    background-image: url(${DotsImg});
    background-size: cover;
    background-repeat: round;
    width: 20px;
    height: 20px;
`