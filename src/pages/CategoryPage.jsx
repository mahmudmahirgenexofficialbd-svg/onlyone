import { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

// ─── Special layout: Designers ───────────────────────────────────────────────
const DesignersLayout = ({ products }) => (
  <div>
    {/* Brand Banner */}
    <div style={styles.designerBanner}>
      <div style={styles.designerBannerOverlay} />
      <div style={styles.designerBannerContent}>
        <p style={styles.designerEyebrow}>THE HOUSE OF</p>
        <h1 style={styles.designerTitle}>ONLYONE</h1>
        <p style={styles.designerSubtitle}>
          We don't follow trends — we create them. ONLYONE is a Bangladeshi luxury fashion house
          that conceives, manufactures, and delivers every garment in-house. Each piece is a
          testament to obsessive craftsmanship, premium materials, and an uncompromising
          commitment to the modern man's aesthetic.
        </p>
        <div style={styles.designerStats}>
          <div style={styles.statItem}><span style={styles.statNum}>100%</span><span style={styles.statLabel}>In-House Production</span></div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}><span style={styles.statNum}>BD</span><span style={styles.statLabel}>Made in Bangladesh</span></div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}><span style={styles.statNum}>↑</span><span style={styles.statLabel}>Premium Quality</span></div>
        </div>
      </div>
    </div>

    {/* Products */}
    <div className="container section">
      <h2 style={{ textAlign: 'center', marginBottom: '48px', letterSpacing: '2px', textTransform: 'uppercase' }}>
        Our Collection
      </h2>
      <div className="grid-cols-4">
        {products.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  </div>
);

// ─── Special layout: How to Wear It ──────────────────────────────────────────
const HowToWearLayout = ({ products }) => (
  <div className="container section">
    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
      <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '12px', color: 'var(--gray)', marginBottom: '12px' }}>Style Guide</p>
      <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>How to Wear It</h1>
      <p style={{ color: 'var(--gray)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.8' }}>
        Discover how to style each piece from our collection. Editorial-quality looks, curated for the modern man.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
      {products.map((product, i) => (
        <div key={product.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', direction: i % 2 === 0 ? 'ltr' : 'rtl' }}>
          <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
              onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.target.style.transform = 'scale(1)'} />
          </div>
          <div style={{ direction: 'ltr' }}>
            <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '11px', color: 'var(--gray)', marginBottom: '20px' }}>The Look</p>
            <h2 style={{ fontSize: '28px', marginBottom: '24px', lineHeight: '1.3' }}>{product.name}</h2>
            <p style={{ color: 'var(--gray)', lineHeight: '1.9', fontSize: '15px', marginBottom: '32px' }}>
              {product.description || 'A timeless piece that anchors any wardrobe. Style it up or down — the versatility is unmatched.'}
            </p>
            <p style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>{product.price.toLocaleString()} BDT</p>
            <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={16} /> Shop This Look
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Special layout: What's New ───────────────────────────────────────────────
const WhatsNewLayout = ({ products }) => {
  const sorted = useMemo(() => [...products].sort((a, b) => b.id - a.id), [products]);
  return (
    <div className="container section">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '12px', color: 'var(--gray)', marginBottom: '12px' }}>Just Arrived</p>
        <h1 style={{ fontSize: '36px' }}>What's New</h1>
      </div>
      <div className="grid-cols-4">
        {sorted.map(p => <ProductCard key={p.id} product={p} badge="NEW" />)}
      </div>
    </div>
  );
};

// ─── Special layout: Sale ─────────────────────────────────────────────────────
const SaleLayout = ({ products, allProducts }) => {
  const navigate = useNavigate();
  const bestSellers = useMemo(() =>
    [...allProducts].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 8),
    [allProducts]
  );
  return (
    <div className="container section">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '12px', color: '#c62828', marginBottom: '12px' }}>Limited Time Offers</p>
        <h1 style={{ fontSize: '36px' }}>Sale</h1>
        <p style={{ color: 'var(--gray)', marginTop: '12px' }}>Our best-selling pieces, now at reduced prices.</p>
      </div>

      {/* Best Sellers Banner */}
      <div style={{ backgroundColor: '#111', color: '#fff', padding: '32px', marginBottom: '48px', textAlign: 'center' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '11px', color: '#aaa', marginBottom: '12px' }}>🔥 Most Popular This Season</p>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '24px', padding: '8px 0', justifyContent: 'center', flexWrap: 'wrap' }}>
          {bestSellers.map(p => (
            <div key={p.id} style={{ textAlign: 'center', minWidth: '100px' }}>
              <img src={p.image} alt={p.name} style={{ width: '80px', height: '100px', objectFit: 'cover', marginBottom: '8px' }} />
              <p style={{ fontSize: '11px', color: '#ddd' }}>{p.name.split(' ').slice(0, 3).join(' ')}</p>
              <p style={{ fontSize: '11px', color: '#aaa' }}>{p.sold || 0} sold</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-cols-4">
        {products.map(p => <ProductCard key={p.id} product={p} badge="SALE" />)}
      </div>
    </div>
  );
};

// ─── Default grid layout ──────────────────────────────────────────────────────
const DefaultLayout = ({ products, currentCategory }) => (
  <div className="container section">
    <div style={styles.header}>
      <h1 style={styles.title}>{currentCategory.name}</h1>
      <p style={styles.subtitle}>{products.length} {products.length === 1 ? 'product' : 'products'}</p>
    </div>
    {products.length > 0 ? (
      <div className="grid-cols-4">
        {products.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    ) : (
      <div style={styles.emptyState}>
        <ShoppingBag size={48} color="var(--gray)" style={{ marginBottom: '16px' }} />
        <h2>No products yet</h2>
        <p style={{ color: 'var(--gray)', marginTop: '8px' }}>Check back soon or explore other categories.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-block' }}>
          Back to Home
        </Link>
      </div>
    )}
  </div>
);

// ─── Main CategoryPage ────────────────────────────────────────────────────────
const CategoryPage = () => {
  const { categoryId } = useParams();
  const { products, categories } = useShop();

  const currentCategory = useMemo(() =>
    categories.find(c => c.id === Number(categoryId)) || { name: 'Category', id: 0 },
    [categories, categoryId]
  );

  const categoryProducts = useMemo(() =>
    products.filter(p => p.categoryId === Number(categoryId)),
    [products, categoryId]
  );

  const id = Number(categoryId);

  if (id === 1) return <WhatsNewLayout products={categoryProducts} />;
  if (id === 2) return <DesignersLayout products={categoryProducts} />;
  if (id === 10) return <HowToWearLayout products={categoryProducts} />;
  if (id === 11) return <SaleLayout products={categoryProducts} allProducts={products} />;

  return <DefaultLayout products={categoryProducts} currentCategory={currentCategory} />;
};

const styles = {
  header: { textAlign: 'center', marginBottom: '48px', borderBottom: '1px solid var(--gray-light)', paddingBottom: '24px' },
  title: { fontSize: '32px', marginBottom: '8px' },
  subtitle: { color: 'var(--gray)', fontSize: '14px' },
  emptyState: { textAlign: 'center', padding: '80px 0' },
  designerBanner: {
    position: 'relative',
    backgroundImage: 'url(https://images.unsplash.com/photo-1490578474895-699bc4e3f44f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  designerBannerOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 100%)',
  },
  designerBannerContent: {
    position: 'relative', zIndex: 1,
    color: '#fff', textAlign: 'center', maxWidth: '700px', padding: '0 24px',
  },
  designerEyebrow: { letterSpacing: '8px', fontSize: '12px', textTransform: 'uppercase', marginBottom: '16px', color: '#ccc' },
  designerTitle: { fontSize: '80px', fontWeight: '900', letterSpacing: '-2px', lineHeight: '1', marginBottom: '24px' },
  designerSubtitle: { fontSize: '16px', lineHeight: '1.9', color: '#ddd', marginBottom: '40px' },
  designerStats: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' },
  statItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
  statNum: { fontSize: '24px', fontWeight: '700' },
  statLabel: { fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#aaa' },
  statDivider: { width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.3)' },
};

export default CategoryPage;
