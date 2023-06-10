import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import SelectCity from '../components/SelectCity';
import { CITIES } from '../constants/const';
import AddDestination from '../components/AddDestination';
import Passengers from '../components/Passengers';
import Calendar from '../components/Calendar';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [origin, setOrigin] = useState('');
  const [intermediateCities, setIntermediateCities] = useState<string[]>([]);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('');

  const [originOptions, setOriginOptions] = useState<string[]>([]);
  const [intermediateOptions, setIntermediateOptions] = useState<string[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<string[]>([]);

  const [formError, setFormError] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setOrigin(searchParams.get('origin') || '');
    // Retrieve and set other form data from URL parameters
  }, [location]);

  useEffect(() => {
    // Simulate asynchronous request for city options
    if (!origin || !destination || !date || !passengers) {
      setFormError(true);
    } else {
      setFormError(false);
    }
  }, [origin, destination, date, passengers]);

  const filterCities = (keyword: string): string[] => {
    const lowercaseKeyword = keyword.toLowerCase();
    return CITIES
      .filter(([name]) => String(name).toLowerCase().includes(lowercaseKeyword))
      .map(([name]) => String(name));
  };
  
  

  const handleOriginChange = (value: string) => {
    setOrigin(value);
  };

  const handleIntermediateChange = (index: number) => (value: string) => {
    let updatedIntermediateCities = [...intermediateCities];
    updatedIntermediateCities[index] = value;
    setIntermediateCities(updatedIntermediateCities);
  };

  const handleAddIntermediateCity = () => {
    setIntermediateCities([...intermediateCities, '']);
  };

  const handleRemoveIntermediateCity = (index: number) => {
    const updatedIntermediateCities = [...intermediateCities];
    updatedIntermediateCities.splice(index, 1);
    setIntermediateCities(updatedIntermediateCities);
  };

  const handleDestinationChange = (value: string) => {
    setDestination(value);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  const handlePassengersChange = (value: string) => {
    setPassengers(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!origin || !destination || !date || !passengers) {
      setFormError(true);
      return;
    }

    setFormError(false);

    const searchParams = new URLSearchParams();
    searchParams.set('origin', origin);
    searchParams.set('destination', destination);
    const filterIntermediateCities = intermediateCities.filter(city => city !== '');
    searchParams.set('intermediateCities', filterIntermediateCities.toString())
    searchParams.set('date', date);
    searchParams.set('passengers', passengers);
    // Set other form data in URL parameters

    navigate(`/search-results?${searchParams.toString()}`);
  };

  return (
    <div className='page'>
      <form onSubmit={handleSubmit}>
        <div className='main-container'>
          <div className='city-container'>
            <SelectCity 
              label='City of Origin' 
              origin={true}
              dest={false}
              onChange={handleOriginChange} 
              value={origin} />

            {
              intermediateCities.map((city, index) => 
                <SelectCity 
                  label='City of destination'
                  origin={false}
                  dest={index + 1 === intermediateCities.length}
                  onChange={
                    index + 1 === intermediateCities.length
                      ? handleDestinationChange
                      : handleIntermediateChange(index)
                  }
                  onRemove={() => handleRemoveIntermediateCity(index)}
                  value={city} />
              )
            }

            <AddDestination onClick={handleAddIntermediateCity} />
          </div>
          <div className='date-passengers'>
            {/* <label htmlFor="passengers">Number of Passengers:</label>
            <input
              id="passengers"
              type="number"
              min="1"
              value={passengers}
              onChange={handlePassengersChange}
              required
            /> */}
            <Passengers value={passengers} onChange={handlePassengersChange} />
            {/* <label htmlFor="date">Date of the Trip:</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={handleDateChange}
              required
            /> */}
            <Calendar value={date} onChangeDate={handleDateChange} />
          </div>
        </div>
        <Button type="submit" title='Submit' disabled={formError} onClick={() => {}}/>
      </form>
    </div>
  );
}

export default HomePage;
