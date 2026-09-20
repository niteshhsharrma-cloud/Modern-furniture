import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { productApi } from "../api";
import Loading from "../components/Loading";

const initial = {
  name: "",
  price: "",
  category: "Sofa",
  description: "",
  dimensions: "",
  material: "",
  colors: ""
};

export default function AdminProductForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [existingImages, setExistingImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editing) return;
    productApi.get(id)
      .then(({ data }) => {
        const p = data.product;
        setForm({
          name: p.name || "",
          price: p.price || "",
          category: p.category || "Other",
          description: p.description || "",
          dimensions: p.dimensions || "",
          material: p.material || "",
          colors: (p.colors || []).join(", ")
        });
        setExistingImages(p.images || []);
      })
      .catch(() => setError("Could not load product."))
      .finally(() => setLoading(false));
  }, [id, editing]);

  const previews = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  function change(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function removeExistingImage(url) {
    setExistingImages((current) => current.filter((image) => image !== url));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      data.append("existingImages", JSON.stringify(existingImages));
      files.forEach((file) => data.append("images", file));

      if (editing) await productApi.update(id, data);
      else await productApi.create(data);

      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save product.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <section className="section page-section">
      <div className="container narrow-form">
        <Link to="/admin/products" className="back-link">← Back to products</Link>
        <p className="eyebrow">Admin</p>
        <h1>{editing ? "Edit product" : "Add product"}</h1>

        {error && <div className="form-error">{error}</div>}

        <form className="product-form" onSubmit={submit}>
          <label>
            Product name
            <input name="name" value={form.name} onChange={change} required maxLength={120} />
          </label>

          <div className="two-col">
            <label>
              Price (NPR)
              <input name="price" type="number" min="0" step="1" value={form.price} onChange={change} required />
            </label>

            <label>
              Category
              <select name="category" value={form.category} onChange={change}>
                <option>Sofa</option>
                <option>Bed</option>
                <option>Dining</option>
                <option>Table</option>
                <option>Chair</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <label>
            Description
            <textarea name="description" rows="5" value={form.description} onChange={change} required />
          </label>

          <div className="two-col">
            <label>
              Dimensions
              <input name="dimensions" value={form.dimensions} onChange={change} placeholder="e.g. 78 × 34 × 32 in" />
            </label>

            <label>
              Material
              <input name="material" value={form.material} onChange={change} placeholder="e.g. Solid wood + fabric" />
            </label>
          </div>

          <label>
            Colors / options
            <input name="colors" value={form.colors} onChange={change} placeholder="Beige, Grey, Walnut" />
          </label>

          <label>
            Product images
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
            <small>Up to 5 images. JPEG, PNG or WebP. Maximum 5 MB each.</small>
          </label>

          {!!existingImages.length && (
            <div>
              <p className="field-label">Current images</p>
              <div className="admin-image-grid">
                {existingImages.map((image) => (
                  <div className="admin-image" key={image}>
                    <img src={image} alt="" />
                    <button type="button" onClick={() => removeExistingImage(image)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!previews.length && (
            <div>
              <p className="field-label">New images</p>
              <div className="admin-image-grid">
                {previews.map((image) => <img className="admin-image-preview" key={image} src={image} alt="" />)}
              </div>
            </div>
          )}

          <button className="button button-primary full-width" disabled={saving}>
            {saving ? "Saving..." : editing ? "Save changes" : "Create product"}
          </button>
        </form>
      </div>
    </section>
  );
}
