// const axios = require("axios");
// const CartItem = require("../../Models/CommandesModels/cartItemModel");

// // const CATALOGUE_SERVICE_URL = "http://localhost:5002/products";
// const CATALOGUE_SERVICE_URL = "http://localhost/catag/products";

// // Ajouter un item au panier
// exports.createCartItem = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;

//     // Appeler le microservice catalogue pour récupérer les informations du produit
//     const response = await axios.get(`${CATALOGUE_SERVICE_URL}/${productId}`);
//     const product = response.data;

//     if (!product) {
//       return res.status(404).json({ error: "Produit introuvable" });
//     }

//     // Calculer le prix total pour cet item
//     const totalPrice = product.price * quantity;

//     // Créer un cartItem avec les informations du produit et la quantité
//     const cartItem = await CartItem.create({
//       productId,
//       productName: product.name,
//       price: product.price,
//       quantity,
//       totalPrice
//     });

//     // Retourner le cartItem créé
//     res.status(201).json(cartItem);
//   } catch (error) {
//     console.error("Erreur lors de la création de l'élément du panier", error);
//     res.status(500).json({ error: "Erreur lors de la création de l'élément." });
//   }
// };
























// // Ajouter un item
// // exports.createCartItem = async (req, res) => {
// //   try {
// //     const { productName, price, quantity, productId } = req.body;
// //     const cartItem = await CartItem.create({ productName, price, quantity, productId });
// //     res.status(201).json(cartItem);
// //   } catch (error) {
// //     res.status(500).json({ error: "Erreur lors de la création de l'élément." });
// //   }
// // };




// // Récupérer tous les items
// exports.getAllCartItems = async (req, res) => {
//   try {
//     const items = await CartItem.find();
//     res.status(200).json(items);
//   } catch (error) {
//     res.status(500).json({ error: "Erreur lors de la récupération des éléments." });
//   }
// };





const axios = require("axios");
const CartItem = require("../../Models/CommandesModels/cartItemModel");

const CATALOGUE_SERVICE_URL = "http://localhost:5002/products"; // Assurez-vous que c'est l'URL correcte !

// Ajouter un item au panier
exports.createCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ error: "L'ID du produit et la quantité sont requis." });
    }

    // Vérifier que le produit existe via le microservice catalogue
    console.log(`Requête vers ${CATALOGUE_SERVICE_URL}/${productId}`);
    const response = await axios.get(`${CATALOGUE_SERVICE_URL}/${productId}`);
   

    console.log("Réponse du catalogue :", response.data);
    const product = response.data; // Vérifiez si `data.product` est nécessaire

    if (!product || !product.price) {
      return res.status(404).json({ error: "Produit introuvable ou prix manquant." });
    }

    // Calcul du prix total
    const totalPrice = product.price * quantity;

    // Enregistrement dans la base de données
    const cartItem = await CartItem.create({
      productId,
      productName: product.name,
      price: product.price,
      quantity,
      totalPrice
    });

    console.log("Produit ajouté au panier :", cartItem);

    res.status(201).json(cartItem);
  } catch (error) {
    console.error("Erreur lors de la création de l'élément du panier :", error.message);
    res.status(500).json({ error: "Erreur lors de la création de l'élément du panier." });
  }
};
