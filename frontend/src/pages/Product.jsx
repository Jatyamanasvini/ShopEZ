import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/products';

export default function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const product = getProductById(id);
  const [selectedSize, setSelectedSize] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!product) {
    return (
      <div className="shop-page">
        <Header />
        <div className="container py-5">
          <h2 className="mb-3">Product not found</h2>
          <p className="text-muted">The selected piece is not available right now.</p>
          <Link to="/shop" className="btn btn-pink mt-3">Back to shop</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    try {
      if (!isAuthenticated) {
        throw new Error('Please log in to add items to your cart.');
      }

      if (!selectedSize) {
        throw new Error('Please select a size before adding to cart.');
      }

      addToCart(product, 1, selectedSize);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="shop-page">
      <Header />
      <div className="container py-5">
        <div className="row g-5 align-items-start">
          <div className="col-lg-6">
            <img src={product.image} alt={product.name} className="product-image" style={{ width: '100%', height: '520px' }} />
          </div>
          <div className="col-lg-6">
            <p className="text-muted text-uppercase small">{product.category}</p>
            <h2 className="mb-3">{product.name}</h2>
            <p className="lead text-light">{product.description}</p>
            <p className="display-6 mt-4">{product.currency}{product.price}</p>
            <div className="mt-4">
              <p className="text-uppercase small text-muted mb-2">Select size</p>
              <div className="d-flex flex-wrap gap-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    className={`btn btn-sm ${selectedSize === size ? 'btn-pink' : 'btn-outline'}`}
                    onClick={() => {
                      setSelectedSize(size);
                      setErrorMessage('');
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {errorMessage ? <p className="text-danger mt-3">{errorMessage}</p> : null}
            {!isAuthenticated ? (
              <p className="text-muted mt-3">
                Browse freely, but you must <Link to="/login">log in</Link> before adding anything to your cart.
              </p>
            ) : null}
            <div className="d-flex flex-wrap gap-3 mt-4">
              <button className="btn btn-pink" onClick={handleAddToCart}>Add to cart</button>
              <Link to="/cart" className="btn btn-outline">View cart</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
