import {ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
    uri: process.env.REACT_PUBLIC_BACKEND_URL,
    cache: new InMemoryCache(),
    credentials: 'include'
});