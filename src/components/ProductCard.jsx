import React from 'react';
import { useShop } from '../context/ShopContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useShop();

  return (
    <div style={styles.card} className="product-card">
      <div style={styles.imageContainer}>
        <img src={product.image} alt={product.name} className="product-image" style={styles.image} />
        <div className="product-overlay" style={styles.overlay}>
          <button className="btn btn-white" onClick={() => addToCart(product)} style={styles.addToCartBtn}>
            Add to Cart
          </button>
        </div>
      </div>
      <div style={styles.info}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.price}>{product.price} BDT</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '3/4',
    overflow: 'hidden',
    backgroundColor: 'var(--gray-light)',
    marginBottom: '16px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'var(--transition)',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '20px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
    opacity: 0,
    transition: 'var(--transition)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  addToCartBtn: {
    width: '100%',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'none',
    fontFamily: 'var(--font-sans)',
  },
  price: {
    fontSize: '14px',
    fontWeight: '600',
  }
};

export default ProductCard;
