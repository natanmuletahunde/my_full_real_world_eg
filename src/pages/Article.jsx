import React from 'react';
import { ArticleMeta, ArticleComments } from '../components';
import { useArticleQuery } from '../hooks';

function Article() {
  const { data, isLoading, error } = useArticleQuery();

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    // @ts-ignore
    return <div>Error: {error.message}</div>;
  }

  // Safely access article data
  const article = data?.article || {};
  const { title = '', description = '', body = '' } = article;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{title}</h1>
          <ArticleMeta 
// @ts-ignore
          article={article} />
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{description}</p>
            <p>{body}</p>
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <ArticleMeta 
// @ts-ignore
          article={article} />
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <ArticleComments />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
