import Button from '../components/Button'

const NotFoundPage = () => {
  return (
    <section className="section not-found">
      <p className="eyebrow">404 Encounter</p>
      <h2>Route Not Found</h2>
      <p className="not-found__text">
        This path is outside the trainer map. Return to base and continue exploring Pokemon guides.
      </p>
      <Button to="/">Return to Home</Button>
    </section>
  )
}

export default NotFoundPage
