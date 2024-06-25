import React, { useEffect, useState } from 'react';
import { getLocations } from '../../services/api';
import { Link } from 'react-router-dom';

interface Location {
  id: string;
  name: string;
  description: string;
  imageURL: string;
}

const LocationList: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Location List</h1>
      <Link to={'create'}>Create New Location</Link>
      <ul>
        {locations.map(location => (
          <li key={location.id}>
            <h2>{location.name}</h2>
            <p>{location.description}</p>
            {location.imageURL && <img src={`http://localhost:5678${location.imageURL}`} alt={location.name} width="200" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
