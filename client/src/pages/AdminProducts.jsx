import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi } from "../api";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function AdminProducts() {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const { data } = await productApi.list({ limit: 100 });
      setProducts(data.products);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    await productApi.remove(id);
    load();
  }

  async function signOut() {
    await logout();
  }

  return (
    <section className="section page-section">
      <div className="container">
        <div className="admin-heading">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Products</h1>
          </div>
          <div className="admin-actions">
            <Link className="button button-primary" to="/admin/products/new">Add Product</Link>
            <button className="button button-outline" onClick={signOut}>Logout</button>
          </div>
        </div>

        {loading ? <Loading /> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div className="table-product">
                        {product.images?.[0] && <img src={product.images[0]} alt="" />}
                        <strong>{product.name}</strong>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>NPR {Number(product.price).toLocaleString()}</td>
                    <td>
                      <div className="table-actions">
                        <Link to={`/admin/products/${product._id}/edit`}>Edit</Link>
                        <button onClick={() => remove(product._id)} className="danger-link">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!products.length && <div className="state-message">No products yet.</div>}
          </div>
        )}
      </div>
    </section>
  );
}
