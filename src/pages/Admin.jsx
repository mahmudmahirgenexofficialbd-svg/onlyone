import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, Edit, Package, DollarSign, ShoppingBag, LogOut, Plus, X, Eye } from 'lucide-react';

const Admin = () => {
  const { 
    products, addProduct, updateProduct, deleteProduct,
    categories, addCategory, updateCategory, deleteCategory,
    heroSlides, addSlide, updateSlide, deleteSlide
  } = useShop();
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });
  
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, categoryId: '', name: '', price: '', stock: '', description: '', image: '' });
  
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: '', link: '#' });

  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState({ id: null, title: '', subtitle: '', image: '' });
  
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
    setCurrentProduct({ id: null, categoryId: categories[0]?.id || '', name: '', price: '', stock: '', description: '', image: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsEditing(true);
    setIsCategoryModalOpen(true);
  };

  const handleEditSlide = (slide) => {
    setCurrentSlide(slide);
    setIsEditing(true);
    setIsSlideModalOpen(true);
  };

  const openAddCategoryModal = () => {
    setIsEditing(false);
    setCurrentCategory({ id: null, name: '', link: '#' });
    setIsCategoryModalOpen(true);
  };

  const openAddSlideModal = () => {
    setIsEditing(false);
    setCurrentSlide({ id: null, title: '', subtitle: '', image: '' });
    setIsSlideModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToSave = { 
      ...currentProduct, 
      price: Number(currentProduct.price),
      categoryId: Number(currentProduct.categoryId),
      stock: Number(currentProduct.stock) || 0,
      sold: currentProduct.sold || 0
    };
    
    if (isEditing) {
      updateProduct(currentProduct.id, productToSave);
    } else {
      addProduct(productToSave);
    }
    setIsModalOpen(false);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (isEditing) updateCategory(currentCategory.id, currentCategory);
    else addCategory(currentCategory);
    setIsCategoryModalOpen(false);
  };

  const handleSlideSubmit = (e) => {
    e.preventDefault();
    if (isEditing) updateSlide(currentSlide.id, currentSlide);
    else addSlide(currentSlide);
    setIsSlideModalOpen(false);
  };

  const handleSlideImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCurrentSlide({ ...currentSlide, image: reader.result });
      reader.readAsDataURL(file);
    }
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
          <a href="#" style={activeTab === 'categories' ? {...styles.navLink, ...styles.navLinkActive} : styles.navLink} onClick={(e) => { e.preventDefault(); setActiveTab('categories'); }}>
            <Package size={20} /> Categories
          </a>
          <a href="#" style={activeTab === 'slides' ? {...styles.navLink, ...styles.navLinkActive} : styles.navLink} onClick={(e) => { e.preventDefault(); setActiveTab('slides'); }}>
            <Eye size={20} /> Hero Slides
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
                    <th style={styles.th}>Stock</th>
                    <th style={styles.th}>Sold</th>
                    <th style={styles.th} style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--gray)' }}>
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
                          {product.description && <p style={{fontSize: '11px', color: 'var(--gray)', margin: '4px 0 0 0', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{product.description}</p>}
                        </td>
                        <td style={styles.td}>{product.price} BDT</td>
                        <td style={styles.td}>
                          <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: product.stock > 5 ? '#e8f5e9' : '#ffebee', color: product.stock > 5 ? '#2e7d32' : '#c62828', fontWeight: 'bold' }}>
                            {product.stock}
                          </span>
                        </td>
                        <td style={styles.td}>{product.sold || 0}</td>
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

        {activeTab === 'categories' && (
          <>
            <div style={styles.sectionHeader}>
              <h2>Categories Management</h2>
              <button className="btn btn-primary" onClick={openAddCategoryModal} style={{ display: 'flex', gap: '8px' }}>
                <Plus size={18} /> Add Category
              </button>
            </div>

            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Link</th>
                    <th style={styles.th} style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', padding: '32px', color: 'var(--gray)' }}>No categories found.</td>
                    </tr>
                  ) : (
                    categories.map(category => (
                      <tr key={category.id} style={styles.tr}>
                        <td style={styles.td}><strong>{category.name}</strong></td>
                        <td style={styles.td}>{category.link}</td>
                        <td style={styles.td} style={{ textAlign: 'right' }}>
                          <button onClick={() => handleEditCategory(category)} style={styles.actionBtn}>
                            <Edit size={18} />
                          </button>
                          <button onClick={() => deleteCategory(category.id)} style={{ ...styles.actionBtn, color: '#d32f2f' }}>
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

        {activeTab === 'slides' && (
          <>
            <div style={styles.sectionHeader}>
              <h2>Hero Slides Management</h2>
              <button className="btn btn-primary" onClick={openAddSlideModal} style={{ display: 'flex', gap: '8px' }}>
                <Plus size={18} /> Add Slide
              </button>
            </div>

            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Image</th>
                    <th style={styles.th}>Title</th>
                    <th style={styles.th}>Subtitle</th>
                    <th style={styles.th} style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {heroSlides.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '32px', color: 'var(--gray)' }}>No slides found.</td>
                    </tr>
                  ) : (
                    heroSlides.map(slide => (
                      <tr key={slide.id} style={styles.tr}>
                        <td style={styles.td}>
                          <img src={slide.image} alt="Slide" style={styles.productThumbnail} />
                        </td>
                        <td style={styles.td}><strong>{slide.title}</strong></td>
                        <td style={styles.td}>{slide.subtitle}</td>
                        <td style={styles.td} style={{ textAlign: 'right' }}>
                          <button onClick={() => handleEditSlide(slide)} style={styles.actionBtn}>
                            <Edit size={18} />
                          </button>
                          <button onClick={() => deleteSlide(slide.id)} style={{ ...styles.actionBtn, color: '#d32f2f' }}>
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
                <label style={styles.label}>Category</label>
                <select 
                  name="categoryId" 
                  value={currentProduct.categoryId} 
                  onChange={handleChange} 
                  style={styles.input} 
                  className="checkout-input"
                  required
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Price (BDT)</label>
                <input type="number" name="price" required value={currentProduct.price} onChange={handleChange} style={styles.input} className="checkout-input" />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Stock (Pcs)</label>
                <input type="number" name="stock" required value={currentProduct.stock} onChange={handleChange} style={styles.input} className="checkout-input" />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description (Optional)</label>
                <textarea name="description" value={currentProduct.description || ''} onChange={handleChange} style={{...styles.input, resize: 'vertical', minHeight: '80px'}} className="checkout-input" placeholder="Useful for 'How to Wear It' section..."></textarea>
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

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3>{isEditing ? 'Edit Category' : 'Add New Category'}</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} style={styles.closeBtn}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleCategorySubmit} style={styles.modalForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Category Name</label>
                <input type="text" value={currentCategory.name} onChange={(e) => setCurrentCategory({...currentCategory, name: e.target.value})} style={styles.input} className="checkout-input" required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Link</label>
                <input type="text" value={currentCategory.link} onChange={(e) => setCurrentCategory({...currentCategory, link: e.target.value})} style={styles.input} className="checkout-input" required />
              </div>
              <div style={styles.modalFooter}>
                <button type="button" className="btn btn-outline" onClick={() => setIsCategoryModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Slide Modal */}
      {isSlideModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3>{isEditing ? 'Edit Slide' : 'Add New Slide'}</h3>
              <button onClick={() => setIsSlideModalOpen(false)} style={styles.closeBtn}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSlideSubmit} style={styles.modalForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input type="text" value={currentSlide.title} onChange={(e) => setCurrentSlide({...currentSlide, title: e.target.value})} style={styles.input} className="checkout-input" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Subtitle</label>
                <input type="text" value={currentSlide.subtitle} onChange={(e) => setCurrentSlide({...currentSlide, subtitle: e.target.value})} style={styles.input} className="checkout-input" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Slide Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleSlideImageUpload} 
                  style={{...styles.input, padding: '10px'}} 
                  className="checkout-input" 
                  required={!currentSlide.image}
                />
                {currentSlide.image && (
                  <div style={styles.imagePreview}>
                    <img src={currentSlide.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
              <div style={styles.modalFooter}>
                <button type="button" className="btn btn-outline" onClick={() => setIsSlideModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
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
    marginTop: '-120px', // offset navbar
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
    marginTop: '-120px', // override global nav
    paddingTop: '120px', // space for global nav
  },
  sidebar: {
    width: '260px',
    backgroundColor: 'var(--black)',
    color: 'var(--white)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: 'calc(100vh - 120px)',
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
