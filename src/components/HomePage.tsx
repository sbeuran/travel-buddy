import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const cities = [
  ['Paris', 48.856614, 2.352222],
  ['Marseille', 43.296482, 5.369780],
  ['Lyon', 45.764043, 4.835659],
  ['Toulouse', 43.604652, 1.444209],
  ['Nice', 43.710173, 7.261953],
  ['Nantes', 47.218371, -1.553621],
  ['Strasbourg', 48.573405, 7.752111],
  ['Montpellier', 43.610769, 3.876716],
  ['Bordeaux', 44.837789, -0.579180],
  ['Lille', 50.629250, 3.057256],
  ['Rennes', 48.117266, -1.677793],
  ['Reims', 49.258329, 4.031696],
  ['Le Havre', 49.494370, 0.107929],
  ['Saint-Étienne', 45.439695, 4.387178],
  ['Toulon', 43.124228, 5.928000],
  ['Angers', 47.478419, -0.563166],
  ['Grenoble', 45.188529, 5.724524],
  ['Dijon', 47.322047, 5.041480],
  ['Nîmes', 43.836699, 4.360054],
  ['Aix-en-Provence', 43.529742, 5.447427],
];


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
    return cities
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
    // Set other form data in URL parameters

    navigate(`/search-results?${searchParams.toString()}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="origin">City of Origin:</label>
        <input
          id="origin"
          type="text"
          value={origin}
          onChange={handleOriginChange}
          required
        />

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

        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default HomePage;
