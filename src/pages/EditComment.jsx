import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom } from '../app/atoms';
import { buildRequestOptions } from '../app/api';
import CommentForm from '../components/CommentForm';

const EditComment = ({ productId, commentId, token, onCancel, onCommentEdited }) => {
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComment = async () => {
      const { url, options } = buildRequestOptions('comments', 'show', { id: commentId });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch comment');
        }
        const data = await response.json();
        setComment(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComment();
  }, [commentId]);

  const handleSubmit = async (id, commentData) => {
    const { url, options } = buildRequestOptions('comments', 'update', {
      id: commentId,
      body: commentData,
      token,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
      navigate(`/product/${productId}`);
      onCommentEdited();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Edit Comment</h2>
      {comment && (
        <CommentForm
          comment={comment}
          onSubmit={handleSubmit}
          productId={Number(productId)}
          token={token}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};

export default EditComment;
