const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.get("/:id", orderController.getUserOrders);
router.post("/", orderController.createOrder);
router.post("/buynow", orderController.buyNow);

module.exports = router;
