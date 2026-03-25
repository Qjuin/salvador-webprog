import './App.css'

function App() {
  return (
    <main id="center">
      <header>
        <h1>Welcome to my React app</h1>
      </header>

      <section aria-labelledby="profile-heading">
        <h2 id="profile-heading">Profile</h2>
        <dl>
          <div>
            <dt>Name</dt>
            <dd>Qjuin Dominic Salvador</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <a href="mailto:salvadorq@students.national-u.edu.ph">
                salvadorq@students.national-u.edu.ph
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="about-heading">
        <h2 id="about-heading">About</h2>
        <p>
          I am a student at National University, currently pursuing a degree in
          Information Technology. I have a passion for web development and enjoy
          learning new technologies. In my free time, I like to play video games
          and watch movies.
        </p>
      </section>
    </main>
  )
}

export default App
