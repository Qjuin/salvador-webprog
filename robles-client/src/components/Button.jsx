import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800',
  secondary: 'border border-zinc-300 bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
}

const Button = ({
  to,
  type = 'button',
  variant,
  className = '',
  children,
  ...rest
}) => {
  if (to) {
    return (
      <Link to={to} className={`btn ${className}`.trim()} {...rest}>
        {children}
      </Link>
    )
  }

  const base = 'inline-flex items-center justify-center transition'
  const rounded = 'rounded-xl'
  const padding = 'px-4 py-3'
  const chosenVariant = variant ? VARIANTS[variant] : ''
  const merged = [base, rounded, padding, chosenVariant, className].filter(Boolean).join(' ')

  return (
    <button type={type} className={merged} {...rest}>
      {children}
    </button>
  )
}

export default Button
