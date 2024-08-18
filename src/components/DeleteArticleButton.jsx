/* eslint-disable no-alert */
import React from 'react';
import { useDeleteArticleMutation } from '../hooks';

function DeleteArticleButton() {
  const { mutate, isLoading, error } = useDeleteArticleMutation();

  // Function to handle deletion with confirmation
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      mutate();
    }
  };

  return (
    <div>
      <button
        disabled={isLoading}
        onClick={handleDelete}
        type="button"
        className="btn btn-outline-danger btn-sm"
        aria-label="Delete Article"
      >
        <i className="ion-trash-a" /> Delete Article
      </button>
      {error && <p className="error-message">Failed to delete article. Please try again.</p>}
    </div>
  );
}

export default DeleteArticleButton;
