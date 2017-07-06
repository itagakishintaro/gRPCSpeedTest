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

    function main() {
        const filename = 'mountain.png';
        var client = new grpc_proto.Grpc( 'localhost:50051',
            grpc.credentials.createInsecure() );

        client.getImage( filename, function( err, response ) {
            if ( err ) {
                console.log( 'ERROR:', err );
                res.send( err );
            } else {
                console.log( 'OK:', response );
                res.send( response.image );
            }
        } );
    }

    main();

} );

module.exports = router;
