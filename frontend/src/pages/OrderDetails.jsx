import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const steps = ["Placed", "Processing", "Shipped", "Delivered"];

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <div className="container"><p>Loading...</p></div>;

  const currentStep = steps.indexOf(order.status);

  return (
    <div className="container">
      <h1 className="page-title">Order #{order._id.slice(-6).toUpperCase()}</h1>

      {order.status !== "Cancelled" ? (
        <div className="tracker">
          {steps.map((step, i) => (
            <div key={step} className={`tracker-step ${i <= currentStep ? "done" : ""}`}>
              <div className="tracker-dot" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="error-text">This order was cancelled.</p>
      )}

      <div className="order-items">
        {order.items.map((item) => (
          <div key={item.product} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Qty: {item.qty} × ${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="shipping-box">
        <h3>Shipping Address</h3>
        <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
        <p>{order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
      </div>

      <h2>Total: ${order.totalPrice.toFixed(2)}</h2>
    </div>
  );
}
