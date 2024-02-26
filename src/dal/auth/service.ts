// import jwt from 'jsonwebtoken'
// import config from '../../jwt/config'
// import { PrismaClient } from '@prisma/client'
// import bcrypt from 'bcrypt'

// const prisma = new PrismaClient()

// type ResetPasswordPayload = {
//   username: string
//   currentPassword: string
//   newPassword: string
//   confirmPassword: string
// }

// async function matchUsernamePassword(username: string, password: string) {
//   const user = await prisma.user.findUnique({ where: { username: username } })

//   if (!user) return { user, match: false }

//   const match = await bcrypt.compare(password, user.password)

//   const { password: omittedPassword, ...userWithoutPassword } = user

//   return { user: userWithoutPassword, match }
// }

// async function authenticate({
//   username,
//   password,
// }: {
//   username: string
//   password: string
// }) {
//   const { user, match } = await matchUsernamePassword(username, password)

//   if (!user || !match) throw 'Username or password is incorrect'

//   // create a jwt token that is valid for 7 days
//   const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '6h' })

//   return { ...user, token }
// }

// async function resetPassword(payload: ResetPasswordPayload) {
//   const { username, currentPassword, newPassword, confirmPassword } = payload

//   if (!username || !currentPassword || !newPassword || !confirmPassword) {
//     throw 'Incorrect request body!'
//   }

//   const { user, match } = await matchUsernamePassword(username, currentPassword)

//   if (!user || !match) throw 'Username or password is incorrect'

//   if (newPassword != confirmPassword) throw 'Passwords are not matching!'

//   const newPasswordHash = await bcrypt.hash(newPassword, 10)

//   try {
//     await prisma.user.update({
//       where: { username: username },
//       data: { password: newPasswordHash },
//     })
//   } catch {
//     throw 'Server could not reset password! Try again later.'
//   }
// }

// export default { authenticate, resetPassword }
