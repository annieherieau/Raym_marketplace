import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildRequestOptions } from '../app/api';
import CreateComment from '../pages/CreateComment'; // Assure-toi que le chemin est correct
import StarRating from '../components/StarRating'; // Assure-toi que le chemin est correct

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
    <div className="max-w-3xl mx-auto p-6 bg-black shadow-md rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-green-400">Comments</h3>
      <ul className="space-y-4">
        {comments.map(comment => (
          <li key={comment.id} className="border-b pb-4">
            <p className="text-gray-100">{comment.content}</p>
            <StarRating rating={comment.rating} onRatingChange={() => {}} />
            {comment.user && <p className="text-gray-100">By: {comment.user.email}</p>}
            {isLoggedIn && currentUser && comment.user_id === currentUser.id && (
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEditClick(comment.id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {isLoggedIn && (
        <div className="mt-6">
          <CreateComment productId={productId} token={token} onCommentCreated={fetchComments} />
        </div>
      )}
    </div>
  );
};

export default Comments;
