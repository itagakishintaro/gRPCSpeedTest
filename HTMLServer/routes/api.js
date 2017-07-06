var express = require( 'express' );
var router = express.Router();

// For Cross Origin
router.all( '/*', function( req, res, next ) {
    res.contentType( 'json' );
    res.header( 'Access-Control-Allow-Origin', '*' );
    next();
} );

/* gRPC */
router.get( '/grpc', function( req, res, next ) {
    const PROTO_PATH = '../GrpcServer/protos/grpc.proto';
    var grpc = require( 'grpc' );
    var grpc_proto = grpc.load( PROTO_PATH );

    let start = new Date().getTime();

    function main() {
        var client = new grpc_proto.Grpc( 'localhost:50051',
            grpc.credentials.createInsecure() );

        client.getImages( '', function( err, images ) {
            let data = {};
            if ( err ) {
                console.log( err );
                res.send( err );
            } else {
                for ( let i = 0; i <= 9; i++ ) {
                    data[ 'b64image' + i ] = new Buffer( images[ 'image' + i ] ).toString( 'base64' );
                }
                let stop = new Date().getTime();
                data.time = stop - start;
                res.send( data );
            }
        } );
    }

    main();
} );

/* REST */
router.get( '/rest', function( req, res, next ) {
    let start = new Date().getTime();
    let fetchUrl = require( "fetch" ).fetchUrl;
    let data = {};

    let fetchImage = ( index ) => {
        const MAX = 9;
        if ( MAX < index ) {
            let stop = new Date().getTime();
            data.time = stop - start;
            res.send( data );
        } else {
            fetchUrl( 'http://localhost:3001/api/' + index + '.png', function( error, meta, img ) {
                data[ 'b64image' + index ] = new Buffer( img ).toString( 'base64' );
                fetchImage( index + 1 );
            } );
        }
    }
    fetchImage( 0 );
} );

module.exports = router;
