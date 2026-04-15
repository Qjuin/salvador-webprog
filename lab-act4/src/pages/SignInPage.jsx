import { Link } from 'react-router-dom'

const SignInPage = () => {
  return (
    <section className="signin-showcase auth-page-expansive">
      <div className="signin-card auth-card-large">
        <article className="signin-visual">
          <p className="signin-kicker">Trainer Portal</p>
          <h2>Welcome to website</h2>
          <p>
            Sign in to continue reading your saved articles, track progress, and manage your personalized
            learning notes.
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
            <h3>User Login</h3>

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
                placeholder="Password"
                autoComplete="current-password"
                required
              />
            </label>

            <div className="signin-options">
              <label className="signin-check">
                <input type="checkbox" name="remember" />
                <span>Remember</span>
              </label>
              <a href="#" onClick={(event) => event.preventDefault()}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn signin-submit">
              Login
            </button>

            <p className="signin-register">
              Need an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </article>
      </div>
    </section>
  )
}

export default SignInPage
