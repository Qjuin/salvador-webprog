import { useMemo } from 'react'
import Button from '../../components/Button'
import ArticleList from '../../components/ArticleList'
import seedArticles from '../../data/article-content'

const STORAGE_KEY = 'salvador.articles'

const normalizeStoredArticles = (items) =>
  items.map((item, index) => ({
    id: item.id ?? index + 1,
    name: item.name,
    title: item.title,
    image: item.image,
    moreInfoLink: item.moreInfoLink,
    content: Array.isArray(item.content) ? item.content : [],
    status: item.status ?? 'active'
  }))

const ArticleListPage = () => {
  const articles = useMemo(() => {
    if (typeof window === 'undefined') {
      return normalizeStoredArticles(seedArticles)
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        return normalizeStoredArticles(seedArticles)
      }

      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) && parsed.length
        ? normalizeStoredArticles(parsed)
        : normalizeStoredArticles(seedArticles)
    } catch (error) {
      console.warn('Failed to read stored articles:', error)
      return normalizeStoredArticles(seedArticles)
    }
  }, [])

  const activeArticles = useMemo(
    () => articles.filter((article) => article.status === 'active'),
    [articles]
  )

  return (
    <div>
      <section className="section hero-section">
        <p className="eyebrow">Trainer Notes</p>
        <h2 className="hero-title">Pokemon strategy guides and practical reads</h2>
        <p className="hero-text">
          Browse short write-ups about team building, battle tempo, and role planning to strengthen your
          playstyle.
        </p>
        <Button to="/">Back Home</Button>
      </section>

      <section className="section">
        <p className="eyebrow">Featured Articles</p>
        <h3 className="section-subtitle"></h3>
        <ArticleList articles={activeArticles} />
      </section>
    </div>
  )
}

export default ArticleListPage
