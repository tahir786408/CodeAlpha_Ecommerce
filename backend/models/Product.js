const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, default: "https://via.placeholder.com/400x400?text=Product" },
    stock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 4 },
  },
  { timestamps: true }
);

// Text index enables search by name/description/category
productSchema.index({ name: "text", description: "text", category: "text" });

module.exports = mongoose.model("Product", productSchema);
