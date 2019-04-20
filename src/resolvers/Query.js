const Query = {
  users: async (p, args, { prisma }, info) => {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    }

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
        ],
      }
    }

    const u = await prisma.query.users(opArgs, info)
    return u
    // return db.usersData
  },
  todos: async (p, args, { prisma }, info) => {
    const t = await prisma.todos({}, info)
    return t
  },
  projects: async (parent, args, { prisma }, info) => {
    const p = await prisma.projects({}, info)
    return p
  },
}

export { Query }
