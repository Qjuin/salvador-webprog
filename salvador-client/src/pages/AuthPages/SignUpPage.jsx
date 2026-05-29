import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:8000/api/users'

const createUser = async (user) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Sign up failed. Please try again.')
  }

  return data
}

const inputClasses =
  'mt-2 w-full rounded-xl border border-[var(--line)] bg-[rgba(13,17,23,0.35)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[rgba(88,166,255,0.55)] focus:bg-[rgba(13,17,23,0.55)]'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    username: '',
    email: '',
    address: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) {
      setError('')
    }
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const nextErrors = {}
    const nextEmail = form.email.trim().toLowerCase()
    const rawUsername = String(form.username ?? '')
    const rawPassword = String(form.password ?? '')
    const rawContactNumber = String(form.contactNumber ?? '').trim()
    const rawAge = String(form.age ?? '').trim()

    ;[
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['username', 'Username'],
      ['email', 'Email'],
      ['address', 'Address'],
      ['password', 'Password']
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`
      }
    })

    if (nextEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (rawPassword.trim() && rawPassword.trim().length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }

    if (rawContactNumber && !/^\d{11}$/.test(rawContactNumber)) {
      nextErrors.contactNumber = 'Contact number must be 11 digits.'
    }

    if (rawAge && !/^\d+$/.test(rawAge)) {
      nextErrors.age = 'Age must be a number only.'
    }

    if (rawUsername && /\s/.test(rawUsername)) {
      nextErrors.username = 'Username must not contain spaces.'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setFieldErrors(nextErrors)
    setError('')

    if (Object.keys(nextErrors).length) {
      return
    }

    setIsSubmitting(true)

    try {
      await createUser({
        ...form,
        age: Number(form.age),
        type: 'editor',
        isActive: true
      })
      navigate('/auth/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <p className="font-semibold tracking-[0.2em] text-[var(--muted)]">GET STARTED</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[var(--ink)]">Create account</h1>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Please enter your details</p>

      {error ? <p className="mt-4 text-sm font-semibold text-red-300">{error}</p> : null}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-1 sm:grid-cols-2">
          <div>
            <input
              id="first-name"
              type="text"
              placeholder="First Name"
              autoComplete="given-name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className={`${inputClasses} ${fieldErrors.firstName ? 'border-red-400' : ''}`.trim()}
              required
            />
            {fieldErrors.firstName ? <p className="mt-2 text-xs text-red-300">{fieldErrors.firstName}</p> : null}
          </div>

          <div>
            <input
              id="last-name"
              type="text"
              placeholder="Last Name"
              autoComplete="family-name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className={`${inputClasses} ${fieldErrors.lastName ? 'border-red-400' : ''}`.trim()}
              required
            />
            {fieldErrors.lastName ? <p className="mt-2 text-xs text-red-300">{fieldErrors.lastName}</p> : null}
          </div>
        </div>

        <div className="grid gap-1 sm:grid-cols-2">
          <div>
            <input
              id="age"
              type="text"
              placeholder="Age"
              name="age"
              value={form.age}
              onChange={handleChange}
              className={`${inputClasses} ${fieldErrors.age ? 'border-red-400' : ''}`.trim()}
              required
            />
            {fieldErrors.age ? <p className="mt-2 text-xs text-red-300">{fieldErrors.age}</p> : null}
          </div>

          <div>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={`${inputClasses} ${fieldErrors.gender ? 'border-red-400' : ''}`.trim()}
              required
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {fieldErrors.gender ? <p className="mt-2 text-xs text-red-300">{fieldErrors.gender}</p> : null}
          </div>
        </div>

        <div className="grid gap-1 sm:grid-cols-2">
          <div>
            <input
              id="contact-number"
              type="text"
              placeholder="Contact Number"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              className={`${inputClasses} ${fieldErrors.contactNumber ? 'border-red-400' : ''}`.trim()}
              required
            />
            {fieldErrors.contactNumber ? (
              <p className="mt-2 text-xs text-red-300">{fieldErrors.contactNumber}</p>
            ) : null}
          </div>

          <div>
            <input
              id="username"
              type="text"
              placeholder="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className={`${inputClasses} ${fieldErrors.username ? 'border-red-400' : ''}`.trim()}
              required
            />
            {fieldErrors.username ? <p className="mt-2 text-xs text-red-300">{fieldErrors.username}</p> : null}
          </div>
        </div>

        <div>
          <input
            id="signup-email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`${inputClasses} ${fieldErrors.email ? 'border-red-400' : ''}`.trim()}
            required
          />
          {fieldErrors.email ? <p className="mt-2 text-xs text-red-300">{fieldErrors.email}</p> : null}
        </div>

        <div>
          <input
            id="address"
            type="text"
            placeholder="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            className={`${inputClasses} ${fieldErrors.address ? 'border-red-400' : ''}`.trim()}
            required
          />
          {fieldErrors.address ? <p className="mt-2 text-xs text-red-300">{fieldErrors.address}</p> : null}
        </div>

        <div>
          <input
            id="signup-password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`${inputClasses} ${fieldErrors.password ? 'border-red-400' : ''}`.trim()}
            required
          />
          {fieldErrors.password ? <p className="mt-2 text-xs text-red-300">{fieldErrors.password}</p> : null}
          <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-[var(--accent-purple)] px-4 py-3 text-sm font-semibold text-[#0d1117] transition hover:opacity-95"
        >
          {isSubmitting ? 'Signing up...' : 'Sign up'}
        </button>

        <button
          type="button"
          className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[rgba(13,17,23,0.35)] px-4 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[rgba(13,17,23,0.55)]"
        >
          Sign up with Google
        </button>
      </form>

      <div className="mt-8 border-t border-[rgba(88,166,255,0.18)] pt-6 text-center text-sm text-[var(--muted)]">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-[var(--accent-purple)] transition hover:opacity-90">
          Sign in
        </Link>
      </div>

      <div className="mt-4 text-center text-sm">
        <Link to="/" className="font-semibold text-[var(--muted)] transition hover:text-[var(--ink)]">
          Back to home
        </Link>
      </div>
    </>
  )
};

export default SignUpPage
