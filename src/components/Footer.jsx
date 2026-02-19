import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-name">Luxury</div>
          <p>Premium car rental in Los Angeles. Mercedes-AMG, Porsche, Ferrari, Lamborghini and more, delivered to your door.</p>
          <div className="footer-addr">
            8900 Sunset Blvd, Suite 210<br />
            Los Angeles, CA 90069, USA<br />
            <br />
            +1 (323) 555-7952<br />
            info@luxury.com
          </div>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <Link to="/cars">Cars</Link>
          <a href="#">Rental Terms</a>
          <a href="#">How to Rent</a>
          <a href="#">Testimonials</a>
          <a href="#">News</a>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <a href="#">Rent a Car</a>
          <a href="#">Return Info</a>
          <a href="#">Driver's Help</a>
        </div>

        <div className="footer-newsletter">
          <h4>Stay up to date with latest news &amp; special offers</h4>
          <p>Subscribe to our newsletter. No spam, ever.</p>
          <div className="newsletter-form">
            <input
              type="email"
              className="newsletter-input"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="pill-btn white"
              style={{ padding: '0.6rem 1rem', fontSize: '0.78rem', flexShrink: 0 }}
              onClick={() => { if (email) { alert('Subscribed!'); setEmail('') } }}
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Luxury. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'inherit' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
