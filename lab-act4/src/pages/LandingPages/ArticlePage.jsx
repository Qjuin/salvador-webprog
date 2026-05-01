import { useParams } from 'react-router-dom'
import Button from '../../components/Button'
import articles from '../../assets/article-content'

function ArticlePage() {
  const { name } = useParams()
  const article = articles.find((item) => item.name === name)

  if (!article) {
    return (
      <section className="section">
        <h2>Trainer note not found</h2>
        <Button to="/articles">Back to Articles</Button>
      </section>
    )
  }

  return (
    <div>
      <section className="section article-header">
        <Button to="/articles">Back to Articles</Button>
        <div className="article-header__meta">
          <p className="eyebrow">Pokemon Guide</p>
          <h2>{article.title}</h2>
          <p className="muted">{article.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
        </div>
      </section>

      <section className="section article-body">
        <img className="article-hero" src={article.image} alt={`${article.title} artwork`} />
        <div className="article-paragraphs">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="article-end">
          {article.moreInfoLink.startsWith('http') ? (
            <a className="btn" href={article.moreInfoLink} target="_blank" rel="noreferrer">
              Click here for more info
            </a>
          ) : (
            <Button to={article.moreInfoLink}>Click here for more info</Button>
          )}
        </div>
      </section>
    </div>
  )
}

export default ArticlePage
