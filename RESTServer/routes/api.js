var express = require( 'express' );
var router = express.Router();
var fs = require( 'fs' );
var IMG_DIR_PATH = '../img/';

// For Cross Origin
router.all( '/*', function( req, res, next ) {
    res.contentType( 'json' );
    res.header( 'Access-Control-Allow-Origin', '*' );
    next();
} );

router.get( '/:name', function( req, res, next ) {
    fs.readFile( IMG_DIR_PATH + req.params.name, function( err, img ) {
        if ( err ) {
            res.send( err );
        } else {
            res.send( img );
        }
    } );
} );

module.exports = router;
