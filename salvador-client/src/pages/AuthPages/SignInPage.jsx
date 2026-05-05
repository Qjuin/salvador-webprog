import { Link } from 'react-router-dom';

const inputClasses =
  'mt-2 w-full rounded-xl border border-[var(--line)] bg-[rgba(13,17,23,0.35)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[rgba(88,166,255,0.55)] focus:bg-[rgba(13,17,23,0.55)]';

const SignInPage = () => {
  return (
    <>
      <p className="font-semibold tracking-[0.2em] text-[var(--muted)]">WELCOME BACK</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[var(--ink)]">Welcome back</h1>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Please enter your details</p>

      <form className="mt-8 space-y-5" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor="signin-email" className="text-sm font-semibold text-[var(--ink)]">
            Email address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-semibold text-[var(--ink)]">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className={inputClasses}
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
          Sign in
        </button>

        <button
          type="button"
          className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[rgba(13,17,23,0.35)] px-4 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[rgba(13,17,23,0.55)]"
        >
          Sign in with Google
        </button>
      </form>

      <div className="mt-8 border-t border-[rgba(88,166,255,0.18)] pt-6 text-center text-sm text-[var(--muted)]">
        Don't have an account?{' '}
        <Link to="/auth/signup" className="font-semibold text-[var(--accent-purple)] transition hover:opacity-90">
          Sign up
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

export default SignInPage;
