import { getUserId } from '../utils/getUserId'

const Query = {
  users: async (parent, args, { prisma }, info) => {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          },
          {
            email_contains: args.query
          }
        ]
      }
    }

    const u = await prisma.query.users(opArgs, info)
    return u
    // return db.usersData
  },

  me(parent, args, { prisma, req }, info) {
    const header = req.request
      ? req.request.headers.authorization
      : req.connection.context.Authorization
    console.log(header)

    const userId = getUserId(req)
    console.log(userId)
    return prisma.query.user({ where: { id: userId } })
  },

  todos: async (parent, args, { prisma }, info) => {
    const t = await prisma.todos({}, info)
    return t
  },
  projects: async (parent, args, { prisma }, info) => {
    const p = await prisma.projects({}, info)
    return p
  }
}

export { Query }
