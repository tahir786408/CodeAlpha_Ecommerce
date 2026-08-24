import { Link } from "react-router-dom";

export default function ProductCard({ product, isWishlisted, onToggleWishlist }) {
  return (
    <div className="product-card">
      {onToggleWishlist && (
        <button
          className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={() => onToggleWishlist(product._id)}
          title="Toggle wishlist"
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
      )}
      <Link to={`/product/${product._id}`} className="product-link">
        <img src={product.image} alt={product.name} className="product-img" />
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3>{product.name}</h3>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="rating">⭐ {product.rating}</p>
          {product.stock === 0 && <p className="out-of-stock">Out of stock</p>}
        </div>
      </Link>
    </div>
  );
}
