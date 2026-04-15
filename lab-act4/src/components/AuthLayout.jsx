import { Link } from 'react-router-dom'

const AuthLayout = ({
  eyebrow,
  title,
  description,
  formTitle,
  formSubtitle,
  submitLabel,
  fields,
  footerPrompt,
  footerLinkTo,
  footerLinkLabel,
  badgeLabel
}) => {
  return (
    <section className="auth-shell">
      <article className="auth-panel trainer-panel">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="hero-title">{title}</h2>
        <p className="auth-copy">{description}</p>

        <p className="auth-meta">
          <strong>Feature:</strong> {badgeLabel}
        </p>
      </article>

      <article className="auth-panel">
        <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
          <h3>{formTitle}</h3>
          <p className="auth-subtitle">{formSubtitle}</p>

          {fields.map((field) => (
            <div className="auth-field" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                required
              />
            </div>
          ))}

          <button className="btn auth-submit" type="submit">
            {submitLabel}
          </button>

          <p className="auth-hint">
            {footerPrompt} <Link to={footerLinkTo} className="auth-link">{footerLinkLabel}</Link>
          </p>
        </form>
      </article>
    </section>
  )
}

export default AuthLayout
