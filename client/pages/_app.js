import React, { Component } from 'react';
import App, { Container as NextContainer } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import Page from '../components/Page';
import withApolloClient from '../lib/with-apollo-client';


class NextApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (!!Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps(ctx);
      } catch(e) {
        console.error('Error: getInitialProps failed.', e)
      }
    }
    pageProps.query = ctx.query;

    return { pageProps };
  }
  render() {
    const { Component, pageProps, apolloClient, apolloState } = this.props;

    return (
      <>
        <ApolloProvider client={apolloClient}>
          <Page>
            <Component {...pageProps} apolloState={apolloState} client={apolloClient} />
          </Page>
        </ApolloProvider>
      </>
    );
  }
}


export default withApolloClient(NextApp);
