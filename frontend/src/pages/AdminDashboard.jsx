import { useEffect, useState } from "react";
import api from "../api/axios";

const emptyForm = { name: "", description: "", price: "", category: "", image: "", stock: "" };

export default function AdminDashboard() {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const loadProducts = () => api.get("/products").then((res) => setProducts(res.data));
  const loadOrders = () => api.get("/orders").then((res) => setOrders(res.data));

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
    if (editingId) {
      await api.put(`/products/${editingId}`, payload);
    } else {
      await api.post("/products", payload);
    }
    setForm(emptyForm);
    setEditingId(null);
    loadProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  const handleStatusChange = async (orderId, status) => {
    await api.put(`/orders/${orderId}/status`, { status });
    loadOrders();
  };

  return (
    <div className="container">
      <h1 className="page-title">Admin Dashboard</h1>
      <div className="admin-tabs">
        <button className={tab === "products" ? "active" : ""} onClick={() => setTab("products")}>Products</button>
        <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>Orders</button>
      </div>

      {tab === "products" && (
        <>
          <form className="admin-form" onSubmit={handleSubmit}>
            <input name="name" placeholder="Product name" value={form.name} required onChange={handleChange} />
            <input name="category" placeholder="Category" value={form.category} required onChange={handleChange} />
            <input name="price" type="number" placeholder="Price" value={form.price} required onChange={handleChange} />
            <input name="stock" type="number" placeholder="Stock" value={form.stock} required onChange={handleChange} />
            <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
            <textarea name="description" placeholder="Description" value={form.description} required onChange={handleChange} />
            <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
          </form>

          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button onClick={() => handleEdit(p)}>Edit</button>
                    <button onClick={() => handleDelete(p._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === "orders" && (
        <table className="admin-table">
          <thead>
            <tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>#{o._id.slice(-6).toUpperCase()}</td>
                <td>{o.user?.name}</td>
                <td>${o.totalPrice.toFixed(2)}</td>
                <td>
                  <select value={o.status} onChange={(e) => handleStatusChange(o._id, e.target.value)}>
                    {["Placed", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
