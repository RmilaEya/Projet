const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // ✅ Importer CORS
const userRoutes = require('./src/Routes/routes');

const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');


// ✅ Activer CORS pour éviter les blocages
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));

// MongoDB connection string
const mongoURI = 'mongodb+srv://tasksproject:RYsYgucV1gzE7sZY@cluster0.fw30kt5.mongodb.net/projet?retryWrites=true&w=majority&appName=Cluster0';

// Connecter MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes
app.use('/api', userRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});


