import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Invoice = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrder = localStorage.getItem('onlyone_last_order');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!order) return null;

  return (
    <div className="section container">
      <div style={styles.invoiceWrapper}>
        <div className="text-center mb-4">
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>ONLYONE</h1>
          <p style={{ color: 'var(--gray)' }}>Order Confirmation</p>
        </div>

        <div style={styles.header}>
          <div>
            <p style={styles.label}>Order Number</p>
            <p style={styles.value}>{order.id}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={styles.label}>Date</p>
            <p style={styles.value}>{new Date(order.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div style={styles.customerInfo}>
          <h3 className="mb-2">Shipping Details</h3>
          <p>{order.customer.fullName}</p>
          <p>{order.customer.phone}</p>
          <p>{order.customer.address}</p>
          <p>{order.customer.deliveryZone === 'inside' ? 'Inside Chittagong' : 'Outside Chittagong'}</p>
        </div>

        <div style={styles.itemsList}>
          <div style={styles.tableHeader}>
            <span style={{ flex: 2 }}>Item</span>
            <span style={{ flex: 1, textAlign: 'center' }}>Qty</span>
            <span style={{ flex: 1, textAlign: 'right' }}>Price</span>
          </div>
          
          {order.items.map(item => (
            <div key={item.id} style={styles.tableRow}>
              <span style={{ flex: 2 }}>{item.name}</span>
              <span style={{ flex: 1, textAlign: 'center' }}>{item.quantity}</span>
              <span style={{ flex: 1, textAlign: 'right' }}>{item.price * item.quantity} BDT</span>
            </div>
          ))}
        </div>

        <div style={styles.totals}>
          <div style={styles.totalRow}>
            <span>Subtotal</span>
            <span>{order.subtotal} BDT</span>
          </div>
          <div style={styles.totalRow}>
            <span>Delivery Charge</span>
            <span>{order.deliveryCharge} BDT</span>
          </div>
          <div style={{ ...styles.totalRow, ...styles.grandTotal }}>
            <span>Total Paid</span>
            <span>{order.total} BDT</span>
          </div>
        </div>

        <div className="text-center mt-5" style={{ marginTop: '40px' }}>
          <p style={{ marginBottom: '24px', color: 'var(--gray)' }}>Thank you for shopping with ONLYONE.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  invoiceWrapper: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px',
    border: '1px solid var(--black)',
    backgroundColor: 'var(--white)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '24px',
    borderBottom: '2px solid var(--black)',
    marginBottom: '32px',
  },
  label: {
    fontSize: '12px',
    color: 'var(--gray)',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  value: {
    fontSize: '16px',
    fontWeight: '600',
  },
  customerInfo: {
    marginBottom: '40px',
  },
  itemsList: {
    marginBottom: '32px',
  },
  tableHeader: {
    display: 'flex',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--gray)',
    fontWeight: '600',
    fontSize: '14px',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  tableRow: {
    display: 'flex',
    paddingBottom: '16px',
    marginBottom: '16px',
    borderBottom: '1px solid var(--gray-light)',
    fontSize: '15px',
  },
  totals: {
    marginLeft: 'auto',
    width: '300px',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '15px',
  },
  grandTotal: {
    paddingTop: '16px',
    borderTop: '2px solid var(--black)',
    fontWeight: 'bold',
    fontSize: '18px',
  }
};

export default Invoice;
