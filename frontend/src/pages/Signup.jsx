import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { isAuthenticated, signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      await signup(form);
      navigate("/shop");
    } catch (error) {
      setMessage(error.message || "Unable to create account right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <div className="card border-0 p-4" style={{ background: "#121216", border: "1px solid #2a2a33" }}>
        <h2 className="mb-3 text-light">Create account</h2>
        <p className="text-muted mb-4">Join ShopEZ and start exploring the drop.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light">Name</label>
            <input className="form-control border-secondary text-white" style={{ background: "#0d0d11" }} name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input className="form-control border-secondary text-white" style={{ background: "#0d0d11" }} name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input className="form-control border-secondary text-white" style={{ background: "#0d0d11" }} name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
          </div>
          {message ? <p className="text-danger small mb-3">{message}</p> : null}
          <button className="btn btn-pink w-100" disabled={isSubmitting}>{isSubmitting ? "Creating account..." : "Sign up"}</button>
        </form>
        <p className="mt-3 small text-muted">
          Already have an account? <Link to="/login" className="text-light">Login</Link>
        </p>
      </div>
    </div>
  );
}
