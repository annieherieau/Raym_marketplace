import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildRequestOptions } from '../app/api';
import CreateComment from '../pages/CreateComment'; // Assure-toi que le chemin est correct

const Comments = ({ productId, isLoggedIn, token, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchComments();
  }, [productId]);

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
      {isLoggedIn && <CreateComment productId={productId} token={token} onCommentCreated={fetchComments} />}
    </div>
  );
};

export default Comments;
