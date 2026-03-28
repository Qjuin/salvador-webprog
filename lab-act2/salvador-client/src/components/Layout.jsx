import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-main footer-note">
        WS101 Web Programming | Salvador Client Portal | React + Vite + Tailwind
      </footer>
    </div>
  )
}

export default Layout
