import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const statusColor = {
  Placed: "#f0ad4e",
  Processing: "#5bc0de",
  Shipped: "#337ab7",
  Delivered: "#5cb85c",
  Cancelled: "#d9534f",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/myorders").then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="container"><p>Loading orders...</p></div>;

  return (
    <div className="container">
      <h1 className="page-title">My Orders</h1>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet. <Link to="/">Start shopping</Link></p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <Link to={`/orders/${order._id}`} key={order._id} className="order-card">
              <div>
                <p className="order-id">Order #{order._id.slice(-6).toUpperCase()}</p>
                <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="order-total">${order.totalPrice.toFixed(2)}</p>
              <span className="status-badge" style={{ backgroundColor: statusColor[order.status] }}>
                {order.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
