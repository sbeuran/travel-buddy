import styled from 'styled-components';

interface ErrorProps {
    error: boolean;
}

export const Container = styled.div`
    margin-bottom: 8px;
    margin-right: 16px;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

export const Label = styled.div`
    margin-bottom: 4px;
`;

export const Select = styled.div<ErrorProps>`
    display: flex;
    align-items: center;
    border: 1px solid ${props => !props.error ? '#E5E7EB': '#FF0000'};
    padding: 8px;
    border-radius: 6px;
`;

export const ErrorText = styled.div<ErrorProps>`
    display: ${props => !props.error ? 'none': 'block'};
    color: #FF0000;
`;

export const Button = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background-color: #C7D1F4;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #7786D2;
    }
`;

export const Number = styled.span`
    margin: 0 8px;
    text-align: center;
    width: 24px;
`;