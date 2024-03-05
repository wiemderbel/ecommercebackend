const express =require('express')
const router = express.Router()

const article = require('../models/article')

// afficher la liste des articles.

router.get('/', async (req, res )=> { 
    try {
        const art= await article.find()
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
});

//creation d'un noveau article

router.post('/', async (req, res) => { 
    const {reference,designation,prix,marque,qtestock,imageart,scategorieID} = (req.body);
    const art1 = new article({reference:reference, designation:designation,prix:prix,marque:marque,qtestock:qtestock,scategorieID:scategorieID ,imageart:imageart})

    try {
        const art= await art1.save()
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
});

//modifier un article
router.put('/:id', async (req, res)=> {
    try {
        const art = await article.findByIdAndUpdate(
        {
            "_id":req.params.id
        },
        {
            $set :req.body,
        },
        {new:true}, //raja3li e jdid
        );

        res.status(200).json(art)

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//supprimer un article
router.delete('/:id', async (req,res) =>{
    try {
        await article.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"suppression réussie"})
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//find by id
router.get('/:id',async(req, res)=>{ //:parametre
    try {
        const art = await article.findById(req.params.id)
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


// afficher la liste des articles par page
router.get('/art/pagination', async(req, res) => { 
    const page = req.query.page ||1 // Current page
    const limit = req.query.limit ||5; // Number of items per page
    // Calculez le nombre d'éléments à sauter (offset)
    const offset = (page - 1) * limit;
    try {
    // Effectuez la requête à votre source de données en utilisant les paramètres de pagination
    const articlesTot = await article.countDocuments();
    const articles = await article.find( {}, null, {sort: {'_id': -1}})
        .skip(offset)
        .limit(limit)
        res.status(200).json({articles:articles,tot:articlesTot});
        } 
        catch (error) {
        res.status(404).json({ message: error.message });
        }
    });
    

module.exports=router;