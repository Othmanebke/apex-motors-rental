function Navbar() {
  const scrollToFleet = () => {
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav>
      <div className="logo">APEX MOTORS</div>
      <ul className="nav-links">
        <li><a href="#fleet">Flotte</a></li>
        <li><a href="#features">Services</a></li>
        <li><a href="#tarifs">Tarifs</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button className="reserve-btn" onClick={scrollToFleet}>
        Réserver
      </button>
    </nav>
  )
}

export default Navbar
