import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/shop");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      await login(form);
      navigate("/shop");
    } catch (error) {
      setMessage(error.message || "Unable to log in right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <div className="card border-0 p-4" style={{ background: "#121216", border: "1px solid #2a2a33" }}>
        <h2 className="mb-3 text-light">Login</h2>
        <p className="text-muted mb-4">Welcome back to ShopEZ.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input className="form-control border-secondary text-white" style={{ background: "#0d0d11" }} name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input className="form-control border-secondary text-white" style={{ background: "#0d0d11" }} name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
          </div>
          {message ? <p className="text-danger small mb-3">{message}</p> : null}
          <button className="btn btn-pink w-100" disabled={isSubmitting}>{isSubmitting ? "Logging in..." : "Login"}</button>
        </form>
        <p className="mt-3 small text-muted">
          New here? <Link to="/signup" className="text-light">Create account</Link>
        </p>
      </div>
    </div>
  );
}
