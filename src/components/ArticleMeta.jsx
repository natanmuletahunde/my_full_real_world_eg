import React from 'react';
import { Link } from 'react-router-dom';
import { useArticleQuery, useAuth } from '../hooks';
import DeleteArticleButton from './DeleteArticleButton';
import FavoriteArticleButton from './FavoriteArticleButton';
import FollowAuthorButton from './FollowAuthorButton';

function ArticleMeta() {
  const { data } = useArticleQuery();
  const { authUser } = useAuth();

  // Ensure data is defined and provide default values
  const article = data?.article || {};
  const {
    author = {},
    createdAt = '',
    favorited = false,
    favoritesCount = 0,
    slug = ''
  } = article;
  
  const { username = '', image = '' } = author;
  const canUpdate = authUser?.username === username;

  return (
    <div className="article-meta">
      <Link to={`/profile/${username}`}>
        <img src={image} alt={`${username}'s profile`} />
      </Link>
      <div className="info">
        <Link to={`/profile/${username}`} className="author">
          {username}
        </Link>
        <span className="date">{new Date(createdAt).toDateString()}</span>
      </div>
      <div className="actions">
        {canUpdate ? (
          <>
            <Link className="btn btn-outline-secondary btn-sm" to={`/editor/${slug}`}>
              <i className="ion-edit" /> Edit Article
            </Link>
            &nbsp;&nbsp;
            <DeleteArticleButton />
          </>
        ) : (
          <>
            <FollowAuthorButton />
            &nbsp;&nbsp;
            <FavoriteArticleButton slug={slug} favorited={favorited}>
              {favorited ? 'Unfavorite' : 'Favorite'} Article <span className="counter">({favoritesCount})</span>
            </FavoriteArticleButton>
          </>
        )}
      </div>
    </div>
  );
}

export default ArticleMeta;
