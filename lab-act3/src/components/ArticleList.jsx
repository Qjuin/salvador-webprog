import Button from './Button'

const ArticleList = ({ articles }) => {
  return (
    <div className="article-grid">
      {articles.map((article, index) => (
        <article key={article.name} className="article-card">
          <img className="article-card__thumb" src={article.image} alt={`${article.title} artwork`} loading="lazy" />
          <p className="article-card__label">Article {String(index + 1).padStart(2, '0')}</p>
          <h3 className="article-card__title">{article.title}</h3>
          <p className="article-card__excerpt">{article.content[0].substring(0, 120)}...</p>
          <Button to={`/articles/${article.name}`}>Read More</Button>
        </article>
      ))}
    </div>
  )
}

export default ArticleList
