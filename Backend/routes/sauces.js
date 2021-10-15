const express = require( 'express' );
const router = express.Router();
const multer = require( '../middleware/multer-config' )

const saucesCtrl = require( '../controllers/piquante' );
const auth = require( '../middleware/auth' );




router.get( '/', auth, saucesCtrl.getAllSauce );
router.post( '/', auth, multer, saucesCtrl.createSauce );
router.get( '/:id', auth, saucesCtrl.getOneSauce );
router.put( '/:id', auth,multer, saucesCtrl.modifySauce );
router.delete( '/:id', auth, saucesCtrl.deleteSauce );
router.post( '/:id/like', auth, saucesCtrl.createLike );






module.exports = router;