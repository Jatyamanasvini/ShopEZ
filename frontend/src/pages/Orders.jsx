import { Link } from "react-router-dom";
import Header from "../components/Header";
import OrderList from "../components/OrderList";
import { useAuth } from "../context/AuthContext";

export default function Orders() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="shop-page">
        <Header />
        <div className="container py-5">
          <h2 className="mb-3">Orders</h2>
          <p className="text-white-50">Please log in to see your orders.</p>
          <Link to="/login" className="btn btn-pink mt-3">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <Header />
      <div className="container py-5">
        <h2 className="mb-3">Orders</h2>
        <p className="text-white-50 mb-4">Track your order status here.</p>
        <OrderList />
        <Link to="/profile" className="btn btn-outline mt-4">Back to profile</Link>
      </div>
    </div>
  );
}
