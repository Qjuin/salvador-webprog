import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AboutPage from './pages/AboutPage'
import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="articles" element={<ArticlePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
