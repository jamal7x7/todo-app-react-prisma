import { compare, hash } from 'bcryptjs'
import { generateToken } from '../utils/generateToken'
import { getUserId } from '../utils/getUserId.js'

export const Mutation = {
  //////////////////////////USER////////////////////////////::::
  createUser: async (parent, args, { prisma }, info) => {
    const hached = await hash(args.data.password, 10)
    const u = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password: hached
      }
    })
    return u
  },

  login: async (parent, args, { prisma, req }, info) => {
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    })

    if (!user) throw new Error('user Does not exist')

    const match = await compare(args.data.password, user.password)

    if (!match) throw new Error('Wrong password!!!')

    const token = generateToken(user.id)
    req.request.header = {
      ...req.request.header,
      autorization: `Bearer ${token}`
    }

    return { token, user }
  },

  /////////////////////////PROJECT//////////////////////////////

  createProject: async (parent, args, { prisma, req }, info) => {
    const userId = getUserId(req)

    const p = await prisma.mutation.createProject({
      data: {
        name: args.data.name,

        author: {
          connect: {
            // id: 'cjwkncsl300cs0758fczzh43v' // => jamal
            id: userId // => jamal
          }
        }
      }
    })
    return p
  },

  ////////////////////////////TODO///////////////////////////////

  createTodo: async (parent, args, { prisma, req }, info) => {
    const userId = getUserId(req)
    const t = await prisma.mutation.createTodo({
      data: {
        text: args.data.text,
        completed: args.data.completed,
        project: {
          connect: {
            id: args.data.projectId
          }
        },
        author: {
          connect: {
            // id: 'cjwkncsl300cs0758fczzh43v' // => jamal
            id: userId // => jamal
          }
        }
      }
    })
    return t
  }
}
