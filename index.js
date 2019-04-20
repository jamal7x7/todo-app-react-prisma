import { GraphQLServer } from 'graphql-yoga'
import prisma from './prisma'
import { resolvers } from './src/resolvers'

const server = new GraphQLServer({
  typeDefs: './src/typeDefs/schema.graphql',
  resolvers,
  context: req => {
    return { prisma, req }
  },
})
server.start({ port: 4000 }, () =>
  console.log('Server is running on http://localhost:4000')
)
