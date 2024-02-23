export default function Page() {
  async function login(formData: FormData) {
    'use server'

    console.log(formData)

    const rawFormData = {
      username: formData.get('username'),
      password: formData.get('password'),
    }

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rawFormData),
    })

    if (response.ok) {
      console.log(await response.json())
    } else {
      // Handle errors
    }
  }

  return (
    <form action={login}>
      <input type='text' name='username' id='username' placeholder='username' />
      <input
        type='password'
        name='password'
        id='password'
        placeholder='password'
      />
      <button type='submit'>Login</button>
    </form>
  )
}
