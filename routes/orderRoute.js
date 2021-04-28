const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/authController')
const { getUserById, pushOrderInPurchaseList} = require('../controllers/userController')
const { updateStock } = require('../controllers/productController')

const { getOrderById, createOrder, getAllOrders , getOrderStatus, updateStatus} = require('../controllers/orderController')

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);
//actual routes

//create routes
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder)

//read routes
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

//status of order
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);

module.exports = router