$( '#rest' ).on( 'click', () => {
    $.get( 'api/rest' ).done( ( data ) => {
        $( '#restTime' ).text( data.time );
        for ( let i = 0; i <= 9; i++ ) {
            $( '#restImg' + i ).attr( 'src', 'data:image/png;base64,' + data[ 'b64image' + i ] );
        }
    } );
} );
