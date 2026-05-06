import React, { createContext, useState, useEffect, useContext } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

const initialProducts = [
  // 1: What's New
  { id: 101, categoryId: 1, name: "Limited Edition Varsity Jacket", price: 12500, stock: 15, sold: 0, description: "Our exclusive drop for the season, featuring premium wool blend.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 102, categoryId: 1, name: "Silk Blend Patterned Shirt", price: 6500, stock: 20, sold: 5, description: "Lightweight and breathable. Perfect for warm evenings.", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  // 2: Designers
  { id: 201, categoryId: 2, name: "Designer Asymmetric Coat", price: 24000, stock: 5, sold: 2, description: "ONLYONE signature craftsmanship. Hand-stitched with precision.", image: "https://images.unsplash.com/photo-1520975954732-57dd22299614?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 202, categoryId: 2, name: "Avant-Garde Tailored Suit", price: 35000, stock: 8, sold: 1, description: "The pinnacle of our designer collection. Unmatched tailoring.", image: "https://images.unsplash.com/photo-1594938298596-ec0ece551608?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  // 3: Summer Shop
  { id: 301, categoryId: 3, name: "Linen Resort Shirt", price: 4500, stock: 50, sold: 12, description: "100% organic linen for ultimate summer comfort.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 302, categoryId: 3, name: "Tailored Swim Shorts", price: 3200, stock: 30, sold: 8, description: "Quick-dry fabric with a tailored fit.", image: "https://images.unsplash.com/photo-1563303640-c3d69bc363ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  // 4: Clothing
  { id: 401, categoryId: 4, name: "Oversized Heavyweight Tee", price: 3500, stock: 100, sold: 45, description: "Our best-selling essential tee.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 402, categoryId: 4, name: "Essential Hoodie Black", price: 5500, stock: 80, sold: 30, description: "Premium cotton fleece hoodie.", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 403, categoryId: 4, name: "Tactical Cargo Pants", price: 4500, stock: 40, sold: 15, description: "Durable ripstop fabric with multiple utility pockets.", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  // 5: Shoes
  { id: 501, categoryId: 5, name: "Minimalist Leather Sneakers", price: 8500, stock: 25, sold: 10, description: "Full-grain Italian leather sneakers.", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 502, categoryId: 5, name: "Classic Suede Loafers", price: 12000, stock: 15, sold: 4, description: "Handcrafted suede loafers with leather soles.", image: "https://images.unsplash.com/photo-1614252339460-e14b01a0e0be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  // 6: Accessories
  { id: 601, categoryId: 6, name: "Textured Leather Cardholder", price: 2500, stock: 60, sold: 20, description: "Slim profile, holds up to 6 cards.", image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 602, categoryId: 6, name: "Silver Cuban Link Chain", price: 4200, stock: 35, sold: 18, description: "Solid 925 sterling silver, 5mm width.", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  // 7: Bags
  { id: 701, categoryId: 7, name: "Canvas Weekender Bag", price: 9500, stock: 10, sold: 3, description: "Heavy-duty canvas with leather trims.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 702, categoryId: 7, name: "Full Grain Leather Briefcase", price: 18000, stock: 8, sold: 2, description: "Professional, sleek, and ages beautifully.", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  // 8: Sunglasses
  { id: 801, categoryId: 8, name: "Classic Aviator Sunglasses", price: 3800, stock: 45, sold: 25, description: "Polarized lenses with a metal frame.", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 802, categoryId: 8, name: "Retro Square Acetate Frames", price: 4500, stock: 30, sold: 12, description: "Thick acetate frames for a bold look.", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  // 9: Watches
  { id: 901, categoryId: 9, name: "Minimalist Chronograph", price: 15000, stock: 12, sold: 6, description: "Sapphire glass, Japanese movement.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 902, categoryId: 9, name: "Automatic Steel Dive Watch", price: 28000, stock: 5, sold: 3, description: "200m water resistance, automatic movement.", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  // 10: How to Wear It
  { id: 1001, categoryId: 10, name: "Layered Autumn Lookbook", price: 22000, stock: 5, sold: 0, description: "A complete layered look perfect for transitional weather. Features our Essential Hoodie beneath the Asymmetric Coat for a striking silhouette. Pair with combat boots for an urban edge.", image: "https://images.unsplash.com/photo-1490578474895-699bc4e3f44f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  // 11: Sale
  { id: 1101, categoryId: 11, name: "Classic White Tee (Sale)", price: 1800, stock: 150, sold: 85, description: "Last season's cut at a great price.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 1102, categoryId: 11, name: "Distressed Denim (Sale)", price: 3200, stock: 20, sold: 40, description: "Final few pieces remaining.", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
];

const initialCategories = [
  { id: 1, name: "What's New", link: "/category/1" },
  { id: 2, name: "Designers", link: "/category/2" },
  { id: 3, name: "Summer Shop", link: "/category/3" },
  { id: 4, name: "Clothing", link: "/category/4" },
  { id: 5, name: "Shoes", link: "/category/5" },
  { id: 6, name: "Accessories", link: "/category/6" },
  { id: 7, name: "Bags", link: "/category/7" },
  { id: 8, name: "Sunglasses", link: "/category/8" },
  { id: 9, name: "Watches", link: "/category/9" },
  { id: 10, name: "How to Wear It", link: "/category/10" },
  { id: 11, name: "Sale", link: "/category/11" }
];

const initialHeroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "ONLYONE",
    subtitle: "You are not one of many. You are ONLYONE."
  }
];

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const version = localStorage.getItem('app_version_v4');
    if (!version) {
      localStorage.setItem('app_version_v4', 'true');
      return initialProducts;
    }
    const saved = localStorage.getItem('onlyone_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('onlyone_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [categories, setCategories] = useState(() => {
    const version = localStorage.getItem('app_version_v4');
    if (!version) {
      return initialCategories;
    }
    const saved = localStorage.getItem('onlyone_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [heroSlides, setHeroSlides] = useState(() => {
    const saved = localStorage.getItem('onlyone_hero_slides');
    return saved ? JSON.parse(saved) : initialHeroSlides;
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('onlyone_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('onlyone_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('onlyone_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('onlyone_hero_slides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addCategory = (category) => {
    const id = Date.now();
    const link = category.link && category.link !== '#' ? category.link : `/category/${id}`;
    setCategories(prev => [...prev, { ...category, link, id }]);
  };

  const updateCategory = (id, updatedCategory) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedCategory } : c));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const addSlide = (slide) => {
    setHeroSlides(prev => [...prev, { ...slide, id: Date.now() }]);
  };

  const updateSlide = (id, updatedSlide) => {
    setHeroSlides(prev => prev.map(s => s.id === id ? { ...s, ...updatedSlide } : s));
  };

  const deleteSlide = (id) => {
    setHeroSlides(prev => prev.filter(s => s.id !== id));
  };

  const processOrder = (orderItems) => {
    // Deduct stock and increment sold count
    setProducts(prev => {
      const updated = [...prev];
      orderItems.forEach(item => {
        const pIndex = updated.findIndex(p => p.id === item.id);
        if (pIndex !== -1) {
          updated[pIndex] = {
            ...updated[pIndex],
            stock: Math.max(0, updated[pIndex].stock - item.quantity),
            sold: (updated[pIndex].sold || 0) + item.quantity
          };
        }
      });
      return updated;
    });
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider value={{
      products, cart, addToCart, removeFromCart, updateQuantity, clearCart,
      addProduct, updateProduct, deleteProduct, cartTotal, cartCount,
      isCartOpen, setIsCartOpen,
      categories, addCategory, updateCategory, deleteCategory,
      heroSlides, addSlide, updateSlide, deleteSlide,
      processOrder
    }}>
      {children}
    </ShopContext.Provider>
  );
};
