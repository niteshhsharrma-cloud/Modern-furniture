import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi } from "../api";
import ProductCard from "../components/ProductCard";
import ContactButtons from "../components/ContactButtons";
import Loading from "../components/Loading";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([productApi.list({ limit: 6 }), productApi.categories()])
      .then(([productsResponse, categoriesResponse]) => {
        setProducts(productsResponse.data.products);
        setCategories(categoriesResponse.data.categories);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow">Hetauda · Nepal</p>
          <h1>Modern Furniture Hetauda</h1>
          <p className="hero-copy">Premium Furniture for Home</p>
          <p className="hero-description">
            Explore our furniture collection and contact us directly for product
            information, availability and customization.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/products">View Products</Link>
            <ContactButtons />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Browse</p>
              <h2>Categories</h2>
            </div>
            <Link to="/products">View all</Link>
          </div>
          <div className="category-list">
            {(categories.length ? categories : ["Sofa", "Bed", "Dining", "Table", "Chair", "Other"]).map((category) => (
              <Link key={category} to={`/products?category=${encodeURIComponent(category)}`} className="category-chip">
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Collection</p>
              <h2>Featured & latest</h2>
            </div>
            <Link to="/products">Browse products</Link>
          </div>

          {loading ? (
            <Loading />
          ) : products.length ? (
            <div className="product-grid">
              {products.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>
          ) : (
            <div className="state-message">No products have been added yet.</div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container info-grid">
          <div>
            <p className="eyebrow">About the business</p>
            <h2>Furniture made for everyday living.</h2>
          </div>
          <div>
            <p>
              Modern Furniture Hetauda is a local furniture business focused on
              practical, comfortable and modern furniture for homes.
            </p>
            <Link className="text-link" to="/about">Business information →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
