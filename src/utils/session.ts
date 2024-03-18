import bcrypt from 'bcrypt'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from './prisma'

const key = new TextEncoder().encode(process.env.JWT_SECRET)

async function matchUsernamePassword(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username: username } })

  if (!user) return { user, match: false }

  const match = await bcrypt.compare(password, user.password)

  const { password: omittedPassword, ...userWithoutPassword } = user

  return { user: userWithoutPassword, match }
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function login({
  password,
  username,
}: {
  username: string
  password: string
}) {
  console.log('login', username, password)

  if (username === '' || password === '') throw 'EmptyUsernameOrPassword'

  const { user, match } = await matchUsernamePassword(username, password)

  console.log(match, user)

  if (!user || !match) throw 'CredentialsSignIn'

  // Create the session
  const expires = new Date(Date.now() + 10 * 1000)
  const session = await encrypt({ user, expires })

  // Save the session in a cookie
  cookies().set('session', session, { expires, httpOnly: true })
}

export async function logout() {
  // Destroy the session
  cookies().set('session', '', { expires: new Date(0) })
}

export async function getSession() {
  const session = cookies().get('session')?.value
  if (!session) return null
  return await decrypt(session)
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  if (!session) return

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session)
  parsed.expires = new Date(Date.now() + 10 * 1000)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  })
  return res
}
