!function(l,n,m,i){function x(){n.title=s,u.find(v).remove().end().append(a)}function y(){n.title=g[r%F]+" "+s,r++}function S(){o=n.createElement("canvas"),t=o.getContext("2d"),o.width=e,o.height=e}function R(){var i=n.createElement("link"),c=Math.ceil(r%2*100)/100,a=t.createLinearGradient(0,0,0,e),d=c*Math.PI,m=(c+1.3)*Math.PI,s=!1;a.addColorStop("0","rgba(31,155,222,0.1)"),a.addColorStop("0.3","rgba(31,155,222,0.2)"),a.addColorStop("1","rgba(31,155,222,0.6)"),t.clearRect(0,0,e,e),t.beginPath(),t.arc(A,A,C,d,m,s),t.lineWidth=q,t.strokeStyle=a,t.stroke(),i.type=f,i.rel="shortcut icon",i.href=o.toDataURL(f),u.find(v).remove().end().append(i),r+=b}function w(e,n){!function t(){h=l.setTimeout(function(){c?x():requestAnimationFrame(t)},1e3/n),e()}()}function d(e){clearInterval(h),i(n).ready(function(){e?(c=!0,l.setTimeout(x,1)):(c=!1,p?w(y,3):(o||S(),a.detach(),w(R,60)))})}var h,o,t,u,a,s,p,g=("UTF-8"===n.characterSet?"◐◓◑◒":"+x").split(""),F=g.length,f="image/x-icon",v='[type="'+f+'"]',e=32,q=.15*e,C=.375*e,A=e/2,c=!0,r=0,b=.025;i(n).ready(function(){u=i("head"),a=u.find('[rel*="icon"]'),s=n.title,p=!l.CanvasRenderingContext2D||!a.length||m.vendor&&m.vendor.indexOf("Apple")>-1||-1!==m.userAgent.toLowerCase().indexOf("msie")}),i.extend(d,{ison:function(){return!c},on:function(){d()},off:function(){d(!0)}}),i.extend(i,{favispin:d})}(window,document,navigator,jQuery),window.requestAnimationFrame||(window.requestAnimationFrame=function(e){return e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(n){e.setTimeout(n,1e3/60)}}(window));