import React, { useEffect, useState } from 'react';
import { getBoards } from '../../services/api';
import { Link } from 'react-router-dom';

const BoardList: React.FC = () => {
  const [boards, setBoards] = useState<{ id: string; name: string; description: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await getBoards();
        setBoards(data);
      } catch (error) {
        console.error('Failed to fetch boards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Board List</h1>
      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            <Link to={`/boards/${board.id}/posts`}>{board.name}</Link>
            <p>{board.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
