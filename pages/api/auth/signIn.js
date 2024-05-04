import { signIn } from 'next-auth/react'

export default function SignIn() {
  const handleSignIn = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    signIn('credentials', { email, callbackUrl: '/' })
  }

  return (
    <form onSubmit={handleSignIn}>
      <label>
        Email
        <input id="email" name="email" type="text" required />
      </label>
      <button type="submit">Sign in</button>
    </form>
  )
}