import { redirect } from 'next/navigation'
import { getSession, login, logout } from '@/utils/session'
import { useFormState } from 'react-dom'

async function callLogin(
  prevState: {
    message: string
  },
  formData: FormData
) {
  'use server'
  await login({
    username: (formData.get('username') as string) || '',
    password: (formData.get('password') as string) || '',
  })
  redirect('/')
}

export default async function Page() {
  const session = await getSession()

  const initialState = {
    message: '',
  }

  const [state, formAction] = useFormState(callLogin, initialState)

  return (
    <section>
      <form action={formAction}>
        <input type='text' placeholder='Username' />
        <input type='password' placeholder='Password' />
        <br />
        <button type='submit'>Login</button>
      </form>
      <form
        action={async () => {
          'use server'
          await logout()
          redirect('/')
        }}
      >
        <button type='submit'>Logout</button>
        <p aria-live='polite' className='sr-only' role='status'>
          {state?.message}
        </p>
      </form>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  )
}
