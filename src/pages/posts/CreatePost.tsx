import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPost, getBoardById } from '../../services/api';

const CreatePost: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [boardName, setBoardName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        if (boardId) {
          const boardData = await getBoardById(boardId);
          setBoardName(boardData.name);
        }
      } catch (error) {
        console.error('Failed to fetch board:', error);
      }
    };

    fetchBoard();
  }, [boardId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (boardId) {
        const newPost = {
          board: { id: boardId },
          title,
          content,
          createDate: new Date().toISOString()
        };
        await createPost(newPost);
        alert('Post created successfully!');
        navigate(`/boards/${boardId}/posts`);
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!boardId) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post in {boardName} 게시판</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
};

export default CreatePost;
