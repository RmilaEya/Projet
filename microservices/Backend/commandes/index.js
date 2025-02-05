const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/Routes/routes');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// MongoDB connection string
const mongoURI = 'mongodb+srv://tasksproject:RYsYgucV1gzE7sZY@cluster0.fw30kt5.mongodb.net/projet?retryWrites=true&w=majority&appName=Cluster0';


// Connecter MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
  });

//****************les routes**************
app.use('/api', userRoutes);


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});

