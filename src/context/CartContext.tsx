import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ToastType {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface CartContextType {
  cart: CartItem[];
  wishlist: any[];
  compareList: any[];
  toasts: ToastType[];
  theme: 'light' | 'dark';
  addToCart: (item: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  addToWishlist: (item: any) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  addToCompare: (item: any) => void;
  removeFromCompare: (id: number) => void;
  isInCompare: (id: number) => boolean;
  clearCompare: () => void;
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  toggleTheme: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProduct: any | null;
  setSelectedProduct: (product: any | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currency: 'USD' | 'EUR' | 'INR';
  setCurrency: (curr: 'USD' | 'EUR' | 'INR') => void;
  exchangeRate: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const RATES = { USD: 1, EUR: 0.92, INR: 83 };

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<any[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [compareList, setCompareList] = useState<any[]>(() => {
    const saved = localStorage.getItem('compareList');
    return saved ? JSON.parse(saved) : [];
  });
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'INR'>('USD');

  const exchangeRate = RATES[currency];

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [theme]);

  // Toast controls
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Theme controls
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    addToast(`Switched to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, 'info');
  };

  // Wishlist controls
  const addToWishlist = (product: any) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      addToast(`${product.name} added to wishlist`, 'success');
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: number) => {
    const item = wishlist.find((i) => i.id === id);
    if (item) {
      addToast(`${item.name} removed from wishlist`, 'info');
    }
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: number) => wishlist.some((item) => item.id === id);

  // Compare controls
  const addToCompare = (product: any) => {
    if (compareList.some((item) => item.id === product.id)) {
      addToast(`${product.name} is already in comparison`, 'info');
      return;
    }
    if (compareList.length >= 3) {
      addToast('Comparison limit reached (max 3 items)', 'error');
      return;
    }
    setCompareList((prev) => [...prev, product]);
    addToast(`${product.name} added to comparison list`, 'success');
  };

  const removeFromCompare = (id: number) => {
    const item = compareList.find((i) => i.id === id);
    if (item) {
      addToast(`${item.name} removed from comparison list`, 'info');
    }
    setCompareList((prev) => prev.filter((item) => item.id !== id));
  };

  const isInCompare = (id: number) => compareList.some((item) => item.id === id);

  const clearCompare = () => {
    setCompareList([]);
    addToast('Comparison list cleared', 'info');
  };

  // Cart controls
  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      addToast(`${product.name} added to cart`, 'success');
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCart([]);
    addToast('Cart cleared', 'info');
  };

  const removeFromCart = (id: number) => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      addToast(`${item.name} removed from cart`, 'info');
    }
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      wishlist, addToWishlist, removeFromWishlist, isInWishlist,
      compareList, addToCompare, removeFromCompare, isInCompare, clearCompare,
      toasts, addToast, removeToast,
      theme, toggleTheme,
      totalItems, totalPrice, 
      isCartOpen, setIsCartOpen,
      isWishlistOpen, setIsWishlistOpen,
      isCompareOpen, setIsCompareOpen,
      isCheckoutOpen, setIsCheckoutOpen,
      selectedProduct, setSelectedProduct,
      searchQuery, setSearchQuery,
      currency, setCurrency, exchangeRate
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
