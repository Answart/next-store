import App, { Container } from 'next/app';
import Page from '../components/Page.js';
import { ApolloProvider } from 'react-apollo';
import withApollo from '../lib/withApollo';


class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps}/>
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
