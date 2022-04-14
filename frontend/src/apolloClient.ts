import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql, HttpLink
} from "@apollo/client";

import {protocol, strapi} from "../constants";

const cache = new InMemoryCache();

const link = new HttpLink({
    uri: `${protocol}/${strapi}/graphql`
});

export const apolloClient = new ApolloClient({
    cache,
    link
});