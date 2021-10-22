//VARIABLES MONGOOSE À REMPLACER//
const Username = 'username';
const Password = 'motdepass';


//CONSTANTES//
const bodyParser = require( 'body-parser' );
const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' );
const sauceRoutes = require( './routes/sauces' );
const userRoutes = require( './routes/user' );
//DONNE ACCÈS AU CHEMIN DE NOTRE SYSTÈME DE FICHIER (IMAGES)//
const path = require( 'path' );
//HELMET CONST//
const helmet = require( 'helmet' );

//CORS (ABAISSER LA SÉCURITÉ EXPRESS POUR QUE TOUS LES UTILISATEURS AIENT ACCÈS À L'APP)//
app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE' );
    next();
} );


//HELMET//
app.use( helmet() );
//helmet x-powered-by//
app.disable( 'x-powered-by' );

//ANTI DDOS//
const rateLimit = require( "express-rate-limit" );


const limiter = rateLimit( {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
} );

app.use( limiter );  //  apply to all requests




//EXPRESS-SESSION, CHANGE LE NOM DU COOKIE//
var session = require( 'express-session' );
app.set( 'trust proxy', 1 ) // trust first proxy
app.use( session( {
    saveUninitialized: false,
    resave:false,
    secret: 's3Cur3',
    name: 'sessionId',
} )
);


//EXTRAIRE LES OBJETS JSON//
app.use( bodyParser.json() );
//DÉBUT DE LA ROUTE, APPLIQUER LE ROUTER POUR À CETTE ROUTE//
app.use( '/api/sauces', sauceRoutes );
//ROUTES D'AUTHENTIFICATIONS//
app.use( '/api/auth', userRoutes );
//MULTER STATIC//
app.use( '/images', express.static( path.join( __dirname, 'images' ) ) );




//LIER LA BASE DE DONNEE À L'API//
mongoose.connect( `mongodb+srv://${ Username }:${ Password }@giwaclust.f01kg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } )
    .then( () => console.log( 'Connexion à MongoDB réussie !' ) )
    .catch( () => console.log( 'Connexion à MongoDB échouée !' ) );



//EXPORTER L'APP//
module.exports = app;


