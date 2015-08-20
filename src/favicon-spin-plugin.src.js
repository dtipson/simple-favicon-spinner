(function(window, document, $){
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      interval,
      $head,
      $ico,
      xIconString = 'image/x-icon',
      xIconSelector = '[type="'+xIconString+'"]',
      size = 32,//retina friendly
      linewidth = 0.15*size,
      radius = size*0.375,//spinner relative to size of icon
      hsize = size/2,
      stopped = true,//start stopped
      rotation = 0,
      rotationFactor = 0.025;//rotation in each "frame"

  //we want these cached, not called every time favspin is called, but script could be loaded in the head
  $(document).ready(function(){
      $head = $('head');
      $ico = $head.find('[rel*="icon"]');
  });

  function restoreIcon(){
    $head.find(xIconSelector).remove().end().append($ico);
  }

  function favispin(stop){

      // don't run without canvas support
      // also don't run if no icon already exists, otherwise spinner gets cached as THE site icon
      // also don't run on anything Apple: Safari doesn't show favicons in tabs
      if(!window.CanvasRenderingContext2D || !$ico.length || (navigator.vendor && navigator.vendor.indexOf('Apple') > -1)){
          return false;
      }

      $(document).ready(function(){
          canvas.width = size;
          canvas.height = size;
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = "rgba(255,255,255,0)";
          ctx.fillRect(0, 0, size, size);

          function draw(pos){
            interval = window.setTimeout(function() {
                if(!stopped){
                  requestAnimationFrame(draw);
                }else{
                  restoreIcon();
                }
            }, 1000 / 60);

            var link = document.createElement('link'),
                newrot = Math.ceil((rotation%2)*100)/100,//two-decimal fractions, to avoid weird js
                gradsizefactor = (newrot/2)*size,
                gradient = ctx.createLinearGradient(0,0,0,size);
                gradient.addColorStop("0",'rgba(31,155,222,0.1)');
                gradient.addColorStop("0.3",'rgba(31,155,222,0.2)');
                gradient.addColorStop("1",'rgba(31,155,222,0.6)');

            //console.log(gradsizefactor,size-gradsizefactor);

            ctx.clearRect(0,0,size,size);
            // ctx.fillStyle = "#F00";
            // ctx.fillRect(9, 9, 11, 11);

            var startAngle = newrot * Math.PI,
                endAngle = (newrot+1.3) * Math.PI,
                counterClockwise = false;

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

            rotation += rotationFactor;

            console.log("%cffffd\nfffffd\nfffffd", 'background: url('+link.href+') no-repeat; background-size: 32px 32px; color: transparent; padding-bottom:18px;');
          }

          clearInterval(interval);
          if(!stop){
              $ico.detach();
              stopped = false;
              draw();
          }else{
              stopped = true;
              window.setTimeout(restoreIcon,10);//there are two ways this function is called, ensuring it is restored.
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

})(window,document,jQuery);