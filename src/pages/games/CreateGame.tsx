import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame, getUnityContents, uploadLocationImage } from '../../services/api';

interface UnityContent {
  id: string;
  name: string;
}

const CreateGame: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [history, setHistory] = useState<string>('');
  const [rules, setRules] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [unityContentId, setUnityContentId] = useState<string>('');
  const [unityContents, setUnityContents] = useState<UnityContent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnityContents = async () => {
      try {
        const data = await getUnityContents();
        setUnityContents(data);
      } catch (error) {
        console.error('Failed to fetch unity contents:', error);
      }
    };

    fetchUnityContents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const gameData = {
        name,
        description,
        history,
        rules,
        imageURL: '', // 이미지 업로드 후 URL을 설정
        unityContentId
      };
      const createdGame = await createGame(gameData);

      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        await uploadLocationImage(createdGame.id, formData);
      }

      alert('Game created successfully!');
      navigate('/games');
    } catch (error) {
      console.error('Failed to create game:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Game</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="history">History</label>
        <textarea
          id="history"
          value={history}
          onChange={(e) => setHistory(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="rules">Rules</label>
        <textarea
          id="rules"
          value={rules}
          onChange={(e) => setRules(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="unityContent">Unity Content</label>
        <select
          id="unityContent"
          value={unityContentId}
          onChange={(e) => setUnityContentId(e.target.value)}
        >
          <option value="">Select Unity Content</option>
          {unityContents.map(content => (
            <option key={content.id} value={content.id}>
              {content.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Game'}
      </button>
    </form>
  );
};

export default CreateGame;
