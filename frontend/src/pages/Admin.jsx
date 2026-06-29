import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { apiUrl } from "../config/api";

function getToken() {
  try {
    return window.localStorage.getItem("shopez-token") || "";
  } catch {
    return "";
  }
}

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [verified, setVerified] = useState(false);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      try {
        const token = getToken();
        const headers = { Authorization: `Bearer ${token}` };

        // First: verify admin role with the server
        const verifyRes = await fetch(apiUrl("/api/admin/verify"), { headers });
        if (!verifyRes.ok) {
          logout();
          navigate("/login");
          return;
        }

        setVerified(true);

        // Then fetch all data
        const [s, o, u] = await Promise.all([
          fetch(apiUrl("/api/admin/stats"), { headers }).then((r) => { if (!r.ok) throw new Error("Failed to load stats"); return r.json(); }),
          fetch(apiUrl("/api/admin/orders"), { headers }).then((r) => { if (!r.ok) throw new Error("Failed to load orders"); return r.json(); }),
          fetch(apiUrl("/api/admin/users"), { headers }).then((r) => { if (!r.ok) throw new Error("Failed to load users"); return r.json(); }),
        ]);
        setStats(s);
        setOrders(o);
        setUsers(u);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    })();
  }, [isAuthenticated, user]);

  const handleStatus = async (orderId, status) => {
    try {
      const res = await fetch(apiUrl(`/api/admin/orders/${orderId}`), {
        method: "PATCH",
        headers: { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error((await res.json()).message || "Failed");
      const data = await res.json();
      setOrders((prev) => prev.map((o) => (o._id === orderId ? data : o)));
    } catch (e) {
      setError(e.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="shop-page">
        <Header />
        <div className="container py-5" style={{ textAlign: "center" }}>
          <h2 className="mb-3">Access Denied</h2>
          <p style={{ color: "#999" }}>Admin access only.</p>
          <Link to="/login" className="btn btn-pink mt-3">Login</Link>
        </div>
      </div>
    );
  }

  if (loading || !verified) {
    return (
      <div className="shop-page">
        <Header />
        <div className="container py-5" style={{ textAlign: "center" }}>
          <p style={{ color: "#999" }}>Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <Header />
      <div className="container py-5">
        <h2 className="mb-1">Admin Dashboard</h2>
        <p style={{ color: "#999", fontSize: "0.85rem", marginBottom: "2rem" }}>
          Full control over ShopEZ.
        </p>

        {error && (
          <div className="alert alert-danger py-2 px-3 mb-4" style={{ background: "#2a1018", border: "1px solid #ff0040", color: "#ff7a7a", borderRadius: 4 }}>
            {error}
          </div>
        )}

        {/* ═══════════ STATS ═══════════ */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "0.75rem", marginBottom: "2.5rem" }}>
          <div className="stat-card"><span className="stat-label">Total Orders</span><span className="stat-value">{stats?.totalOrders ?? "—"}</span></div>
          <div className="stat-card"><span className="stat-label">Total Users</span><span className="stat-value">{stats?.totalUsers ?? "—"}</span></div>
          <div className="stat-card"><span className="stat-label">Pending</span><span className="stat-value">{stats?.pendingOrders ?? "—"}</span></div>
          <div className="stat-card"><span className="stat-label">Delivered</span><span className="stat-value">{stats?.deliveredOrders ?? "—"}</span></div>
          <div className="stat-card"><span className="stat-label">Cancelled</span><span className="stat-value">{stats?.cancelledOrders ?? "—"}</span></div>
          <div className="stat-card"><span className="stat-label">Revenue (Total)</span><span className="stat-value">₹{(stats?.totalRevenue ?? 0).toLocaleString()}</span></div>
          <div className="stat-card"><span className="stat-label">Revenue (This Month)</span><span className="stat-value">₹{(stats?.thisMonthRevenue ?? 0).toLocaleString()}</span></div>
          <div className="stat-card"><span className="stat-label">Freebies Sent</span><span className="stat-value">{stats?.totalFreebiesSent ?? 0}</span></div>
        </div>

        {/* ═══════════ USERS ═══════════ */}
        <h3 className="mb-3" style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "1px", color: "#ff007f" }}>
          // Users
        </h3>
        <div style={{ overflowX: "auto", marginBottom: "2.5rem" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
                <th>Top Product</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: "center", color: "#666", padding: "2rem" }}>No users yet.</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id}>
                    <td style={{ fontFamily: "monospace", fontSize: "0.7rem" }}>{u._id.slice(-8)}</td>
                    <td>{u.name}</td>
                    <td style={{ fontSize: "0.75rem", color: "#aaa" }}>{u.email}</td>
                    <td><span className={`status-badge status-${u.role === "admin" ? "delivered" : "being-shipped"}`}>{u.role}</span></td>
                    <td>{u.orderCount}</td>
                    <td>₹{(u.totalSpent || 0).toLocaleString()}</td>
                    <td style={{ fontSize: "0.75rem" }}>{u.lastOrderDate ? new Date(u.lastOrderDate).toLocaleDateString() : "—"}</td>
                    <td style={{ fontSize: "0.75rem", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.topProduct}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ═══════════ ORDERS ═══════════ */}
        <h3 className="mb-3" style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "1px", color: "#ff007f" }}>
          // Orders
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", color: "#666", padding: "2rem" }}>No orders yet.</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{order._id.slice(-8)}</td>
                    <td>
                      {order.user?.name || "—"}
                      <br /><span style={{ fontSize: "0.7rem", color: "#888" }}>{order.user?.email}</span>
                    </td>
                    <td style={{ fontSize: "0.75rem" }}>
                      {order.items.map((i) => `${i.name}${i.price === 0 ? " 🎁" : ""} (${i.size}) x${i.quantity}`).join(", ")}
                    </td>
                    <td>₹{order.total}</td>
                    <td style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase().replace(/\s+/g, "-")}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatus(order._id, e.target.value)}
                        style={{
                          background: "#1e1e24", color: "#fff", border: "1px solid #333",
                          borderRadius: 4, padding: "0.35rem 0.5rem", fontSize: "0.75rem",
                        }}
                      >
                        <option value="Being shipped">Being shipped</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
