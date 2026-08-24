const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile, toggleWishlist } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.post("/wishlist/:productId", protect, toggleWishlist);

module.exports = router;
