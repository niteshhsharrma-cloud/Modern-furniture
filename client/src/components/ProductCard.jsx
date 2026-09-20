import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const image = product.images?.[0];

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-image-wrap">
        {image ? (
          <img src={image} alt={product.name} className="product-image" />
        ) : (
          <div className="image-placeholder">No image</div>
        )}
      </Link>

      <div className="product-card-body">
        <div className="product-category">{product.category}</div>
        <h3>{product.name}</h3>
        <p className="price">NPR {Number(product.price).toLocaleString()}</p>
        <Link className="button button-outline" to={`/products/${product._id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}
