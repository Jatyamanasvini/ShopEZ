import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();

  return (
    <div className="shop-page">
      <Header />
      <div className="container py-5">
        <h2 className="mb-3">Cart</h2>
        <p style={{ color: '#fff' }}>Your selected pieces are waiting for the final checkout.</p>

        {items.length === 0 ? (
          <div className="py-5">
            <p style={{ color: '#fff' }}>Your cart is empty.</p>
            <Link to="/shop" className="btn btn-pink mt-3">Browse collection</Link>
          </div>
        ) : (
          <div className="row g-4 mt-2">
            <div className="col-lg-8">
              {items.map((item) => (
                <div key={item.cartKey} className="card border-0 mb-3" style={{ background: '#121216' }}>
                  <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <img src={item.image} alt={item.name} style={{ width: 72, height: 72, objectFit: 'cover' }} />
                      <div>
                        <h5 className="mb-1">{item.name}</h5>
                        <p style={{ color: '#fff', fontSize: '0.85rem' }} className="mb-0">{item.category} · Size {item.selectedSize}</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-sm btn-outline-light" onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button className="btn btn-sm btn-outline-light" onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}>+</button>
                      </div>
                      <p className="mb-0 fw-bold">{item.currency || '₹'}{item.price * item.quantity}</p>
                      <button className="btn btn-sm btn-outline-light" onClick={() => removeFromCart(item.cartKey)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-4">
              <div className="card border-0" style={{ background: '#121216' }}>
                <div className="card-body">
                  <h5 className="mb-3">Summary</h5>
                  <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><span>{'₹'}{total}</span></div>
                  <div className="d-flex justify-content-between mb-2"><span>Shipping</span><span>Free</span></div>
                  <div className="d-flex justify-content-between fw-bold mt-3"><span>Total</span><span>{'₹'}{total}</span></div>
                  <Link to="/checkout" className="btn btn-pink w-100 mt-4">Checkout</Link>
                  <button className="btn btn-outline w-100 mt-2" onClick={clearCart}>Clear cart</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
