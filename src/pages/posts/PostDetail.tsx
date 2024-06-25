import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../services/api';

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<{ id: string; title: string; content: string; createDate: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (postId) {
          const data = await getPostById(postId);
          setPost(data);
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{new Date(post.createDate).toLocaleString()}</p>
    </div>
  );
};

export default PostDetail;
