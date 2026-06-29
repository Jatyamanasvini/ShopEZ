import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="shop-page">
      <Header />

      <main className="container">
        <section className="hero-section">
          <h1 className="hero-title">
            <span className="white-text">Static</span>
            <span className="pink-text">Pulse</span>
            <span className="number-text">002</span>
          </h1>

          <div className="hero-display">
            <div className="hero-image-wrapper">
              <img src="/images/products/jacket1.jpeg" alt="Streetwear concept" />
            </div>

            <div className="intro-split">
              <p className="intro-text">
                An exploration of urban decay and digital artifacts through raw denim and recycled synthetics.
              </p>
              <div className="btn-group">
                <Link to="/shop" className="btn btn-pink">Explore Collection</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand" style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div className="logo-large">SHOPEZ®</div>
          <p style={{ maxWidth: 480, margin: '0.5rem auto 0', color: '#888' }}>Curating the intersection of street utility and cyber-subculture.</p>
        </div>
      </footer>
    </div>
  );
}
