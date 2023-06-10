import styled from "styled-components";

interface ShowProps {
    isshown: boolean
}

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: start;
    margin-bottom: 8px
`;

export const Location = styled.div`
    width: 80px;
    height: 30px;
    margin-top: 22px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SelectContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const SelectContent = styled.div`
    width: 240px;
`;

export const CancelButton = styled.div<ShowProps>`
    width: 60px;
    height: 30px;
    font-size: 16px;
    margin-top: 4px;
    display: ${props => !props.isshown ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    color: #7786D2;
`;

export const Label = styled.div`
    margin-bottom: 4px;
`;

export const SelectError = styled.div<ShowProps>`
    color: #FF0000;
    height: ${props => !props.isshown ? '16px' : 'none'};
`;

export const SelectMainContent = styled.div`
    position: relative;
`

export const SearchContent = styled.div`
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    padding: 8px 12px 8px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Input = styled.input`
    border: none;
    flex: 1;
    &:focus-visible {
        outline: none;
    }
`;

export const CancelSearch = styled.div<ShowProps>`
    display: ${props => props.isshown ? 'flex' : 'none'};
    color: #7786D2;
    justify-content: center;
    font-size: 16px;
`;

export const OptionContainer = styled.div<ShowProps>`
    position: absolute;
    top: calc(100% + 8px);
    width: calc(100% - 12px);
    display: ${props => props.isshown ? 'flex' : 'none'};
    flex-direction: column;
    background-color: #FFFFFF;
    border: 1px solid #C7D1F4;
    padding: 6px;
    border-radius: 8px;
    z-index: 1;
`;

export const Option = styled.div`
    padding: 6px;
    border-radius: 6px;
    &:hover {
        background-color: #C7D1F4;
    }
`;