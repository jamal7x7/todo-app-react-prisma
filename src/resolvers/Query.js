const Query = {
  users: () => {
    const u = {
      name: "jamal",
      email: "jamal@gmail.com",
      password: "sss"
    }
    return u
  },
  todos: () => {
    const t = {
      text: "hello",
      comleted: true
    }
    return t
  }
}

export { Query }
