import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostsByBoardId, getBoardById } from "../../services/api";
import "./PostList.css"; // CSS 파일을 import 합니다.

const PostList: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [posts, setPosts] = useState<
    { id: string; title: string; content: string; createDate: string }[]
  >([]);
  const [boardName, setBoardName] = useState<string>("");
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
        console.error("Failed to fetch posts or board:", error);
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
    <div className="post-list-container">
      <img
        src="/mnt/data/무제-1-01.png"
        alt="Background"
        className="background-image"
      />
      <div className="content-container">
        <h1>{boardName}</h1>
        <Link
          to={`/boards/${boardId}/create-post`}
          className="create-post-link"
        >
          Create New Post
        </Link>
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <Link to={`/posts/${post.id}`} className="post-title">
                {post.title}
              </Link>
              <p className="post-content">{post.content}</p>
              <p className="post-date">
                {new Date(post.createDate).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostList;
