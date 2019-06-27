import { Prisma } from 'prisma-binding'
// import { fragmentReplacements } from './resolvers'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466/default/todo',
  secret: process.env.PRISMA_SECRET
  //   fragmentReplacements, // to lockdown specific fields and being able to access values even if not returned
})

export { prisma as default }
