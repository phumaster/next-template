import App, { Container } from 'next/app';
import { Provider } from 'react-redux';

import { isServer } from '@/utils/helper';
import withReduxStore from '@/utils/hocs/withReduxStore';

import '@/shared/css/_app.scss'; // fix bug css module: https://github.com/zeit/next.js/issues/5598#issuecomment-437619043

class MyApp extends App<any, any> {
  componentDidMount() {
    if (isServer() || process.env.NODE_ENV === 'development' || !Boolean(+process.env.SERVICE_WORKER_ENABLE!)) return;
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }
  }
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp);
