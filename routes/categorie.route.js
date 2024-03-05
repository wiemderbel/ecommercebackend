const express = require('express');
const router = express.Router(); //j'estence un objet de la classe router

// Créer une instance de categorie.
const categorie = require('../models/categorie');


// afficher la liste des categories.
router.get('/', async (req, res )=> { 
    try {
        const cat= await categorie.find()
        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
});


// créer un nouvelle catégorie  insertion dans la bd
router.post('/', async (req, res) => { 
    const {nomcategorie,imagecategorie} = (req.body);
    const cat1 = new categorie({nomcategorie:nomcategorie, imagecategorie:imagecategorie})

    try {
        await cat1.save();
        res.status(200).json(cat1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
});


// chercher une catégorie 
router.get('/:categorieId',async(req, res)=>{ //:parametre
    try {
        const cat = await categorie.findById(req.params.categorieId)
        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


// modifier une catégorie
router.put('/:id', async (req, res)=> {
    try {
        const cat = await categorie.findByIdAndUpdate(
        {
            "_id":req.params.id
        },
        {
            $set :req.body,
        },
        {new:true}, //raja3li e jdid
        )
        res.status(200).json(cat)

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


// Supprimer une catégorie
router.delete('/:id', async (req, res)=> {
    try {
        await categorie.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "suppression réussie"})
    } catch (error) {
        res.status(404).json({message : error.message});
    }
});


module.exports = router;