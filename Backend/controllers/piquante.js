const Sauces = require( '../models/sauces' );
const fs = require( 'fs' );




exports.getAllSauce = ( req, res, next ) => {
    Sauces.find()
        .then( sauces => { res.status( 200 ).json( sauces ) } )
        .catch( error => res.status( 400 ).json( { error } ) );
}


exports.createSauce = ( req, res, next ) => {
    console.log( req.body.sauce )
    const sauceObject = JSON.parse( req.body.sauce );
    delete sauceObject._id;
    var sauces = new Sauces( {
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        imageUrl: `${ req.protocol }://${ req.get( 'host' ) }/images/${ req.file.filename }`
    } );
    sauces.save()
        .then( () => res.status( 201 ).json( { message: 'sauce créee' } ) )
        .catch( error => res.status( 400 ).json( { error } ) );
};


exports.getOneSauce = ( req, res, next ) => {
    Sauces.findOne( { _id: req.params.id } )
        .then( sauce => res.status( 200 ).json( sauce ) )
        .catch( error => res.status( 404 ).json( { error } ) );
};


exports.modifySauce = ( req, res, next ) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse( req.body.sauce ),
            imageUrl: `${ req.protocol }://${ req.get( 'host' ) }/images/${ req.file.filename }`
        } : { ...req.body }
    Sauces.updateOne( { _id: req.params.id }, { ...sauceObject, _id: req.params.id } )
        .then( () => res.status( 200 ).json( { message: "sauce modifié !" } ) )
        .catch( error => res.status( 400 ).json( { error } ) );
};



exports.deleteSauce = ( req, res, next ) => {
    Sauces.findOne( { _id: req.params.id } )
        .then( sauce => {
            const filename = sauce.imageUrl.split( '/images/' )[ 1 ];
            fs.unlink( `images/${ filename }`, () => {
                Sauces.deleteOne( { _id: req.params.id } )
                    .then( () => res.status( 200 ).json( { message: 'sauce supprimé' } ) )
                    .catch( error => res.status( 400 ).json( { error } ) );
            } );
        } )
        .catch( error => res.status( 500 ).json( { error } ) );

};



var usersFinder = 0;
var usersFinderdis = 0;
exports.createLike = ( req, res, next ) => {
    console.log( "createLike" );
    console.log( req.body );
    Sauces.findOne( { _id: req.params.id } )
        .then( sauce => {
            usersFinder = sauce.usersLiked;
            usersFinderdis = sauce.usersDisliked;
            const USER = req.body.userId
            
            if ( usersFinder.includes( USER ) === false && req.body.like === 1  ) {
                Sauces.updateOne( { _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }, _id: req.params.id } )
                    .then( () => res.status( 200 ).json( { message: "j'aime" } ) )
                    .catch( error => res.status( 400 ).json( { error } ) );
                
            } else if ( usersFinderdis.includes( USER ) === false && req.body.like === -1  ) {
                Sauces.updateOne( { _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }, _id: req.params.id } )
                    .then( () => res.status( 200 ).json( { message: "je n'aime pas" } ) )
                    .catch( error => res.status( 400 ).json( { error } ) );
                
            } else if ( usersFinder.includes( USER ) === true  && req.body.like === 0)  {
                Sauces.updateOne( { _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersliked: req.body.userId, usersLiked: req.body.userId }, _id: req.params.id } )
                    .then( () => res.status( 200 ).json( { message: "je ne sais pas quoi en penser" } ) )
                    .catch( error => res.status( 400 ).json( { error } ) );
                
            } else if ( usersFinderdis.includes( USER ) === true && req.body.like === 0  ) {
                Sauces.updateOne( { _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId, usersLiked: req.body.userId }, _id: req.params.id } )
                    .then( () => res.status( 200 ).json( { message: "je ne sais pas quoi en penser" } ) )
                    .catch( error => res.status( 400 ).json( { error } ) ); {
                    console.log( sauce.usersDisliked );
                }


            }
        } )
            .catch( error => res.status( 500 ).json( { error } ) );

    
}