import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const stored = window.localStorage.getItem('shopez-cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem('shopez-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1, selectedSize = null) => {
    if (!selectedSize) {
      throw new Error('Please select a size before adding to cart.');
    }

    setItems((prev) => {
      const cartKey = `${product.id}-${selectedSize}`;
      const existing = prev.find((item) => item.cartKey === cartKey);

      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...prev, { ...product, quantity, selectedSize, cartKey }];
    });
  };

  const updateQuantity = (cartKey, quantity) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.cartKey !== cartKey)
        : prev.map((item) => (item.cartKey === cartKey ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartKey) => {
    setItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const clearCart = () => setItems([]);

  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
