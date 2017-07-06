$( '#grpc' ).on( 'click', () => {
    let start = new Date().getTime();
    $( '#grpcImg' ).attr( 'src', 'api/grpc' );
    let stop = new Date().getTime();
    console.log( stop, start, stop - start );
    $( '#grpcTime' ).text( stop - start );
} );
