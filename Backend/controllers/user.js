//BCRYPT//
const bcrypt = require( 'bcrypt' );
//modèle user//
const User = require( '../models/User' );
//token//
const jwt = require( 'jsonwebtoken' );




exports.signup = ( req, res, next ) => {
    var regexpass = new RegExp( '^[.&a-zA-Z0-9!%&*,/:;?@^_.]+$' );
    var regexmail = new RegExp('^[.&a-zA-Z0-9!%&*,/:;?@^_.]+$')
    var pass = req.body.password;
    var mail = req.body.email;
    
    console.log( 'mot de passe ='+" "+regexpass.test( pass )+"  "+ 'email ='+ " "+ regexmail.test( mail ), req.body.email )
    if ( regexpass.test( pass ) === true && regexmail.test( mail ) === true ) {
        bcrypt.hash( req.body.password, 10 )
            .then( hash => {
                const user = new User( {
                    email: req.body.email,
                    password: hash
                } );
                user.save()
                    .then( () => res.status( 201 ).json( { message: 'adorateur de sauce créé !' } ) )
                    .catch( error => res.status( 400 ).json( { error } ) );
            } )

            .catch( error => res.status( 500 ).json( { error } ) );
    }
};

exports.login = ( req, res, next ) => {
    User.findOne( { email: req.body.email } )
        .then( user => {
            if ( !user ) {
                return res.status( 401 ).json( { error: "adorateur de sauces non trouvé" } );
            }
            bcrypt.compare( req.body.password, user.password )
                .then( valid => {
                    if ( !valid ) {
                        return res.status( 401 ).json( { error: "Mot de passe incorrect" } );
                    }
                    res.status( 200 ).json( {
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    } );
                } )
                .catch( error => res.status( 500 ).json( { error } ) );
        } )
        .catch( error => res.status( 500 ).json( { error } ) );

};
