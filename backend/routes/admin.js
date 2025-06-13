import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
// creation d'un nouveau administrateur 
router.post('/register',async(req,res)=>{
const { username, password, email } = req.body;
try{
    const existingAdmin = await Admin.findOne({email})
    if(existingAdmin){
        return res.status(400).json({message: "ce email existe deja" })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);
    const newAdmin = new Admin({
        username,
        password: hashedPassword,
        email
    })
    await newAdmin.save();
    res.status(201).json({message: "Admin cree avec successfully"});



}
catch(error){
     res.status(500).json({ message: 'Erreur serveur' });
}


})
// Authentification de l'administrateur
router.post ('/login', async(req,res)=>{
    const {email,password}= req.body;
    try{
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(404).json({message: "Admin non trouve"});
        }
        const isMatch = await bcrypt.compare (password,admin.password);
        if(!isMatch){
            return res.status(400).json({message: "Mot de passe incorrect"});
        }
        const token = jwt.sign({id:admin._id},
            process.env.JWT_secret,
            {expiresIn:'5d'

            });
        res.json({
            message : "connexion reussie",
            token ,
            admin :{
                email :admin.email,
                username: admin.username,
                id: admin._id
            }
        })
    }
    catch(error){
        res.status(500).json({ message: 'Erreur serveur' });
    }
})

export default router