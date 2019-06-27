import { gql } from 'apollo-boost'

// * USERS
const createUser = gql`
    mutation($data: CreateUserInput!) {
        createUser(data: $data) {
            user {
                id
                email
                name
            }
            token
        }
    }
`

const getUsers = gql`
    query {
        users {
            id
            name
            email
        }
    }
`

const login = gql`
    mutation($data: LoginUserInput!) {
        login(data: $data) {
            user {
                id
                email
                name
            }
            token
        }
    }
`
const getProfile = gql`
    query {
        me {
            id
            name
            email
            password
        }
    }
`

// * POSTS
const getPosts = gql`
    query {
        posts {
            id
            title
            published
        }
    }
`

const getMyPosts = gql`
    query {
        myPosts {
            id
            title
            published
        }
    }
`

const getPost = gql`
    mutation($id: ID!, $data: UpdatePostInput!) {
        updatePost(id: $id, data: $data) {
            id
            title
            published
        }
    }
`

const createPost = gql`
    mutation($data: CreatePostInput!) {
        createPost(data: $data) {
            id
            title
            published
            author {
                id
                name
            }
        }
    }
`

const deletePost = gql`
    mutation($id: ID!) {
        deletePost(id: $id) {
            id
            title
            published
        }
    }
`

// * COMMENTS
const getComments = gql`
    query {
        comments {
            id
            text
            post {
                id
            }
        }
    }
`

const createComment = gql`
    mutation($data: CreateCommentInput!) {
        createComment(data: $data) {
            id
            text
            post {
                id
            }
            author {
                id
                name
            }
        }
    }
`

const deleteComment = gql`
    mutation($id: ID!) {
        deleteComment(id: $id) {
            id
            text
            post {
                id
            }
        }
    }
`

export {
    createUser,
    login,
    getUsers,
    getProfile,
    createPost,
    getMyPosts,
    getPosts,
    getPost,
    deletePost,
    getComments,
    createComment,
    deleteComment,
}
