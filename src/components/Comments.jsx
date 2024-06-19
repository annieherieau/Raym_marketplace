import React, { useState, useEffect } from 'react';
import { buildRequestOptions } from '../app/api';

const Comments = ({ productId, isLoggedIn, token }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState(null);

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
    </div>
  );
};

export default Comments;
