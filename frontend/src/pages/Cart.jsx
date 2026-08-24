import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!userInfo) return navigate("/login");
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <h1 className="page-title">Your Cart</h1>
        <p>Your cart is empty. <Link to="/">Browse products</Link></p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Your Cart</h1>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <input
              type="number"
              min="1"
              max={item.stock}
              value={item.qty}
              onChange={(e) => updateQty(item._id, Number(e.target.value))}
            />
            <p className="line-total">${(item.price * item.qty).toFixed(2)}</p>
            <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: ${cartTotal.toFixed(2)}</h2>
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
}
