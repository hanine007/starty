import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
// creation d'un nouveau utilisateur
router.post('/register',async(req,res)=>{
const { username, password, email } = req.body;
try{
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message: "ce email existe deja" })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);
    const newUser = new User({
        username,
        password: hashedPassword,
        email
    })
    await newUser.save();
    res.status(201).json({message: "user cree avec successfully"});



}
catch(error){
     res.status(500).json({ message: 'Erreur serveur' });
}


})
// Authentification de l'Useristrateur
router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});  // Utilisez 'user' en minuscule
        if(!user) {
            return res.status(404).json({message: "Utilisateur non trouvé"});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Mot de passe incorrect"});
        }
        
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRETT,  // Notez la majuscule dans SECRET
            {expiresIn: '5d'}
        );
        
        res.json({
            message: "Connexion réussie",
            token,
            user: {  // Utilisez 'user' en minuscule ici aussi
                email: user.email,
                username: user.username,
                id: user._id
            }
        });
    } catch(error) {
        console.error(error);  // Ajoutez ceci pour déboguer
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

export default router