import { hash } from 'bcryptjs'
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

  /////////////////////////PROJECT//////////////////////////////

  createProject: async (parent, args, { prisma }, info) => {
    const p = await prisma.mutation.createProject({
      data: {
        name: args.data.name,

        author: {
          connect: {
            id: args.data.userId
          }
        }
      }
    })
    return p
  },
  // createDefaultProject: async (parent, args, { prisma }, info) => {
  //   const defaultProject = {
  //     name: 'defaultProject',
  //     id: 'g000',
  //     author: {
  //       create: {
  //         id: 'a000',
  //         name: '',
  //         email: '',
  //         password: ''
  //       }
  //     }
  //   }
  //   const dp = await prisma.mutation.createProject({
  //     data: { ...defaultProject }
  //   })
  //   return dp
  // },

  ////////////////////////////TODO///////////////////////////////

  createTodo: async (parent, args, { prisma }, info) => {
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
            id: 'cjup7l6a600f90960wykm30qm' // => jamal
          }
        }
      }
    })
    return t
  }
}
