import express from 'express';
import Scpi from '../models/scpi.js';
const router = express.Router();
// get touts les scpi
router.get('/',async(req,res)=>{
    try{
        const scpis = await Scpi.find().populate('societeId');
        res.json(scpis);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
})
// creation une scpi 
router.post ('/',async(req,res)=>{
    try{
        const nouvelleScpi = new Scpi(req.body);
        const savedScpi = await nouvelleScpi.save();
        res.status(201).json(savedScpi); 
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
})
// modifier une scpi
router.put('/:id',async(req,res)=>{
    try{
        const updateScpi = await Scpi.findByIdAndUpdate(req.params.id,req.body, { new: true });
        res.json(updateScpi);
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
})
// supprimer une scpi
router.delete('/:id',async(req,res)=>{
    try{
        const deleteScpi = await Scpi.findByIdAndDelete(req.params.id);
        res.json({ message: "SCPI supprimee avec succes" });
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
})

export default router;