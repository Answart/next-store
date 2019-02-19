import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { DEV_SERVER_URL, PROD_SERVER_URL } from '../config';
import { LOCAL_CARTOPEN_QUERY } from '../graphql';


function createClient({ headers }) {
  return new ApolloClient({
    uri: (process.env.NODE_ENV === 'production')
      ? PROD_SERVER_URL
      : DEV_SERVER_URL,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      });
    },
    clientState: {
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
      defaults: {
        cartOpen: false,
        me: null,
        products: [],
      }
    }
  });
}

export default withApollo(createClient);
