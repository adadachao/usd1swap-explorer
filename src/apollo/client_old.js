import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'

// 创建拦截所有请求的 Link
const mockLink = new ApolloLink((operation, forward) => {
  // 根据操作类型返回不同的模拟数据
  const operationName = operation.operationName || 'default'
  const queryString = operation.query?.loc?.source?.body || ''

  let mockData = {}

  // 根据查询类型返回相应的模拟数据
  if (queryString.includes('uniswapDayDatas') || operationName.includes('uniswapDayDatas')) {
    // GLOBAL_CHART 查询
    mockData = {
      data: {
        uniswapDayDatas: [
          {
            id: '0x001',
            date: Math.floor(Date.now() / 1000),
            totalVolumeUSD: '1000000000',
            dailyVolumeUSD: '10000000',
            dailyVolumeETH: '5000',
            totalLiquidityUSD: '100000000',
            totalLiquidityETH: '50000',
          },
          {
            id: '0x002',
            date: Math.floor(Date.now() / 1000) - 86400, // 昨天
            totalVolumeUSD: '990000000',
            dailyVolumeUSD: '9000000',
            dailyVolumeETH: '4500',
            totalLiquidityUSD: '99000000',
            totalLiquidityETH: '49500',
          },
          {
            id: '0x003',
            date: Math.floor(Date.now() / 1000) - 172800, // 前天
            totalVolumeUSD: '980000000',
            dailyVolumeUSD: '8000000',
            dailyVolumeETH: '4000',
            totalLiquidityUSD: '98000000',
            totalLiquidityETH: '49000',
          },
        ],
      },
    }
  } else if (queryString.includes('uniswapFactories') || operationName.includes('uniswapFactories')) {
    // GLOBAL_DATA 查询
    mockData = {
      data: {
        uniswapFactories: [
          {
            id: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
            totalVolumeUSD: '1000000000',
            totalVolumeETH: '500000',
            untrackedVolumeUSD: '10000000',
            totalLiquidityUSD: '100000000',
            totalLiquidityETH: '50000',
            txCount: '1000000',
            pairCount: '1000',
          },
        ],
      },
    }
  } else if (queryString.includes('pairs') || operationName.includes('pairs') || queryString.includes('Pairs')) {
    mockData = {
      data: {
        pairs: [
          {
            id: '0x001',
            token0: { id: '0x123', symbol: 'WETH', name: 'Wrapped Ether' },
            token1: { id: '0x456', symbol: 'USDC', name: 'USD Coin' },
            reserve0: '1000',
            reserve1: '2000000',
            totalSupply: '1000000',
            reserveUSD: '4000000',
            trackedReserveETH: '2000',
            token0Price: '2000',
            token1Price: '0.0005',
            volumeUSD: '1000000',
            txCount: '1000',
            createdAtTimestamp: '1600000000',
            createdAtBlockNumber: '10000000',
          },
        ],
      },
    }
  } else if (queryString.includes('tokens') || operationName.includes('tokens') || queryString.includes('Tokens')) {
    mockData = {
      data: {
        tokens: [
          {
            id: '0x123',
            symbol: 'WETH',
            name: 'Wrapped Ether',
            totalSupply: '1000000',
            volume: '1000000',
            txCount: '1000',
            poolCount: '100',
            totalValueLocked: '2000000',
            derivedETH: '2000',
          },
        ],
      },
    }
  } else if (queryString.includes('blocks') || operationName.includes('blocks') || queryString.includes('Blocks')) {
    mockData = {
      data: {
        blocks: [
          {
            id: '0x789',
            number: '18000000',
            timestamp: '1680000000',
            gasUsed: '15000000',
            gasLimit: '30000000',
          },
        ],
      },
    }
  } else if (queryString.includes('transactions') || operationName.includes('transactions')) {
    // GLOBAL_TXNS 查询
    mockData = {
      data: {
        transactions: {
          mints: [
            {
              transaction: { id: '0x123', timestamp: '1680000000' },
              pair: {
                token0: { id: '0x123', symbol: 'WETH' },
                token1: { id: '0x456', symbol: 'USDC' },
              },
              to: '0x789',
              liquidity: '1000',
              amount0: '1',
              amount1: '2000',
              amountUSD: '4000',
            },
          ],
          burns: [],
          swaps: [],
        },
      },
    }
  } else if (queryString.includes('chart') || queryString.includes('Chart')) {
    // 图表数据
    mockData = {
      data: {
        pairDayDatas: [
          {
            date: Math.floor(Date.now() / 1000),
            dailyVolumeUSD: '1000000',
            dailyFeesUSD: '10000',
            totalLiquidityUSD: '10000000',
          },
        ],
      },
    }
  } else if (queryString.includes('eth') || queryString.includes('Eth') || queryString.includes('price')) {
    // ETH 价格数据
    mockData = {
      data: {
        bundles: [
          {
            id: '1',
            ethPrice: '2000',
          },
        ],
      },
    }
  } else {
    // 默认模拟数据 - 更通用的响应
    mockData = {
      data: {
        pairs: [
          {
            id: '0x001',
            token0: { id: '0x123', symbol: 'WETH', name: 'Wrapped Ether' },
            token1: { id: '0x456', symbol: 'USDC', name: 'USD Coin' },
            reserve0: '1000',
            reserve1: '2000000',
            totalSupply: '1000000',
            reserveUSD: '4000000',
            trackedReserveETH: '2000',
            token0Price: '2000',
            token1Price: '0.0005',
            volumeUSD: '1000000',
            txCount: '1000',
            createdAtTimestamp: '1600000000',
            createdAtBlockNumber: '10000000',
          },
        ],
        tokens: [
          {
            id: '0x123',
            symbol: 'WETH',
            name: 'Wrapped Ether',
            totalSupply: '1000000',
            volume: '1000000',
            txCount: '1000',
            poolCount: '100',
            totalValueLocked: '2000000',
            derivedETH: '2000',
          },
        ],
        blocks: [
          {
            id: '0x789',
            number: '18000000',
            timestamp: '1680000000',
            gasUsed: '15000000',
            gasLimit: '30000000',
          },
        ],
        uniswapFactories: [
          {
            id: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
            pairCount: '1000',
            totalVolumeUSD: '1000000000',
            totalFeesUSD: '10000000',
            totalValueLockedUSD: '100000000',
          },
        ],
        bundles: [
          {
            id: '1',
            ethPrice: '2000',
          },
        ],
      },
    }
  }

  // 返回一个 Observable，立即发出模拟数据
  return {
    subscribe: (observer) => {
      observer.next({ data: mockData.data })
      observer.complete()
      return {
        unsubscribe: () => {
          // 空实现
        },
      }
    },
  }
})

// 创建模拟客户端
const createMockClient = () => {
  return new ApolloClient({
    link: mockLink,
    cache: new InMemoryCache(),
    shouldBatch: true,
  })
}

// 导出所有客户端实例
export const client = createMockClient()
export const healthClient = createMockClient()
export const stakingClient = createMockClient()
export const blockClient = createMockClient()
export const tokenClient = createMockClient()
export const globalClient = createMockClient()
