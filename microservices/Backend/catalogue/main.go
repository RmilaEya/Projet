// package main

// import (
// 	"catalogue/src/database"
// 	"catalogue/src/routes"
// 	"github.com/gofiber/fiber/v2"
// 	"log"
// 	"github.com/gofiber/fiber/v2/middleware/cors"
// )

// func main() {
// 	// Initialiser la base de données
// 	database.InitDB()
//     database.MigrateDB() 

// 	// Créer une instance de l'application Fiber
// 	app := fiber.New()

// 	// Configurer les routes
// 	routes.SetupRoutes(app)


// 	// Activer CORS pour autoriser les requêtes depuis Next.js
// 	app.Use(cors.New(cors.Config{
// 		AllowOrigins: "*",
// 		AllowMethods: "GET,POST,PUT,DELETE",
// 	}))
	
	

// 	// Lancer le serveur sur le port 5002
// 	log.Fatal(app.Listen(":5002"))
// }




package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"catalogue/src/database"
	"catalogue/src/routes"
)

func main() {
	// Initialiser la base de données
	database.InitDB()
	database.MigrateDB()

	// Créer une instance de l'application Fiber
	app := fiber.New()

	// Activer CORS pour autoriser les requêtes depuis Next.js
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // Autorise toutes les origines, à restreindre en production
		AllowMethods: "GET,POST,PUT,DELETE",
	}))

	// Configurer les routes
	routes.SetupRoutes(app)

	// Lancer le serveur sur le port 5002
	if err := app.Listen(":5002"); err != nil {
		log.Fatalf("Erreur lors du démarrage du serveur : %v", err)
	}
}
