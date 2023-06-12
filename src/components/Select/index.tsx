import React, { useState, useEffect, useRef } from 'react';
import { Container, OptionContainer, Select, Option, Triangle } from './styled';

interface SelectProps {
    value: string | number,
    options: Array<string | number>
    onChange: any
}

function SelectComponent (props: SelectProps) {
    const { value, options, onChange } = props;
    const [showOptions, setShowOptions] = useState(false);

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowOptions(false);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }
      
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const onSelect = (option: string | number) => {
        setShowOptions(false);
        onChange(option);
    }

    return (
        <Container>
            <Select onClick={() => setShowOptions(true)}>{value}</Select>
            <OptionContainer ref={wrapperRef} isshown={showOptions}>
                <Triangle />
                {
                    options.map((option, index) =>
                        <Option key={index} onClick={() => onSelect(options.indexOf(option))}>{option}</Option>
                    )
                }
            </OptionContainer>
        </Container>
    );
}

export default SelectComponent;