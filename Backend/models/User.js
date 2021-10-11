const mongoose = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );


const usersSchema = mongoose.Schema( {
    email: { type: String, required: true, unique:true },
    password: { type: String, required:true},
    
} );

//ON APPLIQUE LE PLUGIN À NOTRE SCHEMA POUR EVITER QUE PLUSIEURS USERS UTILISENT LA MÊME ADRESSE MAIL//
usersSchema.plugin( uniqueValidator );



//EXPORT//
module.exports = mongoose.model( 'User', usersSchema );