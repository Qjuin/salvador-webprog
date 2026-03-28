const articles = [
  {
    title: 'Pokemon strategies',
    body: 'Learn how to manage tempo, force switches, and choose safe plays based on matchup awareness, type interactions, and win conditions.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png',
    link: 'https://pokemondb.net/search?q=pokemon+strategies',
  },
  {
    title: 'Team building',
    body: 'Build teams with role balance: a reliable lead, defensive pivots, speed control, and strong closers that can finish games consistently.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/248.png',
    link: 'https://pokemondb.net/search?q=team+building',
  },
  {
    title: 'Individual Pokemon breakdowns',
    body: 'Review each Pokemon by role, preferred moves, strengths, and weaknesses so trainers can understand where each member fits in battle.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    link: 'https://pokemondb.net/pokedex',
  },
  {
    title: 'Game tips',
    body: 'Use scouting, prediction discipline, and hazard awareness to avoid risky overplays while setting up favorable turns throughout the match.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png',
    link: 'https://pokemondb.net/search?q=pokemon+game+tips',
  },
]

function ArticlePage() {
  return (
    <section className="site-section">
      <p className="pill">Trainer Notes</p>
      <h1 className="hero-title">Articles and Practical Guides</h1>
      <p className="hero-subtitle">
        Browse concise guides designed to help trainers improve battle decisions and team quality.
      </p>

      <div className="site-grid cols-2" style={{ marginTop: '1rem' }}>
        {articles.map((article) => (
          <a
            key={article.title}
            className="card-link"
            href={article.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${article.title} info on PokemonDB`}
          >
            <article className="site-section" style={{ padding: '1rem 1.1rem' }}>
              <img className="article-image" src={article.image} alt={`${article.title} visual`} loading="lazy" />
              <h2 className="card-title">{article.title}</h2>
              <p className="card-copy">{article.body}</p>
            </article>
          </a>
        ))}
      </div>
    </section>
  )
}

export default ArticlePage
