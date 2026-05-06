import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const Landing = () => {
  const { products, heroSlides } = useShop();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (!heroSlides || heroSlides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides]);

  const currentSlide = heroSlides && heroSlides.length > 0 
    ? heroSlides[currentSlideIndex] 
    : { image: '', title: '', subtitle: '' };

  return (
    <div>
      {/* Hero Section */}
      <section 
        style={{
          ...styles.hero,
          backgroundImage: `url("${currentSlide.image}")`,
          transition: 'background-image 1s ease-in-out'
        }}
      >
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent} className="container">
          {currentSlide.title && <h1 style={styles.heroTitle}>{currentSlide.title}</h1>}
          {currentSlide.subtitle && <p style={styles.heroSubtitle}>{currentSlide.subtitle}</p>}
          <button className="btn btn-white" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
            Shop Now
          </button>
        </div>
        
        {/* Slider Indicators */}
        {heroSlides && heroSlides.length > 1 && (
          <div style={styles.indicatorsContainer}>
            {heroSlides.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentSlideIndex(index)}
                style={{
                  ...styles.indicator,
                  opacity: index === currentSlideIndex ? 1 : 0.5,
                  width: index === currentSlideIndex ? '24px' : '8px'
                }}
              />
            ))}
          </div>
        )}
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
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-120px', // Offset navbar
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
    animation: 'fadeIn 1s ease-in',
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
  },
  indicatorsContainer: {
    position: 'absolute',
    bottom: '40px',
    display: 'flex',
    gap: '8px',
    zIndex: 2,
  },
  indicator: {
    height: '8px',
    backgroundColor: 'var(--white)',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: 'none',
    padding: 0,
  }
};

export default Landing;
