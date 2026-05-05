function Button({ children, href = '#', variant = 'solid' }) {
  const className = variant === 'ghost' ? 'btn btn-ghost' : 'btn btn-solid'

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

export default Button
