import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productApi } from "../api";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    productApi.list(selectedCategory === "All" ? {} : { category: selectedCategory })
      .then(({ data }) => setProducts(data.products))
      .finally(() => setLoading(false));

    productApi.categories().then(({ data }) => setCategories(data.categories));
  }, [selectedCategory]);

  function changeCategory(category) {
    if (category === "All") setSearchParams({});
    else setSearchParams({ category });
  }

  return (
    <section className="section page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">Catalogue</p>
          <h1>Our Products</h1>
          <p>Browse our furniture collection and contact us directly for details.</p>
        </div>

        <div className="filter-row">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              className={`filter-chip ${selectedCategory === category ? "active" : ""}`}
              onClick={() => changeCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <Loading />
        ) : products.length ? (
          <div className="product-grid">
            {products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        ) : (
          <div className="state-message">No products found in this category.</div>
        )}
      </div>
    </section>
  );
}
