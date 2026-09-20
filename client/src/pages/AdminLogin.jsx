import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (admin) return <Navigate to="/admin/products" replace />;

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
      setPassword("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section page-section">
      <div className="container auth-container">
        <form className="auth-card" onSubmit={submit}>
          <p className="eyebrow">Admin</p>
          <h1>Sign in</h1>
          <p>Manage catalogue products.</p>

          {error && <div className="form-error">{error}</div>}

          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>

          <button className="button button-primary full-width" disabled={busy}>
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}