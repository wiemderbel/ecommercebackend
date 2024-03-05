const mongoose =require("mongoose")

//creation d'une collection categorie
const categorieSchema=mongoose.Schema({ //.schema bech yesna3lek
    nomcategorie:{ type: String, required: true,unique:true }, // required obligatoire
    imagecategorie :{ type: String, required: false }
    })
 module.exports=mongoose.model('categorie',categorieSchema) // yesna3 l model  bech norbto l modele b schema