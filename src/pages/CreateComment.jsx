import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom } from '../app/atoms';
import { buildRequestOptions } from '../app/api';
import CommentForm from './CommentForm';

const CreateComment = () => {
  const { productId } = useParams();
  const { token } = useAtomValue(userAtom);
  const navigate = useNavigate();

  const handleSubmit = async (id, commentData) => {
    const { url, options } = buildRequestOptions('products', 'create_comment', {
      id: Number(productId),
      body: commentData,
      token,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to create comment');
      }
      navigate(`/product/${productId}`);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div>
      <h2>Create Comment</h2>
      <CommentForm onSubmit={handleSubmit} productId={Number(productId)} token={token} />
    </div>
  );
};

export default CreateComment;
