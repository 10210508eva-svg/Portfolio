(function(){
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,tries=0;
function boot(){var st=document.querySelector('[data-env]');if(!st||!st.querySelector('[data-env-hint]')||!st.animate){if(tries++<400)requestAnimationFrame(boot);return;}run(st);}
function run(st){
 var q=function(s){return st.querySelector(s);};
 var front=q('[data-env-front]'),flapC=q('[data-flap-closed]'),flapO=q('[data-flap-open]'),seal=q('[data-env-seal]'),hint=q('[data-env-hint]'),letter=q('[data-env-letter]'),ul=q('[data-env-ul]');
 var notes=Array.prototype.slice.call(st.querySelectorAll('[data-env-note]'));
 var path=ul&&ul.querySelector('path'),len=path?path.getTotalLength():0;
 if(path){path.style.strokeDasharray=len;path.style.strokeDashoffset=len;}
 var K=reduce?0.001:1,state='closed',busy=true,anims=[],auto=null;
 function A(el,k,o){o.fill='both';o.duration=(o.duration||0)*K;o.delay=(o.delay||0)*K;var a=el.animate(k,o);anims.push(a);return a;}
 function showHint(t,delay){hint.textContent=t;hint.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:450*K,delay:(delay||0)*K,easing:'ease-out',fill:'both'});}
 function hideHint(){hint.animate([{opacity:1},{opacity:0}],{duration:200*K,fill:'both'});}
 function open(){
  if(state!=='closed')return;state='open';busy=true;clearTimeout(auto);hideHint();
  A(seal,[{transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:'translate(-50%,-50%) scale(1.3)',offset:.35},{transform:'translate(-50%,-50%) scale(0) rotate(50deg)',opacity:0}],{duration:360,easing:'ease-in'});
  A(flapC,[{transform:'perspective(900px) rotateX(0deg)'},{transform:'perspective(900px) rotateX(90deg)'}],{duration:240,delay:220,easing:'ease-in'});
  A(flapO,[{transform:'perspective(900px) rotateX(90deg)',opacity:1},{transform:'perspective(900px) rotateX(180deg)',opacity:1}],{duration:420,delay:460,easing:'cubic-bezier(.2,1.5,.4,1)'});
  A(st,[{transform:'none'},{transform:'scale(1.04,.93)',offset:.4},{transform:'none'}],{duration:340,delay:640,easing:'ease-out'});
  A(letter,[{transform:'translateY(100%)',easing:'cubic-bezier(.3,.7,.3,1)'},{transform:'translateY(-7%)',offset:.68,easing:'cubic-bezier(.3,1.4,.5,1)'},{transform:'none'}],{duration:1100,delay:860});
  if(path)A(path,[{strokeDashoffset:len},{strokeDashoffset:0}],{duration:650,delay:1800,easing:'ease-out'});
  var W=st.offsetWidth,H=st.offsetHeight;
  notes.forEach(function(n){var i=+(n.getAttribute('data-order')||0),side=(n.offsetLeft+n.offsetWidth/2)<W/2?-1:1;
   var rot=+(n.getAttribute('data-rot')||0),cx=n.offsetLeft+n.offsetWidth/2,cy=n.offsetTop+n.offsetHeight/2;
   var dx=W/2-cx,dy=H*.55-cy,py=Math.min(cy,0)-H*.35-cy,sp=side*(10+(i%3)*5);
   A(n,[{transform:'translate('+dx+'px,'+dy+'px) scale(.3)',opacity:0,zIndex:2,easing:'cubic-bezier(.2,.8,.3,1)'},{opacity:1,offset:.1,zIndex:2},{transform:'translate('+(dx*.45)+'px,'+py+'px) scale(1.08) rotate('+sp+'deg)',opacity:1,zIndex:6,offset:.48,easing:'cubic-bezier(.3,1.5,.5,1)'},{transform:'rotate('+rot+'deg)',opacity:1,zIndex:6}],{duration:1200,delay:1250+i*190});
  });
  setTimeout(function(){busy=false;showHint('tap the envelope to do it again');},4100*K);
 }
 function replay(){
  if(state!=='open')return;busy=true;hideHint();
  var cur=anims;anims=[];
  cur.forEach(function(a){a.updatePlaybackRate(-2.6);});
  Promise.all(cur.map(function(a){return a.finished;})).then(function(){cur.forEach(function(a){a.cancel();});state='closed';setTimeout(open,250);});
 }
 function act(){if(busy&&state==='open')return;if(state==='closed')open();else replay();}
 st.addEventListener('click',act);
 front.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();act();}});
 st.animate([{transform:'translateY(-70vh) rotate(-14deg)',opacity:0},{opacity:1,offset:.2},{transform:'translateY(16px) rotate(2.5deg)',offset:.72,easing:'ease-out'},{transform:'none',opacity:1}],{duration:1000*K,easing:'cubic-bezier(.35,.6,.35,1)',fill:'forwards'});
 setTimeout(function(){busy=false;open();},1050*K);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
