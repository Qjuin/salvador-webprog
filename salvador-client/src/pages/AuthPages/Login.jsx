import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/UserService'

const inputClasses =
  'mt-2 w-full rounded-xl border border-[var(--line)] bg-[rgba(13,17,23,0.35)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[rgba(88,166,255,0.55)] focus:bg-[rgba(13,17,23,0.55)]'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser({ email, password })
      console.log('Login successful', data)
      localStorage.setItem('token', data.token)
      localStorage.setItem('firstName', data.firstName)
      localStorage.setItem('type', data.type) // user type for dynamic rendering
      navigate('/dashboard', { state: { firstName: data.firstName, type: data.type } })
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message)
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    }
  }

  return (
    <>
      <p className="font-semibold tracking-[0.2em] text-[var(--muted)]">WELCOME BACK</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[var(--ink)]">Login</h1>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Please enter your details</p>

      {error ? <p className="mt-4 text-sm font-semibold text-red-300">{error}</p> : null}

      <form className="mt-8 space-y-5" onSubmit={handleLogin}>
        <div>
          <input
            id="login-email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <input
            id="login-password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-[var(--muted)]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[var(--line)] bg-[rgba(13,17,23,0.35)] accent-[var(--accent-purple)]"
            />
            <span>Remember me</span>
          </label>
          <a
            href="#"
            onClick={(event) => event.preventDefault()}
            className="font-semibold text-[var(--accent-purple)] transition hover:opacity-90"
          >
            Forgot password
          </a>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[var(--accent-purple)] px-4 py-3 text-sm font-semibold text-[#0d1117] transition hover:opacity-95"
        >
          Login
        </button>
      </form>

      <div className="mt-8 border-t border-[rgba(88,166,255,0.18)] pt-6 text-center text-sm text-[var(--muted)]">
        If you do not have an account,{' '}
        <Link to="/auth/signup" className="font-semibold text-[var(--accent-purple)] transition hover:opacity-90">
          register here.
        </Link>
      </div>

      <div className="mt-4 text-center text-sm">
        <Link to="/" className="font-semibold text-[var(--muted)] transition hover:text-[var(--ink)]">
          Back to home
        </Link>
      </div>
    </>
  )
}

export default LoginPage
