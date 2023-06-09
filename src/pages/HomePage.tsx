import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import SelectCity from '../components/SelectCity';
import { CITIES } from '../constants/const';

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
    const delay = setTimeout(() => {
      setOriginOptions(filterCities(origin));
      setIntermediateOptions(filterCities(intermediateCities.join(',')));
      setDestinationOptions(filterCities(destination));
    }, 500);

    return () => clearTimeout(delay);
  }, [origin, intermediateCities, destination]);

  const filterCities = (keyword: string): string[] => {
    const lowercaseKeyword = keyword.toLowerCase();
    return CITIES
      .filter(([name]) => String(name).toLowerCase().includes(lowercaseKeyword))
      .map(([name]) => String(name));
  };
  
  

  const handleOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrigin(event.target.value);
  };

  const handleIntermediateChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedIntermediateCities = [...intermediateCities];
    updatedIntermediateCities[index] = event.target.value;
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

  const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handlePassengersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassengers(event.target.value);
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
    searchParams.set('date', date);
    searchParams.set('passengers', passengers);
    // Set other form data in URL parameters

    navigate(`/search-results?${searchParams.toString()}`);
  };

  return (
    <div className='page'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="origin">City of Origin:</label>
        <input
          id="origin"
          type="text"
          value={origin}
          onChange={handleOriginChange}
          required
        />
        {/* <SelectCity label='City of Origin' selectedIndexes={[]} onChange={() => {}} value={0}/> */}
        {intermediateCities.map((city, index) => (
          <div key={index}>
            <label htmlFor={`intermediate-${index}`}>Intermediate City {index + 1}:</label>
            <input
              id={`intermediate-${index}`}
              type="text"
              value={city}
              onChange={(event) => handleIntermediateChange(index, event)}
              required
            />
            <button type="button" onClick={() => handleRemoveIntermediateCity(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddIntermediateCity}>
          Add Intermediate City
        </button>

        <label htmlFor="destination">City of Destination:</label>
        <input
          id="destination"
          type="text"
          value={destination}
          onChange={handleDestinationChange}
          required
        />

        <label htmlFor="date">Date of the Trip:</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={handleDateChange}
          required
        />

        <label htmlFor="passengers">Number of Passengers:</label>
        <input
          id="passengers"
          type="number"
          min="1"
          value={passengers}
          onChange={handlePassengersChange}
          required
        />

        {formError && <p>Please fill in all required fields.</p>}

        <Button type="submit" title='Submit' disabled={false} onClick={() => {}}/>
      </form>
    </div>
  );
}

export default HomePage;
