!function(e){function n(n){return window.CanvasRenderingContext2D&&o.length?void e(document).ready(function(){function e(n){t=setTimeout(function(){l?i.find('[type="image/x-icon"]').remove().end().append(o):requestAnimationFrame(e)},1e3/60);var s=document.createElement("link"),p=Math.ceil(f%2*100)/100,g=r.createLinearGradient(0,0,0,d);g.addColorStop("0","rgba(31,155,222,0.1)"),g.addColorStop("0.3","rgba(31,155,222,0.2)"),g.addColorStop("1.0","rgba(31,155,222,0.6)"),r.clearRect(0,0,d,d);var h=p*Math.PI,v=(p+1.3)*Math.PI,w=!1;r.beginPath(),r.arc(u,u,m,h,v,w),r.lineWidth=c,r.strokeStyle=g,r.stroke(),s.type="image/x-icon",s.rel="shortcut icon",s.href=a.toDataURL("image/x-icon"),i.find('[type="image/x-icon"]').remove().end().append(s),f+=.025}a.width=d,a.height=d,r.globalCompositeOperation="destination-over",r.fillStyle="rgba(255,255,255,0)",r.fillRect(0,0,d,d),clearInterval(t),n?(l=!0,i.find('[type="image/x-icon"]').remove().end().append(o)):(o.detach(),l=!1,e())}):!1}var t,i,o,a=document.createElement("canvas"),r=a.getContext("2d"),d=32,c=.1*d,m=.375*d,u=d/2,l=!1,f=0;e(document).ready(function(){i=e("head"),o=i.find('[rel*="icon"]')}),e.extend(e,{favspin:{ison:function(){return!l},on:function(){n()},off:function(){n(!0)}}})}(jQuery),window.requestAnimationFrame||(window.requestAnimationFrame=function(e){return e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(n){e.setTimeout(n,1e3/60)}}(window));