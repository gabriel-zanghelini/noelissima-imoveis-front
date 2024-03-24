'use client'

import { authenticate } from '@/utils/actions'
import { useFormState, useFormStatus } from 'react-dom'

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  console.log(errorMessage)

  return (
    <form action={dispatch}>
      <input type='test' name='email' placeholder='Email' required />
      <input type='password' name='password' placeholder='Password' required />
      <LoginButton />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button aria-disabled={pending} type='submit'>
      Login
    </button>
  )
}
