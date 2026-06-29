import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const COUPONS = [
  { id: 'SAVE5', label: 'SAVE5', discount: 0.05, minOrder: 2000, desc: '5% OFF on orders above ₹2000' },
  { id: 'SAVE10', label: 'SAVE10', discount: 0.10, minOrder: 5000, desc: '10% OFF on orders above ₹5000' },
  { id: 'SAVE15', label: 'SAVE15', discount: 0.15, minOrder: 8000, desc: '15% OFF on orders above ₹8000' },
];

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const [showCoupons, setShowCoupons] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const eligibleCoupons = COUPONS.filter((c) => total >= c.minOrder);
  const discount = appliedCoupon ? Math.round(total * appliedCoupon.discount) : 0;
  const finalTotal = total - discount;

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
                        {item.price === 0 ? (
                          <span className="badge" style={{ background: '#ff007f', color: '#fff', padding: '0.25rem 0.6rem', fontSize: '0.65rem' }}>FREEBIE</span>
                        ) : (
                          <>
                            <button className="btn btn-sm btn-outline-light" onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button className="btn btn-sm btn-outline-light" onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}>+</button>
                          </>
                        )}
                      </div>
                      <p className="mb-0 fw-bold">{item.price === 0 ? 'Free' : `${item.currency || '₹'}${item.price * item.quantity}`}</p>
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
                  <div className="d-flex justify-content-between mb-2" style={{ color: '#fff' }}><span>Subtotal</span><span>{'₹'}{total}</span></div>
                  <div className="d-flex justify-content-between mb-2" style={{ color: '#fff' }}><span>Shipping</span><span>Free</span></div>

                  {appliedCoupon && (
                    <div className="d-flex justify-content-between mb-2" style={{ color: '#fff' }}>
                      <span>Coupon ({appliedCoupon.label})</span>
                      <span style={{ color: '#4ade80' }}>-₹{discount}</span>
                    </div>
                  )}

                  <hr style={{ borderColor: '#333' }} />
                  <div className="d-flex justify-content-between fw-bold mt-3" style={{ color: '#fff', fontSize: '1.15rem' }}>
                    <span>Total</span>
                    <span>{'₹'}{finalTotal}</span>
                  </div>

                  <button
                    className="btn w-100 mt-3"
                    style={{ background: '#1e1e24', color: '#fff', border: '1px solid #333' }}
                    onClick={() => setShowCoupons((v) => !v)}
                  >
                    {showCoupons ? 'Hide coupons' : 'Apply coupon'}
                  </button>

                  {showCoupons && (
                    <div className="mt-3" style={{ background: '#0e0f10', borderRadius: 6, padding: '0.75rem' }}>
                      {eligibleCoupons.length === 0 ? (
                        <p style={{ color: '#fff', fontSize: '0.8rem', margin: 0 }}>
                          Add more items to unlock coupons (min ₹2000).
                        </p>
                      ) : (
                        eligibleCoupons.map((c) => (
                          <div
                            key={c.id}
                            onClick={() => { setAppliedCoupon(c); setShowCoupons(false); }}
                            style={{
                              padding: '0.6rem 0.75rem',
                              marginBottom: 6,
                              background: appliedCoupon?.id === c.id ? '#1e1e24' : 'transparent',
                              border: appliedCoupon?.id === c.id ? '1px solid #ff007f' : '1px solid #2a2a32',
                              borderRadius: 4,
                              cursor: 'pointer',
                              color: '#fff',
                            }}
                          >
                            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{c.label}</div>
                            <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{c.desc}</div>
                          </div>
                        ))
                      )}
                      {appliedCoupon && (
                        <button
                          className="btn btn-sm w-100 mt-2"
                          style={{ border: '1px solid #555', color: '#fff', fontSize: '0.75rem' }}
                          onClick={() => { setAppliedCoupon(null); setShowCoupons(true); }}
                        >
                          Remove coupon
                        </button>
                      )}
                    </div>
                  )}

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
