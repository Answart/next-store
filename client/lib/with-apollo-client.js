import Head from 'next/head';
import cookie from 'cookie';
import { getDataFromTree } from 'react-apollo';
import initApollo from '../lib/init-apollo';


function parseHeaders(req, options = {}) {
  return (!!req)
    ? req.headers
    : {};
}
function parseCookies(req, options = {}) {
  return (!!req && !!req.headers)
    ? cookie.parse(req.headers.cookie || '')
    : '';
}

function extractState(apolloClient) {
  let data = null;

  if (!!apolloClient.cache) {
    data = apolloClient.cache.extract();
  }
  if (!data && !!apolloClient.localState && !!apolloClient.localState.cache) {
    data = apolloClient.localState.cache.extract();
  }

  return data;
}


export default App => {
  return class Apollo extends React.Component {
    static displayName = 'withApolloClient(App)';
    static async getInitialProps(ctx) {
      const { Component, router, ctx: { req, res, query } } = ctx;
      let pageProps = {};
      let apolloState = {};
      let apollo = await initApollo({}, {
        getToken: () => parseCookies(req),
        getHeaders: () => parseHeaders(req),
      });

      ctx.ctx.apolloClient = apollo;

      if (!!App && !!App.getInitialProps) {
        pageProps = await App.getInitialProps(ctx);
      }
      pageProps.query = query;

      if (res && res.finished) {
        return {};
      }

      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...pageProps}
              Component={Component}
              router={router}
              apolloState={apolloState}
              apolloClient={apollo}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      apolloState.data = extractState(apollo);

      return { ...pageProps, apolloState };
    }
    constructor(props) {
      super(props)
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient =
        props.apolloClient || initApollo(props.apolloState, {})
    }

    render() {
      return (
        <App {...this.props} apolloClient={this.apolloClient} />
      );
    }
  }
}
