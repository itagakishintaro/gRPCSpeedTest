var fs = require( 'fs' );

var PROTO_PATH = './protos/grpc.proto';
var IMG_DIR_PATH = '../img/';

var grpc = require( 'grpc' );
var grpc_proto = grpc.load( PROTO_PATH );

function getImages( call, callback ) {
    let images = {};

    let readFiles = ( index ) => {
        const MAX = 9;
        if ( MAX < index ) {
            callback( null, images );
        } else {
            fs.readFile( IMG_DIR_PATH + index + '.png', function( err, img ) {
                images[ 'image' + index ] = img;
                readFiles( index + 1 );
            } );
        }
    }
    readFiles( 0 );
}

function main() {
    var server = new grpc.Server();
    server.addProtoService( grpc_proto.Grpc.service, { getImages: getImages } );
    server.bind( '0.0.0.0:50051', grpc.ServerCredentials.createInsecure() );
    server.start();
}

main();
