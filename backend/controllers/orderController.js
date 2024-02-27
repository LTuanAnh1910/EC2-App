const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Products = require("../models/Products");
const User = require("../models/User");

module.exports = {
  getUserOrders: async (req, res) => {
    const userId = req.params.id;

    try {
      const order = await Order.find({ userId }).populate(
        "products.cartItem",
        "_id title supplier price imageUrl"
      );
      // console.log(cart);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  createOrder: async (req, res) => {
    try {
      const { userId, payment_status } = req.body;

      // Lấy thông tin giỏ hàng của người dùng
      const cart = await Cart.findOne({ userId }).populate("products.cartItem");
      console.log(cart);

      if (!cart || cart.products.length === 0) {
        return res.status(400).json({ error: "Giỏ hàng trống!" });
      }

      // Tính tổng số tiền từ giỏ hàng
      const total = cart.products.reduce((acc, item) => {
        return acc + item.cartItem.price.replace("$", "") * item.quantity;
      }, 0);

      // Tạo đơn hàng từ giỏ hàng
      const newOrder = new Order({
        userId,
        products: cart.products.map((item) => ({
          cartItem: item.cartItem,
          quantity: item.quantity,
        })),
        total,
        delivery_status: "Pending",
        payment_status,
      });

      // Lưu đơn hàng và xóa giỏ hàng
      await newOrder.save();
      await Cart.deleteOne({ userId: cart.userId });

      res.status(200).json(newOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  buyNow: async (req, res) => {
    try {
      const { userId, productId, quantity, payment_status } = req.body;

      // Check if the product exists
      const product = await Products.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found!" });
      }

      // Calculate the total amount
      const total = product.price.replace("$", "") * quantity;

      // Create a new order for immediate purchase
      const newOrder = new Order({
        userId,
        products: [{ cartItem: productId, quantity }],
        total,
        delivery_status: "Pending",
        payment_status,
      });

      // Save the order to the database
      await newOrder.save();

      res.status(200).json(newOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
