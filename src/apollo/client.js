import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://subgraph.bitheart.org/subgraphs/name/movabeta/usd1swap2',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

// export const healthClient = new ApolloClient({
//   link: new HttpLink({
//     uri: 'http://13.204.105.72:8000/subgraphs/graphql',
//   }),
//   cache: new InMemoryCache(),
//   shouldBatch: true,
// })

export const stakingClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://subgraph.bitheart.org/subgraphs/name/movabeta/usdswap',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://subgraph.bitheart.org/subgraphs/name/movabeta/usdswap-blocks',
  }),
  cache: new InMemoryCache(),
})
