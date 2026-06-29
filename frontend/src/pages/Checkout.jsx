import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { saveOrder } from "../utils/orders";

export default function Checkout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, total, clearCart } = useCart();
  const [message, setMessage] = useState("");

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
      clearCart();
      setMessage("Order placed! Your items are being shipped.");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      setMessage(error.message || "Failed to place order.");
    }
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
    </div>
  );
}
