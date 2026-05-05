import React from 'react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const Landing = () => {
  const { products } = useShop();

  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent} className="container">
          <h1 style={styles.heroTitle}>ONLYONE</h1>
          <p style={styles.heroSubtitle}>You are not one of many. You are ONLYONE.</p>
          <button className="btn btn-white" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="section container">
        <div className="text-center mb-5">
          <h2>Latest Collection</h2>
        </div>
        
        <div className="grid-cols-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    height: '100vh',
    minHeight: '600px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-80px', // Offset navbar
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    color: 'var(--white)',
  },
  heroTitle: {
    fontSize: '5vw',
    letterSpacing: '10px',
    marginBottom: '16px',
    lineHeight: 1,
  },
  heroSubtitle: {
    fontSize: '18px',
    letterSpacing: '2px',
    marginBottom: '40px',
    fontWeight: '300',
  }
};

export default Landing;
