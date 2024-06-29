import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

const CommentForm = ({ comment, onSubmit, onCancel }) => {
  const [content, setContent] = useState(comment ? comment.content : '');
  const [rating, setRating] = useState(comment ? comment.rating : 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = { content, rating };
    onSubmit(comment ? comment.id : null, commentData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-black shadow-md rounded-lg">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full p-2 mb-2 bg-gray-700 text-white rounded resize-none"
        placeholder={comment ? "Modifier votre commentaire..." : "Écrire un commentaire..."}
      />
      <div className="flex items-center mb-2">
        <span className="mr-2 text-white">Note :</span>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-green-400 hover:bg-green-600 text-gray-900 font-bold py-2 px-4 rounded"
        >
          {comment ? 'Éditer le commentaire' : 'Créer un commentaire'}
        </button>
        {comment && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            Annuler
          </button>
        )}
      </div>
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
  onCancel: PropTypes.func,
};

export default CommentForm;
