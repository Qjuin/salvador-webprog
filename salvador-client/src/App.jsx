import './App.css'

function App() {
  return (
    <main id="center">
      <header>
        <h1>Welcome to My React App!</h1>
      </header>

      <section aria-label="Personal information">
        <div style={{ display: 'inline-block', textAlign: 'left' }}>
          <p>Name: Qjuin Dominic Salvador</p>
          <p>
            Email:{' '}
            <a href="mailto:salvadorq@students.national-u.edu.ph">
              salvadorq@students.national-u.edu.ph
            </a>
          </p>
          <p>Other Personal Info: I am a student at National University.</p>
        </div>
      </section>
    </main>
  )
}

export default App
