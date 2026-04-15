import { Link } from 'react-router-dom'

const SignUpPage = () => {
  return (
    <section className="signin-showcase auth-page-expansive">
      <div className="signin-card auth-card-large">
        <article className="signin-visual signup-visual">
          <p className="signin-kicker">Create Account</p>
          <h2>Start your trainer profile</h2>
          <p>
            Create your account to save curated reads, bookmark progress, and unlock your personalized
            web programming learning path.
          </p>

          <div className="signin-streaks" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </article>

        <article className="signin-form-panel">
          <form className="signin-form" onSubmit={(event) => event.preventDefault()}>
            <h3>User Registration</h3>

            <label className="signin-input-wrap" htmlFor="fullName">
              <span className="signin-icon" aria-hidden="true">
                +
              </span>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Full name"
                autoComplete="name"
                required
              />
            </label>

            <label className="signin-input-wrap" htmlFor="email">
              <span className="signin-icon" aria-hidden="true">
                @
              </span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                autoComplete="email"
                required
              />
            </label>

            <label className="signin-input-wrap" htmlFor="password">
              <span className="signin-icon" aria-hidden="true">
                *
              </span>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create password"
                autoComplete="new-password"
                required
              />
            </label>

            <button type="submit" className="btn signin-submit">
              Sign Up
            </button>

            <p className="signin-register">
              Already registered? <Link to="/signin">Sign in</Link>
            </p>
          </form>
        </article>
      </div>
    </section>
  )
}

export default SignUpPage
