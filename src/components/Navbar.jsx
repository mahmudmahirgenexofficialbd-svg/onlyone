import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const { cartCount, setIsCartOpen, categories } = useShop();

  return (
    <header style={styles.header}>
      <div className="container" style={styles.topRow}>
        <div style={styles.logo}>
          <Link to="/">ONLYONE</Link>
        </div>
        
        <nav style={styles.nav}>
          <button style={styles.iconBtn} onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={24} />
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </button>
          <Link to="/admin" style={{...styles.iconBtn, marginLeft: '16px'}}>
            <User size={24} />
          </Link>
        </nav>
      </div>

      <div style={styles.bottomRow}>
        <div className="container" style={styles.categoriesContainer}>
          {categories.map(category => (
            <Link key={category.id} to={category.link} style={styles.categoryLink}>
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '120px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--gray-light)',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
  },
  bottomRow: {
    height: '40px',
    borderTop: '1px solid var(--gray-light)',
    display: 'flex',
    alignItems: 'center',
  },
  categoriesContainer: {
    display: 'flex',
    gap: '24px',
    overflowX: 'auto',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE/Edge
  },
  categoryLink: {
    fontSize: '13px',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--black)',
    whiteSpace: 'nowrap',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '2px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  iconBtn: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: 'var(--black)',
    color: 'var(--white)',
    fontSize: '10px',
    fontWeight: 'bold',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default Navbar;
