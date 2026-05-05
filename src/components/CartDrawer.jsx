import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useShop();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div style={styles.overlay} onClick={() => setIsCartOpen(false)} />
      <div style={styles.drawer}>
        <div style={styles.header}>
          <h2 style={{ fontSize: '20px' }}>Your Cart ({cart.length})</h2>
          <button onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div style={styles.body}>
          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <ShoppingBag size={48} color="var(--gray)" style={{ marginBottom: '16px' }} />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div style={styles.cartList}>
              {cart.map(item => (
                <div key={item.id} style={styles.cartItem}>
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                  <div style={styles.itemDetails}>
                    <h4 style={styles.itemName}>{item.name}</h4>
                    <p style={styles.itemPrice}>{item.price} BDT</p>
                    
                    <div style={styles.quantityControls}>
                      <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span style={styles.qty}>{item.quantity}</span>
                      <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.totalRow}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 'bold' }}>{cartTotal} BDT</span>
            </div>
            <p style={styles.taxNote}>Shipping calculated at checkout</p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    maxWidth: '400px',
    height: '100%',
    backgroundColor: 'var(--white)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
    animation: 'slideIn 0.3s ease forwards',
  },
  header: {
    padding: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--gray-light)',
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
  },
  emptyCart: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--gray)',
  },
  cartList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  cartItem: {
    display: 'flex',
    gap: '16px',
    position: 'relative',
  },
  itemImage: {
    width: '80px',
    height: '100px',
    objectFit: 'cover',
  },
  itemDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  itemName: {
    fontSize: '14px',
    marginBottom: '4px',
  },
  itemPrice: {
    fontSize: '14px',
    color: 'var(--gray)',
    marginBottom: 'auto',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--gray-light)',
    width: 'fit-content',
    marginTop: '12px',
  },
  qtyBtn: {
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    padding: '0 12px',
    fontSize: '14px',
    fontWeight: '500',
  },
  removeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'var(--gray)',
  },
  footer: {
    padding: '24px',
    borderTop: '1px solid var(--gray-light)',
    backgroundColor: 'var(--white)',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    marginBottom: '8px',
  },
  taxNote: {
    fontSize: '12px',
    color: 'var(--gray)',
    marginBottom: '16px',
  }
};

export default CartDrawer;
