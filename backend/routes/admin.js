import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// création d'un nouveau administrateur
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Vérifier que tous les champs sont présents
    if (!username || !password || !email) {
      return res.status(400).json({
        message: "Username, email et mot de passe requis",
      });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Ce email existe déjà" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      email,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin créé avec succès" });
  } catch (error) {
    console.error("Erreur création admin:", error); // ✅ Ajout du log d'erreur
    res.status(500).json({
      message: "Erreur serveur",
      error: error.message, // ✅ Ajout du détail de l'erreur
    });
  }
});

// Authentification de l'administrateur
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET, // ✅ Corrigé : JWT_SECRET
      { expiresIn: "5d" }
    );

    res.json({
      message: "Connexion réussie",
      token,
      admin: {
        email: admin.email,
        username: admin.username,
        id: admin._id,
      },
    });
  } catch (error) {
    console.error("Erreur login admin:", error); // ✅ Ajout du log d'erreur
    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
});

export default router;
