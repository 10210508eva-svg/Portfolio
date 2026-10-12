(function(){
var NS='http://www.w3.org/2000/svg',drag=null,wdrag=null,z=10,wz=100,tries=0,openN=0;
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function desk(el){return el.closest('[data-desk]')||document;}
function front(w){w.style.zIndex=++wz;}
function open(f){var n=f.getAttribute('data-folder'),w=desk(f).querySelector('[data-win="'+n+'"]');if(!w)return;
 if(w.style.display==='flex'){front(w);if(w.animate&&!reduce)w.animate([{transform:'rotate(0)'},{transform:'rotate(-1.5deg)'},{transform:'rotate(1deg)'},{transform:'rotate(0)'}],{duration:320});return;}
 w.style.display='flex';w.style.transform='none';front(w);
 var W=w.offsetWidth,H=w.offsetHeight,off=(openN++%4)*26-26;
 var x=Math.max(8,Math.min(innerWidth-W-8,(innerWidth-W)/2+off)),y=Math.max(64,Math.min(innerHeight-H-8,(innerHeight-H)/2+off));
 w.style.left=x+'px';w.style.top=y+'px';
 if(w.animate&&!reduce){var fr=f.getBoundingClientRect(),dx=fr.left+fr.width/2-(x+W/2),dy=fr.top+fr.height/2-(y+H/2);
  w.animate([{transform:'translate('+dx+'px,'+dy+'px) scale(.12)',opacity:0},{transform:'none',opacity:1}],{duration:420,easing:'cubic-bezier(.2,.85,.25,1.05)'});}}
function close(w){if(w.animate&&!reduce){w.animate([{transform:'none',opacity:1},{transform:'scale(.92) translateY(8px)',opacity:0}],{duration:160,easing:'ease-in'}).onfinish=function(){w.style.display='none';};}else w.style.display='none';}
function intro(){var fs=document.querySelectorAll('[data-folder]');if(!fs.length||!document.body){if(tries++<300)requestAnimationFrame(intro);return;}
 ensure();document.documentElement.classList.add('fd-go');if(reduce)return;
 var d=desk(fs[0]),r=d.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+Math.min(r.height,innerHeight)/2;
 fs.forEach(function(f,i){var p=f.querySelector('.fd-pop');if(!p||!p.animate)return;var b=f.getBoundingClientRect(),dx=cx-(b.left+b.width/2),dy=cy-(b.top+b.height/2);
  p.animate([{transform:'translate('+dx+'px,'+dy+'px) scale(.15) rotate(-24deg)',opacity:0},{opacity:1,offset:.35},{transform:'translate(0,0) scale(1) rotate(0)',opacity:1}],{duration:1200,delay:350+i*130,easing:'cubic-bezier(.18,.9,.24,1.12)',fill:'backwards'});});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',intro);else intro();
var svg=null,g=null,p1=null,p2=null,pad=null,pts=null,bb=null,clearBtn=null;
function el(t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e;}
function ensure(){if(!svg){svg=el('svg',{'aria-hidden':'true'});svg.style.cssText='position:absolute;left:0;top:0;width:100%;height:0;pointer-events:none;z-index:40;overflow:visible;';
 var defs=el('defs',{}),f=el('filter',{id:'doodle-tex',x:'-5%',y:'-5%',width:'110%',height:'110%','color-interpolation-filters':'sRGB'});
 f.appendChild(el('feTurbulence',{type:'fractalNoise',baseFrequency:'0.045',numOctaves:'2',seed:'4',result:'wob'}));
 f.appendChild(el('feDisplacementMap',{'in':'SourceGraphic',in2:'wob',scale:'3.2',xChannelSelector:'R',yChannelSelector:'G',result:'rough'}));
 f.appendChild(el('feTurbulence',{type:'fractalNoise',baseFrequency:'0.9',numOctaves:'1',seed:'9',result:'n1'}));
 f.appendChild(el('feColorMatrix',{'in':'n1',type:'matrix',values:'0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.2 0 0 0 -1.05',result:'grain'}));
 f.appendChild(el('feTurbulence',{type:'fractalNoise',baseFrequency:'0.012',numOctaves:'1',seed:'2',result:'n2'}));
 f.appendChild(el('feColorMatrix',{'in':'n2',type:'matrix',values:'0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.6 0 0 0 -0.1',result:'patch'}));
 f.appendChild(el('feComposite',{'in':'rough',in2:'grain',operator:'in',result:'g1'}));
 f.appendChild(el('feComposite',{'in':'g1',in2:'patch',operator:'in'}));
 defs.appendChild(f);
 var f2=el('filter',{id:'pencil-text',x:'-5%',y:'-10%',width:'110%',height:'120%','color-interpolation-filters':'sRGB'});
 f2.appendChild(el('feTurbulence',{type:'fractalNoise',baseFrequency:'0.045',numOctaves:'2',seed:'4',result:'wob'}));
 f2.appendChild(el('feDisplacementMap',{'in':'SourceGraphic',in2:'wob',scale:'1.6',xChannelSelector:'R',yChannelSelector:'G',result:'rough'}));
 f2.appendChild(el('feTurbulence',{type:'fractalNoise',baseFrequency:'0.9',numOctaves:'1',seed:'9',result:'n1'}));
 f2.appendChild(el('feColorMatrix',{'in':'n1',type:'matrix',values:'0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.6 0 0 0 -0.5',result:'grain'}));
 f2.appendChild(el('feTurbulence',{type:'fractalNoise',baseFrequency:'0.02',numOctaves:'1',seed:'2',result:'n2'}));
 f2.appendChild(el('feColorMatrix',{'in':'n2',type:'matrix',values:'0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0.4',result:'patch'}));
 f2.appendChild(el('feComposite',{'in':'rough',in2:'grain',operator:'in',result:'g1'}));
 f2.appendChild(el('feComposite',{'in':'g1',in2:'patch',operator:'in'}));
 defs.appendChild(f2);svg.appendChild(defs);document.body.appendChild(svg);}
 svg.style.height=document.documentElement.scrollHeight+'px';}
function showClear(){if(!clearBtn){clearBtn=document.createElement('button');clearBtn.type='button';clearBtn.textContent='erase doodles ×';clearBtn.className='doodle-clear';clearBtn.addEventListener('click',function(){svg.querySelectorAll('g').forEach(function(x){x.remove();});clearBtn.style.display='none';});document.body.appendChild(clearBtn);}clearBtn.style.display='block';}
function dstr(p,ox,oy){var d='M'+(p[0][0]+ox)+' '+(p[0][1]+oy);if(p.length<3){d+=' L'+(p[p.length-1][0]+ox+.5)+' '+(p[p.length-1][1]+oy+.5);return d;}
 for(var i=1;i<p.length-1;i++){d+=' Q'+(p[i][0]+ox)+' '+(p[i][1]+oy)+' '+((p[i][0]+p[i+1][0])/2+ox).toFixed(1)+' '+((p[i][1]+p[i+1][1])/2+oy).toFixed(1);}
 return d+' L'+(p[p.length-1][0]+ox)+' '+(p[p.length-1][1]+oy);}
function render(){p1.setAttribute('d',dstr(pts,0,0));p2.setAttribute('d',dstr(pts,1.3,-1));
 pad.setAttribute('x',bb[0]-24);pad.setAttribute('y',bb[1]-24);pad.setAttribute('width',bb[2]-bb[0]+48);pad.setAttribute('height',bb[3]-bb[1]+48);}
function add(x,y){pts.push([x,y]);bb[0]=Math.min(bb[0],x);bb[1]=Math.min(bb[1],y);bb[2]=Math.max(bb[2],x);bb[3]=Math.max(bb[3],y);}
function fade(gr){var o=1,t0=performance.now()+1000,dur=4000;(function step(t){if(!gr.parentNode)return;var k=(t-t0)/dur;if(k>0)gr.setAttribute('opacity',(o*(1-Math.min(1,k))).toFixed(3));if(k>=1){gr.remove();if(svg&&!svg.querySelector('g')&&clearBtn)clearBtn.style.display='none';return;}requestAnimationFrame(step);})(performance.now());}
document.addEventListener('pointerdown',function(e){
 var w=e.target.closest('[data-win]');if(w)front(w);
 var bar=e.target.closest('[data-win-bar]');
 if(bar&&!e.target.closest('[data-close]')){var r=w.getBoundingClientRect();wdrag={w:w,dx:e.clientX-r.left,dy:e.clientY-r.top};w.style.transform='none';if(bar.setPointerCapture)bar.setPointerCapture(e.pointerId);e.preventDefault();return;}
 var f=e.target.closest('[data-folder]');
 if(f){var zr=f.offsetParent.getBoundingClientRect(),fr=f.getBoundingClientRect();drag={f:f,r:zr,dx:e.clientX-fr.left,dy:e.clientY-fr.top,sx:e.clientX,sy:e.clientY,moved:false};if(f.setPointerCapture)f.setPointerCapture(e.pointerId);e.preventDefault();return;}
 if(e.button!==0||e.pointerType==='touch'||!document.querySelector('[data-doodle]'))return;
 if(e.target.closest('a,button,input,label,textarea,select,[data-win],header,nav,.doodle-clear'))return;
 ensure();g=el('g',{filter:'url(#doodle-tex)'});pad=el('rect',{fill:'none'});
 p1=el('path',{fill:'none',stroke:'#34507a','stroke-width':'5','stroke-linecap':'round','stroke-linejoin':'round',opacity:'.9'});
 p2=el('path',{fill:'none',stroke:'#3f5f8a','stroke-width':'2.6','stroke-linecap':'round','stroke-linejoin':'round',opacity:'.55'});
 g.appendChild(pad);g.appendChild(p1);g.appendChild(p2);svg.appendChild(g);
 pts=[];bb=[e.pageX,e.pageY,e.pageX,e.pageY];add(e.pageX,e.pageY);render();document.documentElement.classList.add('is-drawing');e.preventDefault();});
document.addEventListener('pointermove',function(e){
 if(wdrag){var w=wdrag.w;w.style.left=Math.max(-w.offsetWidth+80,Math.min(innerWidth-80,e.clientX-wdrag.dx))+'px';w.style.top=Math.max(64,Math.min(innerHeight-40,e.clientY-wdrag.dy))+'px';return;}
 if(drag){if(!drag.moved&&Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)>5){drag.moved=true;drag.f.style.zIndex=++z;drag.f.classList.add('is-dragging');}if(!drag.moved)return;var f=drag.f,r=drag.r;var x=Math.max(0,Math.min(r.width-f.offsetWidth,e.clientX-r.left-drag.dx)),y=Math.max(0,Math.min(r.height-f.offsetHeight,e.clientY-r.top-drag.dy));f.style.setProperty('left',x/r.width*100+'%','important');f.style.setProperty('top',y/r.height*100+'%','important');return;}
 if(!pts)return;var evs=e.getCoalescedEvents?e.getCoalescedEvents():[e];if(!evs.length)evs=[e];
 evs.forEach(function(ev){var l=pts[pts.length-1];if(Math.hypot(ev.pageX-l[0],ev.pageY-l[1])>=1.5)add(ev.pageX,ev.pageY);});render();});
function end(){wdrag=null;if(drag){var d=drag;drag=null;d.f.classList.remove('is-dragging');if(!d.moved)open(d.f);}if(pts){fade(g);pts=null;g=p1=p2=pad=null;document.documentElement.classList.remove('is-drawing');showClear();}}
document.addEventListener('pointerup',end);document.addEventListener('pointercancel',end);
document.addEventListener('click',function(e){var c=e.target.closest('[data-close]');if(c){close(c.closest('[data-win]'));return;}var f=e.target.closest('[data-folder]');if(f&&e.detail===0)open(f);});
document.addEventListener('keydown',function(e){if(e.key==='Escape')document.querySelectorAll('[data-win]').forEach(function(w){if(w.style.display==='flex')close(w);});});

function writeOn(){var s=document.querySelector('[data-write]');if(!s){if(tries<300)return requestAnimationFrame(writeOn);return;}
 if(reduce||!s.animate)return;var u=s.querySelector('path'),L=u?u.getTotalLength():0;
 s.style.clipPath='inset(-20% 100% -40% -4%)';if(u){u.style.strokeDasharray=L;u.style.strokeDashoffset=L;}
 function run(){var a=s.animate([{clipPath:'inset(-20% 100% -40% -4%)'},{clipPath:'inset(-20% -4% -40% -4%)'}],{duration:1700,easing:'cubic-bezier(.45,.05,.4,1)',fill:'forwards'});
  a.onfinish=function(){s.style.clipPath='none';a.cancel();if(u)u.animate([{strokeDashoffset:L},{strokeDashoffset:0}],{duration:600,easing:'ease-out',fill:'forwards'});};}
 setTimeout(run,500);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',writeOn);else writeOn();

function dockSpy(){var links=document.querySelectorAll('[data-dock]');if(!links.length){if(tries<300)return requestAnimationFrame(dockSpy);return;}
 function upd(){var cur='top',y=innerHeight*.4;['top','projects','contact'].forEach(function(id){var el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=y)cur=id;});
  if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)cur='contact';
  links.forEach(function(a){a.classList.toggle('is-on',a.getAttribute('data-dock')===cur);});}
 var tk=false;addEventListener('scroll',function(){if(tk)return;tk=true;requestAnimationFrame(function(){tk=false;upd();});},{passive:true});upd();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',dockSpy);else dockSpy();
})();