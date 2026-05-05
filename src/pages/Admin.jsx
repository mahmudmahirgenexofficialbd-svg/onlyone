import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, Edit, Package, DollarSign, ShoppingBag, LogOut, Plus, X, Eye } from 'lucide-react';

const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useShop();
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });
  
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '', price: '', image: '' });
  
  const [activeTab, setActiveTab] = useState('products');
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, ordersCount: 0 });

  useEffect(() => {
    // Load orders
    const savedOrders = JSON.parse(localStorage.getItem('onlyone_orders') || '[]');
    setOrders(savedOrders.reverse()); // latest first
    
    // Calculate stats
    const totalRev = savedOrders.reduce((sum, o) => sum + o.total, 0);
    setStats({ revenue: totalRev, ordersCount: savedOrders.length });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
  };

  const handleChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduct({ ...currentProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentProduct({ id: null, name: '', price: '', image: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct(currentProduct.id, { ...currentProduct, price: Number(currentProduct.price) });
    } else {
      addProduct({ ...currentProduct, price: Number(currentProduct.price) });
    }
    setIsModalOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.loginWrapper}>
        <div style={styles.loginBox}>
          <div style={styles.loginHeader}>
            <h2>ONLYONE</h2>
            <p>Admin Workspace</p>
          </div>
          <form onSubmit={handleLogin} style={styles.loginForm}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Access Key</label>
              <input 
                type="password" 
                placeholder="Enter password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                className="checkout-input"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.dashboardLayout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarBrand}>
          <h2>ONLYONE</h2>
          <span>Admin</span>
        </div>
        
        <nav style={styles.sidebarNav}>
          <a href="#" style={activeTab === 'products' ? {...styles.navLink, ...styles.navLinkActive} : styles.navLink} onClick={(e) => { e.preventDefault(); setActiveTab('products'); }}>
            <Package size={20} /> Products
          </a>
          <a href="#" style={activeTab === 'orders' ? {...styles.navLink, ...styles.navLinkActive} : styles.navLink} onClick={(e) => { e.preventDefault(); setActiveTab('orders'); }}>
            <ShoppingBag size={20} /> Orders
          </a>
        </nav>
        
        <div style={styles.sidebarFooter}>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1 style={{ fontSize: '24px' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--gray)' }}>Manage your store and monitor performance.</p>
        </header>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}><Package size={24} /></div>
            <div>
              <p style={styles.statLabel}>Total Products</p>
              <h3 style={styles.statValue}>{products.length}</h3>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}><ShoppingBag size={24} /></div>
            <div>
              <p style={styles.statLabel}>Total Orders</p>
              <h3 style={styles.statValue}>{stats.ordersCount}</h3>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}><DollarSign size={24} /></div>
            <div>
              <p style={styles.statLabel}>Revenue</p>
              <h3 style={styles.statValue}>{stats.revenue} BDT</h3>
            </div>
          </div>
        </div>

        {activeTab === 'products' && (
          <>
            <div style={styles.sectionHeader}>
              <h2>Products Management</h2>
              <button className="btn btn-primary" onClick={openAddModal} style={{ display: 'flex', gap: '8px' }}>
                <Plus size={18} /> Add Product
              </button>
            </div>

            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Image</th>
                    <th style={styles.th}>Product Name</th>
                    <th style={styles.th}>Price (BDT)</th>
                    <th style={styles.th} style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '32px', color: 'var(--gray)' }}>
                        No products found. Add some!
                      </td>
                    </tr>
                  ) : (
                    products.map(product => (
                      <tr key={product.id} style={styles.tr}>
                        <td style={styles.td}>
                          <img src={product.image} alt={product.name} style={styles.productThumbnail} />
                        </td>
                        <td style={styles.td}>
                          <strong>{product.name}</strong>
                        </td>
                        <td style={styles.td}>{product.price} BDT</td>
                        <td style={styles.td} style={{ textAlign: 'right' }}>
                          <button onClick={() => handleEdit(product)} style={styles.actionBtn}>
                            <Edit size={18} />
                          </button>
                          <button onClick={() => deleteProduct(product.id)} style={{ ...styles.actionBtn, color: '#d32f2f' }}>
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <>
            <div style={styles.sectionHeader}>
              <h2>Orders Management</h2>
            </div>

            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Order ID</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Items</th>
                    <th style={styles.th} style={{ textAlign: 'right' }}>Total (BDT)</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: 'var(--gray)' }}>
                        No orders yet.
                      </td>
                    </tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order.id} style={styles.tr}>
                        <td style={styles.td}><strong>{order.id}</strong></td>
                        <td style={styles.td}>{new Date(order.date).toLocaleDateString()}</td>
                        <td style={styles.td}>
                          <p style={{ margin: 0, fontWeight: '500' }}>{order.customer.fullName}</p>
                          <p style={{ margin: 0, fontSize: '12px', color: 'var(--gray)' }}>{order.customer.phone}</p>
                        </td>
                        <td style={styles.td}>{order.items.length} items</td>
                        <td style={styles.td} style={{ textAlign: 'right', fontWeight: 'bold' }}>{order.total}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)} style={styles.closeBtn}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} style={styles.modalForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Product Name</label>
                <input type="text" name="name" required value={currentProduct.name} onChange={handleChange} style={styles.input} className="checkout-input" />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Price (BDT)</label>
                <input type="number" name="price" required value={currentProduct.price} onChange={handleChange} style={styles.input} className="checkout-input" />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Product Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  style={{...styles.input, padding: '10px'}} 
                  className="checkout-input" 
                  required={!currentProduct.image}
                />
                {currentProduct.image && (
                  <div style={styles.imagePreview}>
                    <img src={currentProduct.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
              
              <div style={styles.modalFooter}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  loginWrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--gray-light)',
    marginTop: '-80px', // offset navbar
  },
  loginBox: {
    backgroundColor: 'var(--white)',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  dashboardLayout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--gray-light)',
    marginTop: '-80px', // override global nav
    paddingTop: '80px', // space for global nav
  },
  sidebar: {
    width: '260px',
    backgroundColor: 'var(--black)',
    color: 'var(--white)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: 'calc(100vh - 80px)',
  },
  sidebarBrand: {
    padding: '32px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  sidebarNav: {
    flex: 1,
    padding: '24px 0',
    display: 'flex',
    flexDirection: 'column',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 24px',
    color: 'var(--gray)',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  navLinkActive: {
    color: 'var(--white)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderLeft: '3px solid var(--white)',
  },
  sidebarFooter: {
    padding: '24px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--gray)',
    cursor: 'pointer',
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
  },
  mainContent: {
    flex: 1,
    marginLeft: '260px',
    padding: '40px',
  },
  header: {
    marginBottom: '32px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    marginBottom: '48px',
  },
  statCard: {
    backgroundColor: 'var(--white)',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
    border: '1px solid var(--gray-light)',
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: 'var(--gray-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--black)',
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--gray)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '0',
    textTransform: 'none',
    margin: 0,
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  tableContainer: {
    backgroundColor: 'var(--white)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
    border: '1px solid var(--gray-light)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '16px 24px',
    borderBottom: '1px solid var(--gray-light)',
    backgroundColor: 'var(--gray-light)',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: 'var(--gray-dark)',
    letterSpacing: '0.5px',
  },
  td: {
    padding: '16px 24px',
    borderBottom: '1px solid var(--gray-light)',
    verticalAlign: 'middle',
  },
  tr: {
    transition: 'background-color 0.2s',
  },
  productThumbnail: {
    width: '40px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  actionBtn: {
    padding: '8px',
    color: 'var(--gray-dark)',
    transition: 'color 0.2s',
    marginLeft: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'fadeIn 0.2s ease',
  },
  modal: {
    backgroundColor: 'var(--white)',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
  modalHeader: {
    padding: '24px',
    borderBottom: '1px solid var(--gray-light)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    color: 'var(--gray)',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  },
  modalForm: {
    padding: '24px',
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
  },
  input: {
    padding: '12px 16px',
    border: '1px solid var(--gray)',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: 'var(--gray-light)',
  },
  imagePreview: {
    width: '80px',
    height: '100px',
    marginTop: '12px',
    border: '1px solid var(--gray-light)',
  },
  modalFooter: {
    marginTop: '12px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
  }
};

export default Admin;
