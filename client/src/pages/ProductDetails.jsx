import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productApi } from "../api";
import ContactButtons from "../components/ContactButtons";
import Loading from "../components/Loading";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi.get(id)
      .then(({ data }) => setProduct(data.product))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return <div className="state-message">Product not found.</div>;

  const images = product.images?.length ? product.images : [];
  const image = images[selectedImage];

  return (
    <section className="section page-section">
      <div className="container">
        <Link to="/products" className="back-link">← Back to products</Link>

        <div className="detail-layout">
          <div>
            <div className="detail-main-image">
              {image ? <img src={image} alt={product.name} /> : <div className="image-placeholder">No image</div>}
            </div>

            {images.length > 1 && (
              <div className="thumbnail-row">
                {images.map((src, index) => (
                  <button
                    key={src}
                    className={`thumbnail ${selectedImage === index ? "selected" : ""}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={src} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="detail-content">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="detail-price">NPR {Number(product.price).toLocaleString()}</p>
            <p className="detail-description">{product.description}</p>

            <div className="spec-list">
              <div><span>Dimensions</span><strong>{product.dimensions || "Available on request"}</strong></div>
              <div><span>Material</span><strong>{product.material || "Available on request"}</strong></div>
              <div><span>Colors / options</span><strong>{product.colors?.length ? product.colors.join(", ") : "Available on request"}</strong></div>
            </div>

            <ContactButtons productName={product.name} />
          </div>
        </div>
      </div>
    </section>
  );
}
