import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
    input: {
        name: 'Ali',
        email: 'ali@g.com',
        password: bcrypt.hashSync('hello@12!3hfhgfBHnj'),
    },
    user: undefined,
    jwt: undefined,
}
const userTwo = {
    input: {
        name: 'Alaa',
        email: 'alaa@g.com',
        password: bcrypt.hashSync('hello@12!3hfhgfBHnj'),
    },
    user: undefined,
    jwt: undefined,
}
const postOne = {
    input: {
        title: 'published post title',
        body: 'published post body',
        published: true,
    },
    post: undefined,
}
const postTwo = {
    input: {
        title: 'draft post title',
        body: 'draft post body',
        published: false,
    },
    post: undefined,
}
const commentOne = {
    input: {
        text: 'first comment!',
    },
    comment: undefined,
}

const seed = async () => {
    // Delete test deta
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()

    // create userOne
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input,
    })

    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input,
    })

    userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)

    postOne.post = await prisma.mutation.createPost({
        data: {
            ...postOne.input,
            author: {
                connect: {
                    id: userOne.user.id,
                },
            },
        },
    })

    postTwo.post = await prisma.mutation.createPost({
        data: {
            ...postTwo.input,
            author: {
                connect: {
                    id: userOne.user.id,
                },
            },
        },
    })
    commentOne.comment = await prisma.mutation.createComment({
        data: {
            ...commentOne.input,
            post: {
                connect: {
                    id: postOne.post.id,
                },
            },
            author: {
                connect: {
                    id: userOne.user.id,
                },
            },
        },
    })
}

export { seed as default, userOne, postOne, postTwo, commentOne }
