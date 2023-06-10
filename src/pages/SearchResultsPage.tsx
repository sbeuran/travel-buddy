import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CITIES } from '../constants/const';

function SearchResultsPage() {
  const location = useLocation();

  const [origin, setOrigin] = useState('');
  const [intermediateCities, setIntermediateCities] = useState<string[]>([]);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('');

  const [distance, setDistance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setOrigin(searchParams.get('origin') || '');
    setDestination(searchParams.get('destination') || '');
    const intermediateCitiesStr = searchParams.get('intermediateCities');
    if (intermediateCitiesStr) {
      setIntermediateCities(intermediateCitiesStr.split(','));
    } else {
      setIntermediateCities([]);
    }
    setDate(searchParams.get('date') || '');
    setPassengers(searchParams.get('passengers') || '');
    // Retrieve and set other form data from URL parameters
  }, [location]);

  useEffect(() => {
    calculateDistance();
  }, [origin, destination]);

  const calculateDistance = () => {
    if (!origin || !destination) {
      return;
    }
    setLoading(true);
    setError(false);

    // Simulate asynchronous distance calculation
    setTimeout(() => {
      try {
        const cityCoordinates: { [key: string]: { lat: number; lon: number } } = CITIES.reduce(
          (coords, [name, lat, lon]) => {
            coords[name] = { lat: parseFloat(lat.toString()), lon: parseFloat(lon.toString()) };
            return coords;
          },
          {} as { [key: string]: { lat: number; lon: number } }
        );

        const route = [origin, ...intermediateCities, destination];
        let totalDistance = 0;

        for (let i = 0; i < route.length - 1; i++) {
          const startCity = route[i];
          const endCity = route[i + 1];

          const startCoord = cityCoordinates[startCity];
          const endCoord = cityCoordinates[endCity];

          if (!startCoord || !endCoord) {
            throw new Error('Invalid cities for distance calculation');
          }

          const distance = calculateHaversineDistance(startCoord, endCoord);
          totalDistance += distance;
        }

        setDistance(totalDistance.toFixed(2));
        setLoading(false);
      } catch (error) {
        console.log(error)
        setDistance('');
        setLoading(false);
        setError(true);
      }
    }, 500);
  };

  const calculateHaversineDistance = (startCoord: { lat: number; lon: number }, endCoord: { lat: number; lon: number }) => {
    const earthRadius = 6371; // in kilometers

    const toRadians = (degrees: number) => {
      return (degrees * Math.PI) / 180;
    };

    const dLat = toRadians(endCoord.lat - startCoord.lat);
    const dLon = toRadians(endCoord.lon - startCoord.lon);

    const lat1 = toRadians(startCoord.lat);
    const lat2 = toRadians(endCoord.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  };

  return (
    <div className='page'>
      <h2>Search Results</h2>

      <p>Origin: {origin}</p>
      <p>Intermediate Cities: {intermediateCities.join(', ')}</p>
      <p>Destination: {destination}</p>
      <p>Date: {date}</p>
      <p>Passengers: {passengers}</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error ? (
            <p>Error occurred while calculating distance.</p>
          ) : (
            <p>Total Distance: {distance} km</p>
          )}
        </>
      )}
    </div>
  );
}

export default SearchResultsPage;
