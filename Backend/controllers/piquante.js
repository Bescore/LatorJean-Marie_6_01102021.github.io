const Sauces = require( '../models/sauces' );



exports.getAllSauce = ( req, res, next ) => {
    Sauces.find()
        .then( sauces => { res.status( 200 ).json( sauces ) } )
        .catch( error => res.status( 400 ).json( { error } ) );
}
    
  
exports.createSauce = ( req, res, next ) => {
    console.log(req.body.sauce)
    const sauceObject = JSON.parse( req.body.sauce);
    delete sauceObject._id;
    const sauces = new Sauces( {
        ...sauceObject,
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } );
    sauces.save()
        .then( () => res.status( 201 ).json( { message: 'sauce créee' } ) )
        .catch( error => res.status( 400 ).json( { error } ) );
};


exports.getOneSauce = ( req, res, next ) => {
    Sauces.findOne( { _id: req.params.id }) 
        .then( sauce => res.status( 200 ).json( sauce ) )
        .catch( error => res.status( 404 ).json( { error } ) );
};


exports.modifySauce = ( req, res, next ) => {
    Sauces.updateOne( { _id: req.params.id }, { ...req.body, _id: req.params.id } )
        .then( () => res.status( 200 ).json( { message: "sauce modifié !" } ) )
        .catch( error => res.status( 400 ).json( { error } ) );
};



exports.deleteSauce = ( req, res, next ) => {
    Sauces.deleteOne( { _id: req.params.id } )
        .then( () => res.status( 200 ).json( { message: 'sauce supprimé' } ) )
        .catch( error => res.status( 400 ).json( { error } ) );
};