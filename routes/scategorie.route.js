const express = require('express');
const router = express.Router();

const scategorie= require('../models/scategorie')

//creation  d'un nouvelle sous categories
router.post('/',async(req,res) => {
    const {nomscategorie,imagescat,categorieID} = (req.body);
    const scat= new scategorie ({nomscategorie:nomscategorie,imagescat:imagescat,categorieID:categorieID})
    try {
        await scat.save();
        res.status(200).json(scat);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
});

//affichage des sous categories
router.get('/',async(req,res) => {
    try {
        const scat =  await scategorie.find({}, null, {sort: {'_id': -1}}).populate("categorieID")
        res.status(200).json(scat);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
});

//find by id
router.get('/:id',async(req,res) => {
    try {
        const scat = await scategorie.findById(req.params.id)
        res.status(200).json(scat);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
});

//modifier un sous categories
router.put('/:id',async(req,res)=>{
    try {
        const scat= await  scategorie.findByIdAndUpdate(
            {
            "_id":req.params.id
            },
            {
                $set:req.body
            },
        {new:true},
        ) 
        res.status(200).json(scat)
    } catch (error) {
        res.status(404).json({messag:error.message})
    }
});

//supprimer un sous categories
router.delete('/:id',async(req,res)=>{
try {
    await scategorie.findByIdAndDelete(req.params.id)
    res.status(200).json("suppression réussie")
} catch (error) {
    res.status(404).json({messag:error.message})
}
});

module.exports=router;