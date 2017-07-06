$( '#rest' ).on( 'click', () => {
    let start = new Date().getTime();
    $( '#restImg' ).attr( 'src', '//localhost:3001/api/mountain.png' );
    let stop = new Date().getTime();
    console.log( stop, start, stop - start );
    $( '#restTime' ).text( stop - start );
} );
