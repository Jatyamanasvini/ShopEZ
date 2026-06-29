import { useEffect, useState } from "react";
import { getOrders } from "../utils/orders";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ color: "#ffffff" }}>Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p style={{ color: "#ffffff" }}>No orders yet.</p>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="card border-0 p-3"
          style={{ background: "#121216", color: "#ffffff" }}
        >
          <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
            <strong style={{ color: "#ffffff" }}>
              Order #{order._id.toString().slice(-8).toUpperCase()}
            </strong>

            <span style={{ color: "#ff007f" }}>
              {order.status}
            </span>
          </div>

          <p className="small mb-2" style={{ color: "#ffffff" }}>
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <ul className="mb-2 ps-3" style={{ color: "#ffffff" }}>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} ({item.size}) x{item.quantity} - ₹
                {item.price * item.quantity}
              </li>
            ))}
          </ul>

          <p
            className="mb-0 fw-bold"
            style={{ color: "#ffffff" }}
          >
            Total: ₹{order.total}
          </p>
        </div>
      ))}
    </div>
  );
}