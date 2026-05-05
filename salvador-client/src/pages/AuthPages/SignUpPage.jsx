import { Link } from 'react-router-dom';

const inputClasses =
  'mt-2 w-full rounded-xl border border-[var(--line)] bg-[rgba(13,17,23,0.35)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[rgba(88,166,255,0.55)] focus:bg-[rgba(13,17,23,0.55)]';

const SignUpPage = () => {
  return (
    <>
      <p className="font-semibold tracking-[0.2em] text-[var(--muted)]">GET STARTED</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[var(--ink)]">Create account</h1>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Please enter your details</p>

      <form className="mt-8 space-y-5" onSubmit={(event) => event.preventDefault()}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-semibold text-[var(--ink)]">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="First Name"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="last-name" className="text-sm font-semibold text-[var(--ink)]">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Last Name"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-semibold text-[var(--ink)]">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-semibold text-[var(--ink)]">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[var(--accent-purple)] px-4 py-3 text-sm font-semibold text-[#0d1117] transition hover:opacity-95"
        >
          Sign up
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
  );
};

export default SignUpPage;
