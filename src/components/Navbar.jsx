import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const { cartCount, setIsCartOpen } = useShop();

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
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
    </header>
  );
};

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '80px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--gray-light)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
