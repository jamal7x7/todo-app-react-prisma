import jwt from 'jsonwebtoken'

const getUserId = (req, requireAuth = true) => {
  const header = req.request
    ? req.request.headers.authorization
    : req.connection.context.Authorization

  if (header) {
    const token = header.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const decoded = jwt.verify(token, 'shttt')

    return decoded.userId
  }

  if (requireAuth) throw new Error('You must be kidding me, AUTH Required!!!')

  return null
}

export { getUserId }
