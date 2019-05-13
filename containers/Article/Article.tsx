import * as React from 'react';
import { withRouter } from 'next/router';

import configs from '@/config';
import { Link } from '@/routes';
import routeNames from '@/config/routeNames';
import styles from './article.scss';

interface Props {

}

class Article extends React.Component<Props, {}> {
  static getInitialProps = ({ query }) => {
    console.log(2, query);
    console.log('isServer: ', typeof window === 'undefined');
    return {};
  }
  componentDidMount() {
    console.log('didMount');
  }
  render() {
    console.log(1, this.props);
    return (
      <div className={styles.text}>
        {configs.ENV}
        <Link route={routeNames.HOME}><a>Click here</a></Link>
      </div>
    );
  }
}

export default withRouter(
  Article
);
