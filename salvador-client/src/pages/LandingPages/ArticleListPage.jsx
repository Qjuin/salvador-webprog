import Button from '../../components/Button'
import ArticleList from '../../components/ArticleList'
import articles from '../../data/article-content'

const ArticleListPage = () => {
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
        <ArticleList articles={articles} />
      </section>
    </div>
  )
}

export default ArticleListPage
