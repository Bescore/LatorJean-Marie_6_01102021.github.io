//CONSTANTE//
const bodyParser = require( 'body-parser' );
const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' );
const sauceRoutes = require( './routes/sauces' )
const userRoutes = require( './routes/user' );


//CORS (ABAISSER LA SÉCURITÉ EXPRESS POUR QUE TOUS LES UTILISATEURS AIENT ACCÈS À L'APP)//
app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
    next();
} );

//TRANSFORMER LES REQUÊTES EN OBJET//
app.use( bodyParser.json() );
//DÉBUT DE LA ROUTE, APPLIQUER LE ROUTER POUR À CETTE ROUTE//
app.use( '/api/sauces', sauceRoutes );
//ROUTES D'AUTHENTIFICATIONS//
app.use( '/api/auth', userRoutes );




//LIER LA BASE DE DONNEE À L'API//
mongoose.connect( 'mongodb+srv://Bescore:Bescore007@giwaclust.f01kg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } )
    .then( () => console.log( 'Connexion à MongoDB réussie !' ) )
    .catch( () => console.log( 'Connexion à MongoDB échouée !' ) );



//EXPORTER L'APP//
module.exports = app;


