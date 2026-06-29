import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { image, name, price, currency = '₹', id } = product || {};

  return (
    <div className="card product-card text-light border-0" style={{ background: '#121216' }}>
      <div style={{ position: 'relative' }}>
        <img src={image} className="card-img-top product-img" alt={name} />
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <div>
            <h5 className="card-title mb-1">{name || 'Product'}</h5>
            <p className="card-text text-muted small mb-0">{product?.category || 'Featured'}</p>
          </div>
          <p className="card-text fw-bold mb-0">{currency}{price ?? '0.00'}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Link to={`/product/${id}`} className="btn btn-sm btn-outline-light">View</Link>
          <Link to={`/product/${id}`} className="btn btn-sm btn-pink">
            Select size
          </Link>
        </div>
      </div>
    </div>
  );
}
