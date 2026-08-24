import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="container"><p>Loading...</p></div>;

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate("/cart");
  };

  return (
    <div className="container product-details">
      <img src={product.image} alt={product.name} className="details-img" />
      <div className="details-info">
        <span className="product-category">{product.category}</span>
        <h1>{product.name}</h1>
        <p className="rating">⭐ {product.rating}</p>
        <p className="details-desc">{product.description}</p>
        <p className="price-large">${product.price.toFixed(2)}</p>
        <p className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>

        {product.stock > 0 && (
          <div className="add-cart-row">
            <input
              type="number"
              min="1"
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        )}
      </div>
    </div>
  );
}
