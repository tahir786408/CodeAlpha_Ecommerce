import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const { userInfo } = useAuth();

  useEffect(() => {
    api.get("/products/categories/list").then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (userInfo) {
      api.get("/auth/profile").then((res) => setWishlist(res.data.wishlist.map((p) => p._id)));
    }
  }, [userInfo]);

  const fetchProducts = async () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (category !== "All") params.category = category;
    if (maxPrice) params.maxPrice = maxPrice;
    const { data } = await api.get("/products", { params });
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, maxPrice]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const toggleWishlist = async (productId) => {
    if (!userInfo) return alert("Please login to use wishlist");
    const { data } = await api.post(`/auth/wishlist/${productId}`);
    setWishlist(data.map((p) => p._id));
  };

  return (
    <div className="container">
      <h1 className="page-title">Discover Products</h1>

      <form className="filters" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found. Try adjusting your filters.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              isWishlisted={wishlist.includes(p._id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
