import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-boost';
import { withClientState } from 'apollo-link-state';
import fetch from 'isomorphic-unfetch';
import { DEV_SERVER_URL, PROD_SERVER_URL } from '../config';
import { LOCAL_CARTOPEN_QUERY } from '../graphql';

const uri = (process.env.NODE_ENV === 'production')
  ? PROD_SERVER_URL
  : DEV_SERVER_URL;
let apolloClient = null;
let tokenObj = null;
let headers = {};

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
};


function createApolloClient(initialState, options) {
  if (!!options.getHeaders) headers = options.getHeaders();
  const data = !!initialState && (typeof initialState.cartOpen != 'undefined')
    ? initialState
    : {
        cartOpen: false,
        me: null,
      };
  const cache = new InMemoryCache().restore(data);

  const httpLink = new HttpLink({
    uri,
    credentials: 'include',
    headers,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  })

  const stateLink = withClientState({
    cache,
    defaults: data,
    resolvers: {
      Mutation: {
        toggleCart: (_, variables, { cache }) => {
          const { cartOpen } = cache.readQuery({
            query: LOCAL_CARTOPEN_QUERY,
          });
          const data = {
            data: { cartOpen: !cartOpen },
          };
          cache.writeData(data);

          return data;
        }
      }
    },
  });

  cache.writeData({ data });

  client.onResetStore(() => {
    cache.writeData({ data });
  });

  return client;
};


export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser || typeof window === 'undefined') {
    apolloClient = createApolloClient(initialState, options);
  }
  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState, options);
  }

  return apolloClient;
};
