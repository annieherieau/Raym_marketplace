// CreateComment.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom } from '../app/atoms';
import { buildRequestOptions } from '../app/api';
import CommentForm from '../components/CommentForm';

const CreateComment = ({ onCommentCreated }) => {
  const { productId } = useParams();
  const { token } = useAtomValue(userAtom);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (id, commentData) => {
    const { url, options } = buildRequestOptions('products', 'create_comment', {
      id: Number(productId),
      body: commentData,
      token,
    });

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Échec de la création du commentaire');
        return;
      }

      onCommentCreated(); // Refetch les commentaires
      navigate(`/product/${productId}`);
    } catch (error) {
      console.error('Erreur de la création du commentaire:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <CommentForm onSubmit={handleSubmit} productId={Number(productId)} token={token} />
    </div>
  );
};

export default CreateComment;
