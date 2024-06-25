import React, { useEffect, useState } from 'react';
import { getUnityContents } from '../../services/api';
import { Link } from 'react-router-dom';

interface UnityContent {
  id: string;
  name: string;
  description: string;
  url: string;
}

const UnityContentList: React.FC = () => {
  const [unityContents, setUnityContents] = useState<UnityContent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUnityContents = async () => {
      try {
        const data = await getUnityContents();
        setUnityContents(data);
      } catch (error) {
        console.error('Failed to fetch unity contents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnityContents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Unity Content List</h1>
      <Link to={'create'}>Create New Location</Link>
      <ul>
        {unityContents.map(content => (
          <li key={content.id}>
            <h2>{content.name}</h2>
            <p>{content.description}</p>
            {content.url && <a href={content.url} target="_blank" rel="noopener noreferrer">View Content</a>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnityContentList;
