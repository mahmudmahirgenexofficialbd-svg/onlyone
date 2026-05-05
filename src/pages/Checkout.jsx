import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    deliveryZone: 'inside'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const deliveryCharge = formData.deliveryZone === 'inside' ? 80 : 120;
  const total = cartTotal + deliveryCharge;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg(''); // Clear error on type
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prevent empty fields
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Create order object and save to local storage for invoice
      const order = {
        id: `ORD-${Math.floor(Math.random() * 1000000)}`,
        date: new Date().toISOString(),
        items: [...cart],
        customer: formData,
        subtotal: cartTotal,
        deliveryCharge,
        total
      };
      
      const existingOrders = JSON.parse(localStorage.getItem('onlyone_orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('onlyone_orders', JSON.stringify(existingOrders));
      localStorage.setItem('onlyone_last_order', JSON.stringify(order));
      clearCart();
      setIsProcessing(false);
      setOrderSuccess(true);
      
      // Delay navigation to show success message
      setTimeout(() => {
        navigate('/invoice');
      }, 1500);
      
    }, 1200);
  };

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="section container text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2>Your cart is empty</h2>
        <button className="btn btn-primary" style={{ marginTop: '24px', alignSelf: 'center' }} onClick={() => navigate('/')}>
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="section container">
      {orderSuccess && (
        <div style={styles.successOverlay}>
          <div style={styles.successCard}>
            <CheckCircle size={64} color="var(--black)" className="mb-3" />
            <h2>Order Confirmed!</h2>
            <p style={{ color: 'var(--gray)', marginTop: '8px' }}>Generating your invoice...</p>
          </div>
        </div>
      )}

      <h1 className="mb-4 text-center">Checkout</h1>
      
      <div style={styles.grid}>
        <div style={styles.formSection}>
          <h3 className="mb-3">Shipping Details</h3>
          
          {errorMsg && <div style={styles.errorBanner}>{errorMsg}</div>}
          
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} style={styles.input} className="checkout-input" placeholder="e.g. John Doe" />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} style={styles.input} className="checkout-input" placeholder="017xxxxxxxx" />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Delivery Address</label>
              <textarea name="address" required value={formData.address} onChange={handleChange} style={styles.textarea} className="checkout-input" rows="3" placeholder="Street, House no..." />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Delivery Zone (Chittagong)</label>
              <div style={styles.radioGroup}>
                <label style={styles.radioLabel} className="radio-container">
                  <input type="radio" name="deliveryZone" value="inside" checked={formData.deliveryZone === 'inside'} onChange={handleChange} />
                  <span className="radio-custom"></span>
                  Inside Chittagong (80 BDT)
                </label>
                <label style={styles.radioLabel} className="radio-container">
                  <input type="radio" name="deliveryZone" value="outside" checked={formData.deliveryZone === 'outside'} onChange={handleChange} />
                  <span className="radio-custom"></span>
                  Outside Chittagong (120 BDT)
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '24px', opacity: isProcessing ? 0.7 : 1, pointerEvents: isProcessing ? 'none' : 'auto' }}
            >
              {isProcessing ? 'Processing...' : `Place Order - ${total} BDT`}
            </button>
          </form>
        </div>
        
        <div style={styles.summarySection}>
          <h3 className="mb-3">Order Summary</h3>
          <div style={styles.summaryCard}>
            {cart.map(item => (
              <div key={item.id} style={styles.summaryItem}>
                <img src={item.image} alt={item.name} style={styles.summaryImage} />
                <div style={{ flex: 1 }}>
                  <p style={styles.itemName}>{item.name}</p>
                  <p style={styles.itemQty}>Qty: {item.quantity}</p>
                </div>
                <p style={styles.itemPrice}>{item.price * item.quantity} BDT</p>
              </div>
            ))}
            
            <div style={styles.divider} />
            
            <div style={styles.totalsRow}>
              <span>Subtotal</span>
              <span>{cartTotal} BDT</span>
            </div>
            <div style={styles.totalsRow}>
              <span>Delivery Charge</span>
              <span>{deliveryCharge} BDT</span>
            </div>
            
            <div style={styles.divider} />
            
            <div style={{ ...styles.totalsRow, fontWeight: 'bold', fontSize: '18px' }}>
              <span>Total</span>
              <span>{total} BDT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '60px',
    alignItems: 'start',
  },
  formSection: {
    padding: '32px',
    border: '1px solid var(--gray-light)',
    backgroundColor: 'var(--white)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--gray-dark)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '14px 16px',
    border: '1px solid var(--gray)',
    fontSize: '16px',
    outline: 'none',
    transition: 'var(--transition)',
    backgroundColor: 'var(--gray-light)',
  },
  textarea: {
    padding: '14px 16px',
    border: '1px solid var(--gray)',
    fontSize: '16px',
    outline: 'none',
    resize: 'vertical',
    transition: 'var(--transition)',
    backgroundColor: 'var(--gray-light)',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '8px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    padding: '12px 16px',
    border: '1px solid var(--gray-light)',
    transition: 'var(--transition)',
  },
  summarySection: {
    position: 'sticky',
    top: '100px',
  },
  summaryCard: {
    backgroundColor: 'var(--gray-light)',
    padding: '32px',
  },
  summaryItem: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
  },
  summaryImage: {
    width: '60px',
    height: '80px',
    objectFit: 'cover',
  },
  itemName: {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '4px',
  },
  itemQty: {
    fontSize: '13px',
    color: 'var(--gray)',
  },
  itemPrice: {
    fontSize: '14px',
    fontWeight: '600',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--gray)',
    opacity: 0.2,
    margin: '20px 0',
  },
  totalsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '15px',
  },
  errorBanner: {
    backgroundColor: '#fff0f0',
    color: '#d32f2f',
    padding: '12px 16px',
    borderLeft: '4px solid #d32f2f',
    marginBottom: '20px',
    fontSize: '14px',
    fontWeight: '500',
  },
  successOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'fadeIn 0.3s ease',
  },
  successCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    textAlign: 'center',
  }
};

export default Checkout;
