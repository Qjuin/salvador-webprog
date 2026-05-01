const favoritePokemonImage =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png'
import trainerCharacterImage from '../../assets/Pokemon Trainer.png'

function AboutPage() {
  return (
    <section className="site-section">
      <p className="pill">About The Trainer</p>
      <h1 className="hero-title">Trainer Story and Mission</h1>
      <p className="hero-subtitle">
        Welcome to my Pokemon website!
      </p>

      <div className="site-grid cols-2" style={{ marginTop: '1.2rem' }}>
        <article className="site-section" style={{ padding: '1rem 1.1rem' }}>
          <img className="feature-image trainer-character" src={trainerCharacterImage} alt="Pokemon trainer character" />
          <p className="card-copy">
            I'm a Pokemon trainer who created this platform to showcase my team and share
            helpful information about Pokemon. This site acts as both a personal trainer profile and a mini
            Pokedex for anyone interested in learning more about different Pokemon, their abilities, and
            strategies.
          </p>
          <p className="card-copy">
            Here, you'll find details about my current team, including their strengths, roles, and how they
            work together in battle. I also aim to provide simple and useful information that can help other
            trainers build their own teams.
          </p>
          <p className="card-copy">
            My approach focuses on balance, strategy, and enjoying the game-not just using the strongest
            Pokemon, but creating a team that works well together.
          </p>
          <p className="card-copy">
            Thanks for visiting, and I hope this site helps you on your journey to becoming a Pokemon Master!
          </p>
        </article>

        <article className="site-section favorite-card" style={{ padding: '1rem 1.1rem' }}>
          <img className="feature-image favorite-mon" src={favoritePokemonImage} alt="Greninja artwork" />
          <h2 className="card-title" style={{ marginTop: '0.9rem' }}>
            Favorite Pokemon: Greninja
          </h2>
          <p className="card-copy">
            Greninja is my favorite because of its speed, smart pressure options, and sleek battle style.
            It represents adaptability and precision, which are both central to how I build and play teams.
          </p>
          <div className="type-row" style={{ marginTop: '0.7rem' }}>
            <span className="type-badge">Water</span>
            <span className="type-badge">Dark</span>
          </div>
        </article>
      </div>
    </section>
  )
}

export default AboutPage
