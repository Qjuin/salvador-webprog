import { NavLink } from 'react-router-dom'
import logo from '../assets/salvador-logo.svg'

const NavBar = () => {
  return (
    <header className="navbar-wrap">
      <nav className="navbar site-main" aria-label="Main navigation">
        <NavLink className="brand" to="/">
          <img className="brand-mark" src={logo} alt="Ultra Ball logo" />
          <span>
            Salvador
            <small>Trainer's Codex</small>
          </span>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            About
          </NavLink>
          <NavLink to="/articles" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Articles
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
