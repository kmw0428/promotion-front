import React, { useEffect, useState } from 'react';
import { getGames } from '../../services/api';
import { Link } from 'react-router-dom';

interface Game {
  id: string;
  name: string;
  description: string;
  history: string;
  rules: string;
  imageURL: string;
  unityContentId: string;
}

const GameList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Game List</h1>
      <Link to={'create'}>Create New Location</Link>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <p>{game.history}</p>
            <p>{game.rules}</p>
            {game.imageURL && <img src={game.imageURL} alt={game.name} width="200" />}
            {game.unityContentId && <a href={`/webgl/${game.unityContentId}/index.html`} target="_blank" rel="noopener noreferrer">Play Game</a>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
