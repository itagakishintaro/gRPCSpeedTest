$( '#grpc' ).on( 'click', () => {
  console.log( 'HELLLO' );
  $.get( 'api/grpc' )
    .done( ( data ) => {
      $( '#grpcTime' ).text( data.time );
      for ( let i = 0; i <= 9; i++ ) {
        $( '#grpcImg' + i ).attr( 'src', 'data:image/png;base64,' + data[ 'b64image' + i ] );
      }
    } )
    .fail( ( err ) => {
      console.log( err );
    } );
} );