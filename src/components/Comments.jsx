import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildRequestOptions } from '../app/api';
import CreateComment from '../pages/CreateComment';
import EditComment from '../pages/EditComment';
import StarRating from '../components/StarRating';
import { userAtom, isAuthAtom } from "../app/atoms";
import { useAtomValue } from "jotai";

const Comments = ({ productId, token }) => {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editCommentId, setEditCommentId] = useState(null);
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
      console.error("Error fetching comments:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [productId]);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      const { url, options } = buildRequestOptions(null, 'admin_check', { token: user.token });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to check admin status");
        }

        const data = await response.json();
        setIsAdmin(data.admin);
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStatus();
  }, [isLoggedIn, user.token]);

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
      console.error("Error deleting comment:", error);
      setError(error.message);
    }
  };

  const handleEditClick = (commentId) => {
    setEditCommentId(commentId);
  };

  const handleEditSubmit = async (id) => {

      await fetchComments();
      setEditCommentId(null);
      navigate(`/product/${productId}`);
      console.error("Error editing comment:", error);
      setError(error.message);
  };

  const userHasCommented = comments.some(comment => comment.user_id === user.id);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black shadow-md rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-green-400">Commentaires</h3>
      <ul className="space-y-4">
        {comments.map(comment => (
          <li key={comment.id} className="border-b pb-4">
            {editCommentId === comment.id ? (
              <EditComment
                productId={productId}
                commentId={comment.id}
                token={token}
                onCancel={() => setEditCommentId(null)}
                onCommentEdited={handleEditSubmit}
              />
            ) : (
              <>
                <p className="text-gray-100">{comment.content}</p>
                <StarRating rating={comment.rating} onRatingChange={() => {}} />
                {comment.user && <p className="text-gray-100">Par : {comment.user.first_name ? comment.user.first_name : 'utilisateur anonyme'}</p>}
                {isLoggedIn && (
                  <div className="mt-2 space-x-2">
                    {comment.user_id === user.id && (
                      <button
                        onClick={() => handleEditClick(comment.id)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Éditer
                      </button>
                    )}
                    {(comment.user_id === user.id || isAdmin) && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      {isLoggedIn && !userHasCommented && (
        <div className="mt-6">
          <CreateComment productId={productId} token={token} onCommentCreated={fetchComments} />
        </div>
      )}
    </div>
  );
};

export default Comments;
