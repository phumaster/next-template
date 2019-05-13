import React from 'react';
import classNames from 'classnames';

import { Link, Router } from '@/routes';
import routeNames from '@/config/routeNames';
import { isServer } from '@/utils/helper';
import { actions } from './index';
import styles from './home.scss';

function Home({ fetching, data, error }) {
  const { results } = data || {};
  const [user] = results || [];
  const homeClasses: any = classNames(styles.bg, styles.txt);
  const navigateToArticle: any = () => Router.pushRoute(routeNames.HOME, {id: 456}, {shallow: true});
  // shallow route is not running getInitialProps of this page
  return (
    <div>
      <div className={homeClasses}>
      <Link route={routeNames.ARTICLE} params={{id: 123, what: 1, the: 2, hell: 3}}><a>Click here</a></Link>
      <div>
        <a href="#qqq" onClick={navigateToArticle}>Push shallow to home</a>
      </div>
      </div>
      <p>Fetching: {fetching ? 'true' : 'false'}</p>
      <p>Error: {error ? 'true' : 'false'}</p>
      <p>User: {JSON.stringify(user) || 'no-data'}</p>
    </div>
  );
}

Home.getInitialProps = async ({ reduxStore }) => {
  if (isServer()) {
    await reduxStore.dispatch(actions.getHomeData());
  } else {
    reduxStore.dispatch(actions.getHomeData());
  }
  return {
    name: 'phu',
  };
};

export default Home;
