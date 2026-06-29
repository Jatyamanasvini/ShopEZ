import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { saveOrder } from "../utils/orders";

const FREEBIE = {
  id: 'shopez-charm-keychain',
  name: 'SHOPEZ Charm Keychain',
  image: '/images/products/cart/shopez-charm-keychain.jpeg',
  price: 0,
  currency: 'Free',
};

export default function Checkout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, total, clearCart, addFreebie } = useCart();
  const [message, setMessage] = useState("");
  const [showFreebie, setShowFreebie] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="shop-page">
        <Header />
        <div className="container py-5">
          <h2 className="mb-3">Checkout</h2>
          <p className="text-muted">Please log in to place an order.</p>
          <Link to="/login" className="btn btn-pink mt-3">Login</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="shop-page">
        <Header />
        <div className="container py-5">
          <h2 className="mb-3">Checkout</h2>
          <p className="text-muted">Your cart is empty.</p>
          <Link to="/shop" className="btn btn-pink mt-3">Go to shop</Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    try {
      await saveOrder(items, total);

      if (total > 5000) {
        setShowFreebie(true);
      } else {
        clearCart();
        setMessage("Order placed! Your items are being shipped.");
        setTimeout(() => navigate("/profile"), 1500);
      }
    } catch (error) {
      setMessage(error.message || "Failed to place order.");
    }
  };

  const handleClaimFreebie = () => {
    addFreebie(FREEBIE);
    clearCart();
    setShowFreebie(false);
    setMessage("Order placed! Your freebie has been added to cart.");
    setTimeout(() => navigate("/cart"), 1500);
  };

  const handleDismissFreebie = () => {
    clearCart();
    setShowFreebie(false);
    setMessage("Order placed! Your items are being shipped.");
    setTimeout(() => navigate("/profile"), 1500);
  };

  return (
    <div className="shop-page">
      <Header />
      <div className="container py-5">
        <h2 className="mb-3">Checkout</h2>
        <p className="text-muted mb-4">Review your order and place it.</p>

        <div className="card border-0 p-4 mb-4" style={{ background: "#121216" }}>
          {items.map((item) => (
            <div key={item.cartKey} className="d-flex justify-content-between mb-2">
              <span>{item.name} ({item.selectedSize}) x{item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {message ? <p className="text-success mb-3">{message}</p> : null}

        <button className="btn btn-pink" onClick={handlePlaceOrder}>
          Place order
        </button>
        <Link to="/cart" className="btn btn-outline ms-2">Back to cart</Link>
      </div>

      {/* ─── Freebie modal ─── */}
      {showFreebie && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={handleDismissFreebie}
        >
          <div
            style={{
              background: '#121216', border: '1px solid #333',
              maxWidth: 420, width: '100%', padding: '2rem',
              borderRadius: 8, textAlign: 'center', position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleDismissFreebie}
              style={{
                position: 'absolute', top: 12, right: 14,
                background: 'none', border: 'none', color: '#fff',
                fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1,
              }}
            >
              ✕
            </button>

            <img
              src={FREEBIE.image}
              alt="SHOPEZ Charm Keychain"
              style={{ width: '100%', maxHeight: 280, objectFit: 'contain', borderRadius: 6, marginBottom: '1rem' }}
            />

            <h3 style={{ color: '#ff007f', marginBottom: '0.5rem' }}>
              You earned a freebie! 🎀
            </h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Your order qualified for a FREE SHOPEZ Charm Keychain. It's been added to your cart — no extra cost!
            </p>

            <button className="btn btn-pink" onClick={handleClaimFreebie} style={{ width: '100%' }}>
              Claim my freebie
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
