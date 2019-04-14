import { GraphQLServer } from "graphql-yoga"
import { resolvers } from "./src/resolvers"

const server = new GraphQLServer({
  typeDefs: "./src/typeDefs/schema.graphql",
  resolvers
})
server.start(() => console.log("Server is running on http://localhost:4000"))
