(function(window, document, navigator, $){
  var interval,
      canvas,
      ctx,
      $head,
      $ico,
      title,
      textspinner = (document.characterSet.toUpperCase()==="UTF-8"?'◐◓◑◒':'+x').split(''),//terrible backup, but we can't encode ISO in a UTF file, right?
      textspinnerln = textspinner.length,
      xIconString = 'image/x-icon',
      xIconSelector = '[type="'+xIconString+'"]',
      size = 32,//retina friendly
      linewidth = 0.15*size,
      radius = size*0.375,//spinner relative to size of icon
      hsize = size/2,
      no_favicon_support,
      stopped = true,//start stopped
      step = 0,
      stepFactor = 0.025;//rotation or step in each "frame," for canvas version

  //we want these cached, not called every time favspin is called, but script could be loaded in the head
  $(document).ready(function(){
      $head = $('head');
      $ico = $head.find('[rel*="icon"]');
      title = document.title;
      no_favicon_support = (
        !window.CanvasRenderingContext2D || // don't run without canvas support
        !$ico.length || // also don't run if no icon already exists, otherwise spinner gets cached as THE site icon
        (navigator.vendor && navigator.vendor.indexOf('Apple') > -1) || // also don't run on anything Apple: Safari doesn't show favicons in tabs
        navigator.userAgent.toLowerCase().indexOf('msie')!==-1 // and IE doesn't allow you to update it dynamically
      );
  });

  function stopSpinning(){
    document.title = title;
    $head.find(xIconSelector).remove().end().append($ico);
  }

  function updateTitle(){
    document.title = textspinner[step%textspinnerln] +' '+title;
    step++;
  }

  function initCanvas(){
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    // ctx.globalCompositeOperation = 'destination-over';
    // ctx.fillStyle = "rgba(255,255,255,0)";
    // ctx.fillRect(0, 0, size, size);
    // return canvas;
  }

  function rotateFavicon(){
    var link = document.createElement('link'),//need to create a new element to get updates in some situations
        newrot = Math.ceil((step%2)*100)/100,//two-decimal fractions, to avoid weird js
        gradsizefactor = (newrot/2)*size,
        gradient = ctx.createLinearGradient(0,0,0,size),
        startAngle = newrot * Math.PI,
        endAngle = (newrot+1.3) * Math.PI,
        counterClockwise = false;

    gradient.addColorStop("0",'rgba(31,155,222,0.1)');
    gradient.addColorStop("0.3",'rgba(31,155,222,0.2)');
    gradient.addColorStop("1",'rgba(31,155,222,0.6)');


    //console.log(gradsizefactor,size-gradsizefactor);

    ctx.clearRect(0,0,size,size);
    ctx.beginPath();
    ctx.arc(hsize, hsize, radius, startAngle, endAngle, counterClockwise);
    ctx.lineWidth = linewidth;

    // line color
    ctx.strokeStyle = gradient;
    ctx.stroke();

    //console.log(newrot);
    // ctx.translate(hsize, hsize); // to get it in the origin
    // //ctx.rotate( newrot ); //rotate in origin
    // ctx.rotate( 45 * Math.PI/180 ); //rotate in origin
    // ctx.translate(-hsize, -hsize); // put it back

    link.type = xIconString;
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL(xIconString);

    $head.find(xIconSelector).remove().end().append(link);

    step += stepFactor;

    console.log("%cffffd\nfffffd\nfffffd", 'background: url('+link.href+') no-repeat; background-size: 32px 32px; color: transparent; padding-bottom:18px;');
  }


  function animate(fn, fps){
    (function self_calling_fn(){
      interval = window.setTimeout(function(){
          if(!stopped){
            requestAnimationFrame(self_calling_fn);
          }else{
            stopSpinning();
          }
      }, 1000 / fps);
      fn();
    })();
  }

  function favispin(stop){
    clearInterval(interval);
    $(document).ready(function(){
      if(!stop){
          stopped = false;
          if(no_favicon_support){
            animate(updateTitle, 3);
          }else{
            if(!canvas){
              initCanvas();
            }
            $ico.detach();
            animate(rotateFavicon, 60);
          }
      }else{
          stopped = true;
          window.setTimeout(stopSpinning,1);//there are two ways this function is called, ensuring it is restored on next tic
      }
    });
  }

  //extend this function so it has helper methods
  $.extend(favispin,{
    ison: function(){ return !stopped; },
    on:function(){favispin();},//protect from any arguments
    off:function(){favispin(true);}//protect from any arguments
  });

  $.extend($,{
    favispin: favispin
  });

})(window,document,navigator,jQuery);
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