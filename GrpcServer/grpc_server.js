var fs = require( 'fs' );

var PROTO_PATH = './protos/grpc.proto';
var IMG_DIR_PATH = '../img/';

var grpc = require( 'grpc' );
var grpc_proto = grpc.load( PROTO_PATH );

function getImage( call, callback ) {
    fs.readFile( IMG_DIR_PATH + call.request.name, function( err, img ) {
        if ( err ) {
            callback( err, null );
        } else {
            callback( null, { image: img } );
        }
    } );
}

function main() {
    var server = new grpc.Server();
    server.addProtoService( grpc_proto.Grpc.service, { getImage: getImage } );
    server.bind( '0.0.0.0:50051', grpc.ServerCredentials.createInsecure() );
    server.start();
}

main();
