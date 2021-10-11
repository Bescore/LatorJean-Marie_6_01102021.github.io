const express = require( 'express' );//import d'express//
const router = express.Router(); //fonction router//
const userCtrl = require( '../controllers/user' );

router.post( '/signup', userCtrl.signup );
router.post( '/login',userCtrl.login );

module.exports = router;