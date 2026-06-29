import { apiUrl } from "../config/api";

function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("shopez-token");
}

export async function getOrders() {
  const token = getToken();
  if (!token) return [];

  try {
    const res = await fetch(apiUrl("/api/orders"), {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function saveOrder(cartItems, total) {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const items = cartItems.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    size: item.selectedSize,
    price: item.price,
  }));

  const res = await fetch(apiUrl("/api/orders"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items, total }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to place order");
  }

  return res.json();
}
