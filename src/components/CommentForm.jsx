import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CommentForm = ({ comment, onSubmit, productId, token }) => {
  const [content, setContent] = useState(comment ? comment.content : '');
  const [rating, setRating] = useState(comment ? comment.rating : 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = { content, rating };

    onSubmit(comment ? comment.id : null, commentData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <div>
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))} required>
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <button type="submit">{comment ? 'Update' : 'Create'} Comment</button>
    </form>
  );
};

CommentForm.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    rating: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
  productId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

export default CommentForm;
