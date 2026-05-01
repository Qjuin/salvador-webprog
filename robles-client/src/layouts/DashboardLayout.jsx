import { NavLink, Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="site-shell">
      <header className="navbar-wrap">
        <nav className="navbar site-main" aria-label="Dashboard navigation">
          <NavLink className="brand" to="/dashboard">
            <span>
              Dashboard
              <small>Admin</small>
            </span>
          </NavLink>

          <div className="nav-links">
            <NavLink to="/dashboard" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Overview
            </NavLink>
            <NavLink to="/dashboard/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Users
            </NavLink>
            <NavLink to="/dashboard/reports" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Reports
            </NavLink>
            <NavLink to="/" className="nav-link nav-cta">
              Home
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
