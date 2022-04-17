import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import {protocol, strapi} from "../constants";

import fetch from 'cross-fetch'

const cache = new InMemoryCache()

const link = new HttpLink({
    uri: `${protocol}/${strapi}/graphql`,
    fetch
})

// Isolate Apollo client so it could be reused
// in both application runtime and tests.
export const client = new ApolloClient({
    cache,
    link,
})