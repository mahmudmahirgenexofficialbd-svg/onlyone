import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.grid}>
          <div>
            <h3 style={styles.brand}>ONLYONE</h3>
            <p style={styles.text}>You are not one of many. You are ONLYONE.</p>
          </div>
          <div>
            <h4 style={styles.heading}>Links</h4>
            <ul style={styles.list}>
              <li><Link to="/">Shop</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={styles.heading}>Contact</h4>
            <ul style={styles.list}>
              <li style={styles.text}>support@onlyone.com</li>
              <li style={styles.text}>Chittagong, Bangladesh</li>
            </ul>
          </div>
        </div>
        <div style={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} ONLYONE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'var(--black)',
    color: 'var(--white)',
    padding: '80px 0 40px',
    marginTop: 'auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    marginBottom: '60px',
  },
  brand: {
    fontSize: '24px',
    marginBottom: '16px',
  },
  heading: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  text: {
    color: 'var(--gray)',
    fontSize: '14px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    color: 'var(--gray)',
    fontSize: '14px',
  },
  bottom: {
    borderTop: '1px solid var(--gray-dark)',
    paddingTop: '24px',
    textAlign: 'center',
    color: 'var(--gray)',
    fontSize: '12px',
  }
};

export default Footer;
