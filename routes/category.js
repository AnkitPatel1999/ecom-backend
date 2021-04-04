const express = require('express')
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth')
const { getCategoryById, createCategory, getCategory,getAllCategory , updateCategory,removeCategory} = require('../controllers/category')
const { getUserById } = require('../controllers/user')

//params
router.param('/userId', getUserById);
router.param('/categoryId', getCategoryById);

//Actual router

//create
router.post("/category/create/:userId",isSignedIn, isAuthenticated, isAdmin, createCategory)

//read
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)

//update
router.put("/category/:categoryId/:userId",isSignedIn, isAuthenticated, isAdmin, updateCategory)

//delete
router.delete("/category/:categoryId/:userId",isSignedIn, isAuthenticated, isAdmin, removeCategory)

module.exports = router;