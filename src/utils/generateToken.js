import jwt from 'jsonwebtoken'

export const generateToken = id => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    // return jwt.sign({ userId: id }, 'shttt', {
    expiresIn: '700 days'
  })
}
