const trainerBanner = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'

const team = [
  {
    name: 'Greninja',
    role: 'Fast special attacker and pivot',
    types: ['Water', 'Dark'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png',
    link: 'https://pokemondb.net/pokedex/greninja',
  },
  {
    name: 'Metagross',
    role: 'Bulky physical sweeper',
    types: ['Steel', 'Psychic'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/376.png',
    link: 'https://pokemondb.net/pokedex/metagross',
  },
  {
    name: 'Kilowattrel',
    role: 'Speed control and momentum',
    types: ['Electric', 'Flying'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/941.png',
    link: 'https://pokemondb.net/pokedex/kilowattrel',
  },
  {
    name: 'Lucario',
    role: 'Mixed offense and cleanup',
    types: ['Fighting', 'Steel'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
    link: 'https://pokemondb.net/pokedex/lucario',
  },
  {
    name: 'Garchomp',
    role: 'Ground pressure and late-game finisher',
    types: ['Dragon', 'Ground'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/445.png',
    link: 'https://pokemondb.net/pokedex/garchomp',
  },
  {
    name: 'Gengar',
    role: 'Disruption and special burst damage',
    types: ['Ghost', 'Poison'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
    link: 'https://pokemondb.net/pokedex/gengar',
  },
]

function HomePage() {
  return (
    <section className="site-section">
      <p className="pill">Trainer Profile</p>
      <h1 className="hero-title">Salvador's Active Pokemon Team</h1>
      <p className="hero-subtitle">
        Welcome to my team dashboard. This profile highlights my current lineup, each Pokemon's battle
        role, and the synergy that keeps the squad balanced in different matchups.
      </p>

      <div className="site-grid cols-2" style={{ marginTop: '1rem' }}>
        <article className="site-section trainer-panel">
          <h2 className="card-title">Battle Identity</h2>
          <p className="card-copy">
            My style combines speed, pressure, and flexible switching. The team can scout early,
            punish misplays, and close games with strong late-game threats.
          </p>
          <ul className="battle-points">
            <li>Lead options: Greninja, Kilowattrel</li>
            <li>Core wallbreakers: Lucario, Garchomp</li>
            <li>Defensive utility: Metagross resistance coverage</li>
            <li>Special threat pressure: Gengar disruption tools</li>
          </ul>
        </article>

        <img className="feature-image trainer-banner hero-mon" src={trainerBanner} alt="Pikachu profile banner" />
      </div>

      <div className="team-grid" style={{ marginTop: '1rem' }}>
        {team.map((pokemon) => (
          <a
            key={pokemon.name}
            className="card-link"
            href={pokemon.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${pokemon.name} info on PokemonDB`}
          >
            <article className="site-section team-card" style={{ padding: '1rem 1.1rem' }}>
              <img className="pokemon-art" src={pokemon.image} alt={`${pokemon.name} artwork`} loading="lazy" />
              <h2 className="card-title">{pokemon.name}</h2>
              <p className="card-copy">{pokemon.role}</p>
              <div className="type-row">
                {pokemon.types.map((type) => (
                  <span key={type} className="type-badge">
                    {type}
                  </span>
                ))}
              </div>
            </article>
          </a>
        ))}
      </div>
    </section>
  )
}

export default HomePage
