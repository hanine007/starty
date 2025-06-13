import express from "express";
import Societe from "../models/societe.js";
//import { check, validationResult } from "express-validator";
const router =express.Router();
// tous les societes
router.get('/',async(req,res)=>{
    const societes= await Societe.find();
    res.json(societes);
})
//creation une societe
router.post('/',async(req,res)=>{
    const nouvelle = new Societe(req.body);
    try {
        const saved = await nouvelle.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});
//modifier une societe
router.put('/:id',async(req,res)=>{
    try {
        const updateSociete = await Societe.findByIdAndUpdate(req.params.id,req.body,{new: true})
        res.json(updateSociete);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//supprimer une societe
router.delete('/:id',async(req,res)=>{
    try{
        const deleteSociete= await Societe.findByIdAndDelete(req.params.id);
        res.json ({ message: "Societe supprimée avec succes"})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

export default router;