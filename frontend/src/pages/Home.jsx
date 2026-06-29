import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="shop-page">
      <Header />

      <main>
        {/* ─── Hero ─── */}
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

        {/* ─── Collage banners ─── */}
        <section className="banner-stack">
          <div className="collage-block">
            <div className="collage-grid">
              <div className="collage-main" style={{ backgroundImage: 'url("/images/products/jackets/black-fitted-hoodie.jpeg")' }} />
              <div className="collage-side">
                <div className="collage-sm" style={{ backgroundImage: 'url("/images/products/jackets/cherry-red-winter-jacket.jpeg")' }} />
                <div className="collage-sm" style={{ backgroundImage: 'url("/images/products/jackets/faux-fur-golden-brown-jacket-coat.jpeg")' }} />
              </div>
            </div>
            <div className="banner-overlay" />
            <div className="banner-caption">
              <span className="banner-tag">// 01</span>
              <h2>404 Angel</h2>
            </div>
          </div>

          <div className="collage-block">
            <div className="collage-grid">
              <div className="collage-side">
                <div className="collage-sm" style={{ backgroundImage: 'url("/images/products/bottoms/bootcut-blue-denim-pants.jpeg")' }} />
                <div className="collage-sm" style={{ backgroundImage: 'url("/images/products/bottoms/grunge-baggy-jeans-black.jpeg")' }} />
              </div>
              <div className="collage-main" style={{ backgroundImage: 'url("/images/products/bottoms/lace-cut-blue-denim-pants.jpeg")' }} />
            </div>
            <div className="banner-overlay" />
            <div className="banner-caption">
              <span className="banner-tag">// 02</span>
              <h2>Pink Panic</h2>
            </div>
          </div>

          <div className="collage-block">
            <div className="collage-triptych">
              <div className="collage-tall" style={{ backgroundImage: 'url("/images/products/tops/black-lace-top.jpeg")' }} />
              <div className="collage-tall" style={{ backgroundImage: 'url("/images/products/tops/cherry-red-deep-neck-top.jpeg")' }} />
              <div className="collage-tall" style={{ backgroundImage: 'url("/images/products/tops/y2k-black-emmbroidered-top.jpeg")' }} />
            </div>
            <div className="banner-overlay" />
            <div className="banner-caption">
              <span className="banner-tag">// 03</span>
              <h2>Glitter Graveyard</h2>
            </div>
          </div>

          <div className="collage-block">
            <div className="collage-grid">
              <div className="collage-main" style={{ backgroundImage: 'url("/images/products/accessories/leopard-y2k-handbag.jpeg")' }} />
              <div className="collage-side">
                <div className="collage-sm" style={{ backgroundImage: 'url("/images/products/accessories/gold-plated-swan-necklace.jpeg")' }} />
                <div className="collage-sm" style={{ backgroundImage: 'url("/images/products/accessories/fairy-coded-arm-bracelet.jpeg")' }} />
              </div>
            </div>
            <div className="banner-overlay" />
            <div className="banner-caption">
              <span className="banner-tag">// 04</span>
              <h2>Bubblegum Breakdown</h2>
            </div>
          </div>

          <div className="collage-block">
            <div className="collage-triptych">
              <div className="collage-tall" style={{ backgroundImage: 'url("/images/products/footwear/black-high-heeled-boots-leather.jpeg")' }} />
              <div className="collage-tall" style={{ backgroundImage: 'url("/images/products/footwear/cherry-red-platform-boots-leather.jpeg")' }} />
              <div className="collage-tall" style={{ backgroundImage: 'url("/images/products/footwear/slouch-boots-black.jpeg")' }} />
            </div>
            <div className="banner-overlay" />
            <div className="banner-caption">
              <span className="banner-tag">// 05</span>
              <h2>Dollhouse Damage</h2>
            </div>
          </div>

          <div className="collage-block">
            <div className="collage-grid-rev">
              <div className="collage-side">
                <div className="collage-sm" style={{ backgroundImage: 'url("/images/products/jackets/black-leather-jacket-with-fur-on-insides-and-sleeves.jpeg")' }} />
                <div className="collage-sm collage-wide" style={{ backgroundImage: 'url("/images/products/jackets/brown-black-checked-blazer.jpeg")' }} />
              </div>
              <div className="collage-main" style={{ backgroundImage: 'url("/images/products/tops/pink-tank-top.jpeg")' }} />
            </div>
            <div className="banner-overlay" />
            <div className="banner-caption">
              <span className="banner-tag">// 06</span>
              <h2>Glitch Girl</h2>
            </div>
          </div>

          <div className="collage-block">
            <div className="collage-mosaic">
              <div className="mosaic-main" style={{ backgroundImage: 'url("/images/products/bottoms/embroided-blue-denim.jpeg")' }} />
              <div className="mosaic-strip">
                <div className="mosaic-sm" style={{ backgroundImage: 'url("/images/products/footwear/studded-wellington-boots-black.jpeg")' }} />
                <div className="mosaic-sm" style={{ backgroundImage: 'url("/images/products/accessories/leopard-printed-bangles.jpeg")' }} />
                <div className="mosaic-sm" style={{ backgroundImage: 'url("/images/products/tops/white-long-sweater.jpeg")' }} />
              </div>
            </div>
            <div className="banner-overlay" />
            <div className="banner-caption">
              <span className="banner-tag">// 07</span>
              <h2>Velvet Vandal</h2>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="footer-brand" style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
          <div className="logo-large">SHOPEZ®</div>
          <p style={{ maxWidth: 480, margin: '0.5rem auto 0', color: '#888', fontSize: '0.85rem' }}>
            Curating the intersection of street utility and cyber-subculture.
          </p>
          <div className="footer-strip">
            <span>// GRUNGE BADDIES // Y2K // CYBER // DARK ROMANCE // STATIC PULSE //</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
