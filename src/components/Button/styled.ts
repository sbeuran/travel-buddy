import styled from 'styled-components';

export const BaseButton = styled.button`
    background-color: #374151;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    font-family: InterFont;

    &:disabled {
        background-color: #E5E7EB;
    }
`