import classNames from 'classnames';
import React from 'react';
import { ArticleList, PopularTags } from '../components';
import { useAuth } from '../hooks';

const initialFilters = { tag: '', offset: null, feed: false };

function Home() {
  const { isAuth } = useAuth();
 
  const [filters, setFilters] = React.useState({
    ...initialFilters,
    feed: isAuth
  });

  // Update filters when authentication status changes
  React.useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      feed: isAuth
    }));
  }, [isAuth]);

  // Handle tag click
  function onTagClick(tag) {
    setFilters({
      ...initialFilters,
      tag
    });
  }

  // Handle global feed button click
  function onGlobalFeedClick() {
    setFilters(initialFilters);
  }

  // Handle user feed button click
  function onFeedClick() {
    setFilters({
      ...initialFilters,
      feed: true
    });
  }

  // Determine active class based on filters
  const globalFeedActive = !filters?.tag && !filters.feed;
  const yourFeedActive = filters.feed;

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {isAuth && (
                  <li className="nav-item">
                    <button
                      onClick={onFeedClick}
                      type="button"
                      className={classNames('nav-link', { active: yourFeedActive })}
                    >
                      Your Feed
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    type="button"
                    className={classNames('nav-link', { active: globalFeedActive })}
                    onClick={onGlobalFeedClick}
                  >
                    Global Feed
                  </button>
                </li>
                {filters?.tag && (
                  <li className="nav-item">
                    <a className="nav-link active"># {filters.tag}</a>
                  </li>
                )}
              </ul>
            </div>
            <ArticleList filters={filters} />
          </div>
          <div className="col-md-3">
            <PopularTags onTagClick={onTagClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
