(function($){
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      interval,
      $head,
      $ico,
      size = 32,
      linewidth = 0.1*size,
      radius = size*0.375,
      hsize = size/2,
      stopped = false,
      rotation = 0;

  $(document).ready(function(){
      $head = $('head');
      $ico = $head.find('[rel*="icon"]');
  });

  function favspin(stop){

      if(!window.CanvasRenderingContext2D || !$ico.length){
          return false;
      }

      $(document).ready(function(){
          canvas.width = size;
          canvas.height = size;
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = "rgba(255,255,255,0)";
          ctx.fillRect(0, 0, size, size);

          function draw(pos){
              interval = setTimeout(function() {
                  if(!stopped){
                      requestAnimationFrame(draw);
                  }else{
                      $head.find('[type="image/x-icon"]').remove().end().append($ico);
                  }
              }, 1000 / 60);

              var link = document.createElement('link'),
                  newrot = Math.ceil((rotation%2)*100)/100,
                  gradsizefactor = (((newrot/2)*size)/size)*size,
                  gradient = ctx.createLinearGradient(0,0,0,size);
                  gradient.addColorStop("0",'rgba(31,155,222,0.1)');
                  gradient.addColorStop("0.3",'rgba(31,155,222,0.2)');
                  gradient.addColorStop("1.0",'rgba(31,155,222,0.6)');

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

              link.type = 'image/x-icon';
              link.rel = 'shortcut icon';
              link.href = canvas.toDataURL("image/x-icon");

              $head.find('[type="image/x-icon"]').remove().end().append(link);
              rotation += 0.025;
              //console.log("%cffffd\nfffffd\nfffffd", 'background: url('+link.href+') no-repeat; background-size: 32px 32px; color: transparent; padding-bottom:18px;');
          }

          clearInterval(interval);
          if(!stop){
              $ico.detach();
              stopped = false;
              draw();
          }else{
              stopped = true;
              $head.find('[type="image/x-icon"]').remove().end().append($ico);
          }

      });
  }
  $.extend($,{
    favspin: {
      ison: function(){return !stopped;},
      on:function(){favspin();},//protect from any arguments
      off:function(){favspin(true);}//protect from any arguments
    }
  });

})(jQuery);