import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    const { data } = await api.get("/auth/profile");
    setWishlist(data.wishlist);
    setLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const toggleWishlist = async (productId) => {
    await api.post(`/auth/wishlist/${productId}`);
    fetchWishlist();
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1 className="page-title">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No items in your wishlist yet.</p>
      ) : (
        <div className="product-grid">
          {wishlist.map((p) => (
            <ProductCard key={p._id} product={p} isWishlisted={true} onToggleWishlist={toggleWishlist} />
          ))}
        </div>
      )}
    </div>
  );
}
