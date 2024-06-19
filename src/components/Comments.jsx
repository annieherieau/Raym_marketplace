import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildRequestOptions } from '../app/api';

const Comments = ({ productId, isLoggedIn, token, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      const { url, options } = buildRequestOptions('products', 'fetch_comments', { id: productId });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchComments();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { url, options } = buildRequestOptions('products', 'create_comment', {
      id: productId,
      body: { content, rating },
      token,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to post comment');
      }
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setContent('');
      setRating(1);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (commentId, updatedContent, updatedRating) => {
    const { url, options } = buildRequestOptions('comments', 'update', {
      id: commentId,
      body: { content: updatedContent, rating: updatedRating },
      token,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
      const updatedComment = await response.json();
      setComments(comments.map(comment => (comment.id === commentId ? updatedComment : comment)));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (commentId) => {
    const { url, options } = buildRequestOptions('comments', 'delete', {
      id: commentId,
      token,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditClick = (commentId) => {
    navigate(`/products/${productId}/comments/${commentId}/edit`);
  };

  const handleCreateClick = () => {
    navigate(`/products/${productId}/comments/new`);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <p>Rating: {comment.rating}</p>
            {comment.user && <p>By: {comment.user.email}</p>}
            {isLoggedIn && currentUser && comment.user_id === currentUser.id && (
              <div>
                <button onClick={() => handleEditClick(comment.id)}>Edit</button>
                <button onClick={() => handleDelete(comment.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Content:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div>
            <label>Rating:</label>
            <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
              {[1, 2, 3, 4, 5].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <button type="submit">Add Comment</button>
        </form>
      )}
      {isLoggedIn && <button onClick={handleCreateClick}>Create New Comment</button>}
    </div>
  );
};

export default Comments;
