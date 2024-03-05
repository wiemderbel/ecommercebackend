//importation des module necessaire .
const express = require("express") //pour les route
const mongoose= require("mongoose")

const dotenv=require ('dotenv')
const categoriesRouter = require("./routes/categorie.route")
const scategorieRouter = require("./routes/scategorie.route")
const articleRouter = require("./routes/article.route")

//pour connetre l format json
const app = express() // Création d'une instance de l'application Express
app.use(express.json()) // Middleware pour parser les requêtes avec des données au format JSON


// Chargement des variables d'environnement depuis le fichier .env
dotenv.config() //pour acceder ala fichier .env

// Connexion à la base de données MongoDB à l'aide de mongoose
mongoose.connect(process.env.DATABASECLOUD) // pour la connexion ala bd a travers mongoose si exist ysouitchi 3liha 
//si non yesna3ha
.then(() => { //.then itha l conx c bon saret 
    console.log("DataBase Successfully Connected");
})
.catch(err => { //ereeur
    console.log("Unable to connect to database", err);
process.exit(); //arret
});

app.get("/",(req,res) =>{ //role de express
    res.send("bienvenue dans notre site ")
})

app.use("/api/categorie",categoriesRouter)
app.use("/api/scategorie",scategorieRouter)
app.use("/api/article",articleRouter)

app.listen(process.env.PORT ,() =>{
console.log(`server is listen  ${process.env.PORT}`)
})

module.exports=app;