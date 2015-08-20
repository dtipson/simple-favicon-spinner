if ( !window.requestAnimationFrame ) {

  window.requestAnimationFrame = ( function(window) {
    return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function( callback ) {
        window.setTimeout( callback, 1000 / 60 );
      };
  })(window);

}