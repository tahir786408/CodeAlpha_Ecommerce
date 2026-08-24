import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({ address: "", city: "", postalCode: "", country: "" });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    setError("");
    try {
      const items = cartItems.map((item) => ({ product: item._id, qty: item.qty }));
      const { data } = await api.post("/orders", { items, shippingAddress: form });
      clearCart();
      navigate(`/orders/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong placing your order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Checkout</h1>
      <form className="checkout-form" onSubmit={handlePlaceOrder}>
        <input name="address" placeholder="Address" required onChange={handleChange} />
        <input name="city" placeholder="City" required onChange={handleChange} />
        <input name="postalCode" placeholder="Postal Code" required onChange={handleChange} />
        <input name="country" placeholder="Country" required onChange={handleChange} />
        {error && <p className="error-text">{error}</p>}
        <h3>Order Total: ${cartTotal.toFixed(2)}</h3>
        <button type="submit" disabled={placing}>
          {placing ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
