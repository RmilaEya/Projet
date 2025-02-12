// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const bodyCatalogue = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost/catag/products")
//             .then((res) => {
//                 setProducts(res.data);
//             })
//             .catch((err) => {
//                 console.error("Erreur lors de la récupération des produits:", err);
//             });
//     }, []);

//     return (
//         <div>
//             <ul>
//                 {products.map((product) => (
//                     <li key={product.id}>
//                         <div>
//                             <a href="#">
//                                 <img src={product.image || ""} alt={product.name} />
//                             </a>
//                         </div>
//                         <div>
//                             <div>
//                                 <span>{product.category || ""}</span>
//                             </div>
//                             <a href="#">
//                                 {product.name}
//                             </a>
//                             <div>
//                                 <p>{product.price} €</p>
//                                 <button type="button">
//                                     <svg
//                                         aria-hidden="true"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="24"
//                                         height="24"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <path
//                                             stroke="currentColor"
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth="2"
//                                             d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
//                                         />
//                                     </svg>
//                                     <span>Ajouter au panier</span>
//                                 </button>
//                             </div>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default bodyCatalogue;














// 'use client';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CART_SERVICE_URL = 'http://localhost:5001/api/cartItems';
// const PRODUCT_SERVICE_URL = 'http://localhost/catag/products';

// export default function ShopPage() {
//     const [products, setProducts] = useState([]);
//     const [cart, setCart] = useState([]);
//     const [message, setMessage] = useState('');

//     // Charger les produits
//     useEffect(() => {
//         axios.get(PRODUCT_SERVICE_URL)
//             .then((res) => setProducts(res.data))
//             .catch((err) => console.error("Erreur lors de la récupération des produits:", err));
//     }, []);

//     // Charger les articles du panier
//     const fetchCartItems = async () => {
//         try {
//             const response = await axios.get(CART_SERVICE_URL);
//             setCart(response.data);
//         } catch (error) {
//             console.error("Erreur lors de la récupération du panier", error);
//         }
//     };

//     useEffect(() => {
//         fetchCartItems();
//     }, []);

//     // Ajouter un produit au panier
//     const addToCart = async (productId) => {
//         try {
//             const response = await axios.post(CART_SERVICE_URL, { productId, quantity: 1 });
//             setMessage('Produit ajouté avec succès !');
//             fetchCartItems(); // Rafraîchir la liste des articles
//         } catch (error) {
//             setMessage(error.response?.data?.error || "Erreur lors de l'ajout du produit.");
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Boutique</h1>
            
//             {message && <p className="text-green-500">{message}</p>}
            
//             {/* Liste des produits */}
//             <div className="grid grid-cols-3 gap-4 mb-8">
//                 {products.map((product) => (
//                     <div key={product.id} className="border p-4 rounded-lg shadow">
//                         <img src={product.image || ""} alt={product.name} className="w-full h-40 object-cover mb-2" />
//                         <h2 className="font-bold">{product.name}</h2>
//                         <p className="text-gray-600">{product.price} €</p>
//                         <button 
//                             onClick={() => addToCart(product.id)} 
//                             className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
//                         >
//                             Ajouter au panier
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {/* Panier */}
//             <h2 className="text-2xl font-bold mb-4">Panier</h2>
//             <ul className="border p-4 rounded">
//                 {cart.length > 0 ? (
//                     cart.map((item) => (
//                         <li key={item._id} className="p-2 border-b">
//                             {item.productName} - {item.quantity} x {item.price} € = {item.price * item.quantity} €
//                         </li>
//                     ))
//                 ) : (
//                     <p>Le panier est vide.</p>
//                 )}
//             </ul>
//         </div>
//     );
// }

















'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CART_SERVICE_URL = 'http://localhost:5001/api/cartItems';
const PRODUCT_SERVICE_URL = 'http://localhost/catag/products';

export default function ShopPage() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState('');

    // Charger les produits
    useEffect(() => {
        axios.get(PRODUCT_SERVICE_URL)
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Erreur lors de la récupération des produits:", err));
    }, []);

    // Charger les articles du panier
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(CART_SERVICE_URL);
            setCart(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération du panier", error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    // Ajouter un produit au panier
    const addToCart = async (productId, productName, price) => {
        try {
            // Vérifier si le produit est déjà dans le panier
            const existingItem = cart.find(item => item.productId === productId);
            if (existingItem) {
                // Mettre à jour la quantité du produit existant
                await axios.put(`${CART_SERVICE_URL}/${existingItem._id}`, { quantity: existingItem.quantity + 1 });
            } else {
                // Ajouter un nouveau produit au panier
                await axios.post(CART_SERVICE_URL, { productId, productName, price, quantity: 1 });
            }

            setMessage('Produit ajouté avec succès !');
            fetchCartItems(); // Rafraîchir le panier après ajout
        } catch (error) {
            setMessage(error.response?.data?.error || "Erreur lors de l'ajout du produit.");
        }
    };

    // Supprimer un produit du panier
    const removeFromCart = async (cartItemId) => {
        try {
            await axios.delete(`${CART_SERVICE_URL}/${cartItemId}`);
            setMessage('Produit supprimé du panier.');
            fetchCartItems(); // Rafraîchir le panier après suppression
        } catch (error) {
            setMessage(error.response?.data?.error || "Erreur lors de la suppression du produit.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Boutique</h1>
            
            {message && <p className="text-green-500">{message}</p>}
            
            {/* Liste des produits */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg shadow">
                        <img src={product.image || ""} alt={product.name} className="w-full h-40 object-cover mb-2" />
                        <h2 className="font-bold">{product.name}</h2>
                        <p className="text-gray-600">{product.price} €</p>
                        <button 
                            onClick={() => addToCart(product.id, product.name, product.price)} 
                            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                        >
                            Ajouter au panier
                        </button>
                    </div>
                ))}
            </div>

            {/* Panier */}
            <h2 className="text-2xl font-bold mb-4">Panier</h2>
            <ul className="border p-4 rounded">
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <li key={item._id} className="p-2 border-b flex justify-between items-center">
                            <span>{item.productName} - {item.quantity} x {item.price} € = {item.price * item.quantity} €</span>
                            <button 
                                onClick={() => removeFromCart(item._id)} 
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Supprimer
                            </button>
                        </li>
                    ))
                ) : (
                    <p>Le panier est vide.</p>
                )}
            </ul>
        </div>
    );
}
