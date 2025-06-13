import express from 'express';
import  cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import scpisRoutes from './routes/scpis.js';
import societesRoutes from './routes/societes.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// Route pour la racine
app.get('/', (req, res) => {
  res.send(' Bienvenue!');
});

// Routes
app.use('/api/scpis', scpisRoutes);
app.use('/api/societes', societesRoutes);


mongoose.connect(process.env.MONGODB_URI)
.then( ()=>{
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.listen(port, () => {
  console.log(` Serveur démarré sur http://localhost:${port}`);
});