const express = require('express');
const User = require('../Models/UserModel');


const router = express.Router();

const { register, login,updateUser,
  deleteUser,getAllUsers,getUserById,logout } = require('../Controllers/UserController');

// const { createCartItem, getAllCartItems } = require("../Controllers/Commandes/cartItemController");
const { authenticateToken,authorizeRole } = require("../Middleware/auth")
// const { createCart, getAllCarts ,getCartByUser } = require("../Controllers/Commandes/cartController");
// const { createOrder , getAllOrders , getOrdersByUser } = require('../Controllers/Commandes/orderController');





//*****route user */
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
// ***********auth route
router.post('/register', register);
router.post('/login', login);
router.post('/deconnexion', logout);

// ***********service commandes route

// // // **cart item
// router.post("/cartItems", createCartItem);
// router.get("/cartItems", getAllCartItems); 
// // //  **cart
// router.post('/cart', authenticateToken, createCart);
// router.get('/cart', authenticateToken, getCartByUser);
// router.get('/carts', authenticateToken, authorizeRole('admin'), getAllCarts);
// // //  **order
// // authenticateToken,
// router.post('/order',authenticateToken , createOrder);
// router.get('/order', authenticateToken ,getOrdersByUser);
// router.get('/orders', authenticateToken ,getAllOrders);




// *******************************************************




module.exports = router;
