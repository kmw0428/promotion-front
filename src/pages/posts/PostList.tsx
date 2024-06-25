import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByBoardId, getBoardById } from '../../services/api';
import { Link } from 'react-router-dom';

const PostList: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [posts, setPosts] = useState<{ id: string; title: string; content: string; createDate: string }[]>([]);
  const [boardName, setBoardName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostsAndBoard = async () => {
      try {
        if (boardId) {
          const [postsData, boardData] = await Promise.all([
            getPostsByBoardId(boardId),
            getBoardById(boardId),
          ]);
          setPosts(postsData);
          setBoardName(boardData.name);
        }
      } catch (error) {
        console.error('Failed to fetch posts or board:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndBoard();
  }, [boardId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{boardName}</h1>
      <Link to={`/boards/${boardId}/create-post`}>Create New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <p>{post.content}</p>
            <p>{new Date(post.createDate).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
