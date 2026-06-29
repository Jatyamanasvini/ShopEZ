import { Link } from "react-router-dom";
import Header from "../components/Header";
import OrderList from "../components/OrderList";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="shop-page">
        <Header />

        <div className="container py-5">
          <h2 className="mb-3" style={{ color: "#ffffff" }}>
            Profile
          </h2>

          <p style={{ color: "#ffffff" }}>
            Please log in to view your profile.
          </p>

          <Link 
            to="/login" 
            className="btn btn-pink mt-3"
            style={{ color: "#ffffff" }}
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <Header />

      <div className="container py-5">
        <h2 className="mb-3" style={{ color: "#ffffff" }}>
          Profile
        </h2>

        <div
          className="card border-0 p-4 mb-4"
          style={{ 
            background: "#121216",
            color: "#ffffff"
          }}
        >
          <p className="mb-1" style={{ color: "#ffffff" }}>
            <strong>Name:</strong> {user.name}
          </p>

          <p className="mb-0" style={{ color: "#ffffff" }}>
            <strong>Role:</strong> {user.role}
          </p>
        </div>

        <h4 className="mb-3" style={{ color: "#ffffff" }}>
          My Orders
        </h4>

        <OrderList />
      </div>
    </div>
  );
}