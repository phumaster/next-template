import React from 'react';
import classNames from 'classnames';

import routeNames from '@/config/routeNames'
import { Link, Router } from '@/routes'
import { StoreTypes } from '@/base/store'
import { isServer } from '@/utils/helper'
import { getHomeData, HomeState } from './index'

import styles from './home.scss'

function Home({ fetching, data, error }: HomeState) {
  const { results = null } = data || {};
  const [user = null] = results || [];
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

Home.getInitialProps = async ({ reduxStore }: {reduxStore: StoreTypes}) => {
  if (isServer()) {
    await reduxStore.dispatch(getHomeData());
  } else {
    reduxStore.dispatch(getHomeData());
  }
  return {}
}

export default Home;
