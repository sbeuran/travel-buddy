import React, { useState, useEffect, useRef } from 'react';
import { MdPanoramaFishEye, MdAddCircleOutline, MdOutlineLocationOn, MdOutlineCancel } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { 
    Container,
    Location,
    Path,
    SelectContainer,
    SelectContent,
    SelectMainContent,
    CancelButton,
    Label,
    SelectError,
    SearchContent,
    Input,
    CancelSearch,
    OptionContainer,
    Option,
    Triangle
} from './styled';
import { CITIES } from '../../constants/const';

interface InputProps {
    label: string
    selectedIndexes?: Array<number>
    onChange: any
    onRemove?: any
    value: string
    origin: boolean
    dest: boolean
}

interface OptionProps {
    value: number
    label: string | number
    disabled: boolean
}

function SelectCity (props: InputProps) {
    const { label, selectedIndexes, onChange, value, origin, dest, onRemove } = props;
    const [showOptions, setShowOptions] = useState(false);
    const [error, setError] = useState(false);
    const [searchKey, setSearchKey] = useState<any>();
    const [filterOptions, setFilterOptions] = useState<OptionProps[]>([]);

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

    const onSelect = (index: number) => {
        const selectedCityName = CITIES[index][0];
        setSearchKey(selectedCityName);
        setShowOptions(false);
        setError(false);
        onChange(selectedCityName);
    }

    const onCancelSearch = () => {
        setSearchKey('');
        setShowOptions(true);
        onChange('')
    }

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKey(event.target.value);
        if (event.target.value) {
            setError(false);
        } else {
            setError(true);
        }
    }

    useEffect(() => {
        const options = CITIES.map((city, index) => {
            return {
                value: index,
                label: city[0],
                disabled: !!selectedIndexes && selectedIndexes.indexOf(index) > 0
            }
        })
        if (searchKey) {
            const newFilterOptions = options.filter(option => option.label.toString().toLocaleLowerCase().indexOf(searchKey.toLocaleLowerCase()) > -1);
            setFilterOptions(newFilterOptions);
        } else {
            setFilterOptions(options);
        }
    }, [searchKey]);

    useEffect(() => {
        setSearchKey(value)
    }, [value])

    return (
        <Container>
            <Location>
                {
                    !origin && <Path />
                }
                {
                    dest
                        ? <MdOutlineLocationOn color='red' size={20} />
                        : <MdPanoramaFishEye />
                }
            </Location>
            <SelectContainer>
                <SelectContent>
                    <Label>{label}</Label>
                    <SelectMainContent>
                        <SearchContent>
                            <Input 
                                onFocus={() => setShowOptions(true)}
                                value={searchKey}
                                onChange={onChangeValue} />
                            <CancelSearch 
                                isshown={!!searchKey}
                                onClick={onCancelSearch}>
                                <RxCross1 />
                            </CancelSearch>
                        </SearchContent>
                        <OptionContainer ref={wrapperRef} isshown={showOptions}>
                            <Triangle />
                            {
                                filterOptions.length > 0 && filterOptions.map((option, index) => 
                                    <Option key={index} onClick={() => onSelect(option.value)}>
                                        {option.label}
                                    </Option>
                                )
                            }
                        </OptionContainer>
                    </SelectMainContent>
                    <SelectError isshown={error}>
                        {
                            error && "You must choose the city of origin"
                        }
                    </SelectError>
                </SelectContent>
                <CancelButton isshown={origin} onClick={onRemove}><MdOutlineCancel /></CancelButton>
            </SelectContainer>
        </Container>
    );
}

export default SelectCity;