import styled from 'styled-components';

interface ShowProps {
    isshown: boolean
}

export const Container = styled.div`
    position: relative;
`

export const Select = styled.div`
    background-color: #C7D1F4;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #E5E7EB;
    cursor: pointer;
`;

export const OptionContainer = styled.div<ShowProps>`
    position: absolute;
    top: calc(100% + 8px);
    display: ${props => props.isshown ? 'flex' : 'none'};
    border: 1px solid #E5E7EB;
    background-color: white;
    flex-direction: column;
    padding: 4px;
    border-radius: 4px;
`;
export const Option = styled.div`
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #C7D1F4;
    }
`;

export const Triangle = styled.div`
    position: absolute;
    top: -8px;
    left: 0px;
    transform: translate(18px, 0px);
    margin-top: -8px;
    margin-left: -4px;
    width: 0;
    
    &::before {
        border-bottom-color: #C7D1F4 !important;
        top: -1px;
        border-top: none;
        box-sizing: content-box;
        position: absolute;
        border: 8px solid transparent;
        height: 0;
        width: 1px;
        content: "";
        z-index: -1;
        border-width: 8px;
        left: -8px;
    }

    &::after {
        border: none;
        top: 0;
        box-sizing: content-box;
        position: absolute;
        height: 0;
        width: 1px;
        content: "";
        z-index: -1;
    }
`;