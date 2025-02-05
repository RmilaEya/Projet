"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/catag/products") 
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des produits:", err);
      });
  }, []);


  // ************add to cart 

  const handleAddToCart = async (productId) => {
    const quantity = 1; 
  
    try {
      await axios.post("http://localhost:5001/api/cartItems", { productId, quantity });
      alert("Produit ajouté au panier !");
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      alert("Échec de l'ajout au panier.");
    }
  };
  




   return (
    <div>
    <h1>Liste des Produits</h1>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <strong>{product.name}</strong> <br/>
          <span>Prix : ${product.price}</span><br/>
          <span>Description : {product.description}</span><br/>


          <button onClick={() => handleAddToCart(product.id)} >Ajouter au panier</button>   
               
        </li>
      ))}
    </ul>
  </div>
  );
}

