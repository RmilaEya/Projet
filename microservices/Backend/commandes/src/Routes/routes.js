const express = require('express');

const router = express.Router();

const { createCartItem, getAllCartItems } = require("../Controllers/Commandes/cartItemController");
const { authenticateToken,authorizeRole } = require("../../../authentification/src/Middleware/auth")
const { createCart, getAllCarts ,getCartByUser } = require("../Controllers/Commandes/cartController");
const { createOrder , getAllOrders , getOrdersByUser } = require('../Controllers/Commandes/orderController');
const { createOrder2 } = require("../Controllers/Commandes/order2Controller");

// ***********service commandes route

// // **cart item
router.post("/cartItems", createCartItem);
router.get("/cartItems", getAllCartItems); 
// //  **cart
router.post('/cart', authenticateToken, createCart);
router.get('/cart', authenticateToken, getCartByUser);
router.get('/carts', authenticateToken, authorizeRole('admin'), getAllCarts);
// //  **order
// authenticateToken,
router.post('/order',authenticateToken , createOrder);
router.get('/order', authenticateToken ,getOrdersByUser);
router.get('/orders', authenticateToken ,getAllOrders);



// *******************************************************


// Route pour créer une commande
router.post("/orders", createOrder2);


module.exports = router;
