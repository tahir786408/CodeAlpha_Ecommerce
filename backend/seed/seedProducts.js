const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Product = require("../models/Product");

dotenv.config();
connectDB();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Over-ear headphones with noise cancellation and 30hr battery life.",
    price: 59.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 25,
    rating: 4.5,
  },
  {
    name: "Smart Watch Series 5",
    description: "Fitness tracking, heart rate monitor, and notifications on your wrist.",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 15,
    rating: 4.7,
  },
  {
    name: "Men's Running Shoes",
    description: "Lightweight breathable sneakers for daily runs and workouts.",
    price: 45.0,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    stock: 40,
    rating: 4.2,
  },
  {
    name: "Leather Backpack",
    description: "Vintage-style leather backpack, fits a 15-inch laptop.",
    price: 74.5,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    stock: 20,
    rating: 4.6,
  },
  {
    name: "4K Ultra HD Smart TV 43-inch",
    description: "Crystal-clear 4K display with built-in streaming apps.",
    price: 349.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
    stock: 10,
    rating: 4.4,
  },
  {
    name: "Ceramic Coffee Mug Set (4-pack)",
    description: "Microwave and dishwasher safe, 350ml capacity each.",
    price: 19.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500",
    stock: 60,
    rating: 4.3,
  },
  {
    name: "Yoga Mat with Carry Strap",
    description: "Non-slip, eco-friendly TPE material, 6mm thick.",
    price: 24.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    stock: 35,
    rating: 4.5,
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Keeps drinks cold for 24 hours or hot for 12 hours, 750ml.",
    price: 15.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    stock: 50,
    rating: 4.6,
  },
];

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Sample products inserted successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
