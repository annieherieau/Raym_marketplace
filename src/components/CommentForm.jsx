import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

const CommentForm = ({ comment, onSubmit, productId, token }) => {
  const [content, setContent] = useState(comment ? comment.content : '');
  const [rating, setRating] = useState(comment ? comment.rating : 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = { content, rating };

    onSubmit(comment ? comment.id : null, commentData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-black shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-green-400 text-sm font-bold mb-2">Avis:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Rating:</label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>
      <button
        type="submit"
        className="bg-green-400 hover:bg-green-600 text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {comment ? 'Update' : 'Create'} Comment
      </button>
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
