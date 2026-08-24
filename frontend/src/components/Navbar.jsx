import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { userInfo, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">ShopEase</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {userInfo && <Link to="/wishlist">Wishlist</Link>}
        {userInfo && <Link to="/orders">My Orders</Link>}
        {userInfo?.isAdmin && <Link to="/admin">Admin</Link>}
        <Link to="/cart" className="cart-link">
          Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
        {userInfo ? (
          <>
            <span className="user-greeting">Hi, {userInfo.name}</span>
            <button className="link-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
