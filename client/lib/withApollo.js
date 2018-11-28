import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { SERVER_URL } from '../config';


function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? SERVER_URL : SERVER_URL,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      });
    },
    clientState: {
      defaults: {}
    }
  });
}

export default withApollo(createClient);
