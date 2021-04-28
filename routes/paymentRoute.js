var express = require('express');
var router  = express.Router();
const { isSignedIn, isAuthenticated } = require('../controllers/authController');
const { getUserById } = require('../controllers/userController')

const { getToken, processPayment } = require("../controllers/paymentController");

router.param("userId", getUserById)

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated, processPayment);

module.exports = router; 