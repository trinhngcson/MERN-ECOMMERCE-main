const express  = require("express");
const { 
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrder,
    updateOrder,
    deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/newOrder").post(isAuthenticatedUser,newOrder);
router.route("/order/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser,myOrders);
router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrder);
router
    .route("/admin/order/:id")
    .put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
    .delete(isAuthenticatedUser,deleteOrder);

module.exports = router;