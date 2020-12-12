import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

export default client