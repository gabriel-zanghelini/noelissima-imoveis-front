'use server'

import { getSession, login } from './session'

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    //TODO: use zod schema to make sure info from form is here

    await login({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })
  } catch (error) {
    console.log('error:', error)
    if (error) {
      switch (error) {
        case 'EmptyEmailOrPassword':
          return 'Email or password cannot be empty.'
        case 'CredentialsSignIn':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong. Try again later.'
      }
    }
    throw error
  }
}
