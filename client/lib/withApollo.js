import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { SERVER_URL } from '../config';
import { LOCAL_CARTOPEN_QUERY } from '../graphql';


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
    resolvers: {
      Mutation: {
        toggleCart(_, variables, { cache }) {
          const { cartOpen } = cache.readQuery({
            query: LOCAL_CARTOPEN_QUERY
          });
          const data = {
            data: { cartOpen: !cartOpen }
          };
          cache.writeData(data);
          return data;
        }
      }
    },
    clientState: {
      defaults: {
        cartOpen: false
      }
    }
  });
}

export default withApollo(createClient);
