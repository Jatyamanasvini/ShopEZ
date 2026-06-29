import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="nav-left">
        <Link to="/" className="logo">SHOPEZ</Link>
        <ul className="nav-links">
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/category/jackets">Jackets</Link></li>
          <li><Link to="/category/bottoms">Bottoms</Link></li>
          <li><Link to="/category/tops">Tops</Link></li>
          <li><Link to="/category/accessories">Accessories</Link></li>
          <li><Link to="/category/footwear">Footwear</Link></li>
        </ul>
      </div>
      <div className="nav-right">
        {isAuthenticated ? (
          <>
            <Link to="/profile">{user?.name || "Profile"}</Link>
            <Link to="/orders">Orders</Link>
            {user?.role === "admin" ? <Link to="/admin">Admin</Link> : null}
            <button type="button" className="btn btn-link text-light p-0 border-0" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/cart">Cart ({cartCount})</Link>
      </div>
    </header>
  );
}
