/* USH24B 探索南極三島 行程特色 — 載入器 */
(function(){
var s=document.currentScript,b=s.src.replace(/[^\/]*$/,''),m=document.getElementById('ush-mount');
if(!m){m=document.createElement('div');m.id='ush-mount';s.parentNode.insertBefore(m,s)}
var l=document.createElement('link');l.rel='stylesheet';l.href=b+'ush24b.css';document.head.appendChild(l);
fetch(b+'ush24b.html').then(function(r){return r.text()}).then(function(h){m.removeAttribute('style');m.innerHTML=h;init()}).catch(function(){});
function init(){
!function(){var e=document.getElementById("ush-quick");if(!e)return;function i(){var t=document.getElementById("index-float-btn");e.style.setProperty("--ded",(t&&"none"!==getComputedStyle(t).display?t.getBoundingClientRect().height:0)+"px")}i();addEventListener("resize",i);addEventListener("load",i);e.addEventListener("click",function(ev){var t=ev.target.closest("button");if(!t)return;if("m"==t.dataset.q){t.setAttribute("aria-expanded",e.classList.toggle("q-op"))}else if("t"==t.dataset.q){scrollTo({top:0,behavior:"smooth"})}else if(navigator.share){navigator.share({title:document.title,url:location.href}).catch(function(){})}else{prompt("複製此頁連結",location.href)}})}();

(function(){
  var root=document.querySelector('.ush');
  var rm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  // split text into characters
  function split(el){
    var n=0,txt=el.textContent.replace(/\s+/g,' ').trim();
    el.setAttribute('aria-label',txt);
    (function walk(node){
      [].slice.call(node.childNodes).forEach(function(c){
        if(c.nodeType===3){
          var f=document.createDocumentFragment();
          c.textContent.replace(/\s+/g,' ').split('').forEach(function(ch){
            if(ch===' '){f.appendChild(document.createTextNode(' '));return}
            var sp=document.createElement('span');sp.className='ch';sp.setAttribute('aria-hidden','true');sp.style.setProperty('--i',n++);sp.textContent=ch;f.appendChild(sp);
          });
          node.replaceChild(f,c);
        }else if(c.nodeType===1&&c.tagName!=='BR'){walk(c)}
      });
    })(el);
  }
  root.querySelectorAll('.sp').forEach(split);
  var els=root.querySelectorAll('.rv,.ph,.sp,.facts,.track,p:has(mark)');
  if('IntersectionObserver' in window&&!rm){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}
  // parallax
  var px=[].slice.call(root.querySelectorAll('.hero .bg,.bleed .bg,.iceband .bg,.band .bg'));
  var rp=document.getElementById('rp'),len=rp.getTotalLength();rp.style.strokeDasharray=len;rp.style.strokeDashoffset=len;
  var prog=root.querySelector('.prog i'),hxs=[].slice.call(root.querySelectorAll('[data-hx]'));
  var sps=[].slice.call(root.querySelectorAll('[data-sp]'));
  var phs=[].slice.call(root.querySelectorAll('.ph'));
  var heroIn=root.querySelector('.hero .in');
  function tick(){
    var vh=window.innerHeight,k=window.innerWidth<860?.5:1;
    px.forEach(function(b){var r=b.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;b.style.transform='translate3d(0,'+((r.top+r.height/2-vh/2)*-.14)+'px,0)'});
    // text / block parallax
    sps.forEach(function(el){
      var r=el.getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;
      var d=r.top+r.height/2-vh/2,sp=parseFloat(el.getAttribute('data-sp'))*k;
      el.style.translate='0 '+(d*-sp).toFixed(1)+'px';
    });
    // image parallax inside frames
    phs.forEach(function(f){
      var r=f.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;
      var d=r.top+r.height/2-vh/2,m=r.height*.07,y=Math.max(-m,Math.min(m,d*-.09));
      f.firstElementChild.style.setProperty('--py',y.toFixed(1)+'px');
    });
    // hero text drifts up and fades
    var sy=window.scrollY||0;
    if(heroIn&&sy<vh*1.2){heroIn.style.translate='0 '+(-sy*.28)+'px';heroIn.style.opacity=Math.max(0,1-sy/(vh*.75))}
    var dh=document.documentElement.scrollHeight-vh;prog.style.transform='scaleX('+(dh>0?Math.min(1,(window.scrollY||0)/dh):0)+')';
    hxs.forEach(function(h){var r=h.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;h.style.translate=(-(vh-r.top)*.35).toFixed(1)+'px 0'});
    var rr=document.getElementById('route').getBoundingClientRect();
    var p=Math.min(1,Math.max(0,(vh*.9-rr.top)/(vh*.6)));rp.style.strokeDashoffset=len*(1-p);
  }
  if(!rm){window.addEventListener('scroll',function(){requestAnimationFrame(tick)},{passive:true});tick()}else{rp.style.strokeDashoffset=0}
  // video
  var vv=document.getElementById('vv'),vp=document.getElementById('vp'),vs=vv.parentNode;
  vp.addEventListener('click',function(){vs.classList.add('on');vv.classList.add('ct');vmFill(vv,{ctrl:1})});
  // Vimeo 背景影片:進入畫面才載入,離開畫面卸載
  var vmReady=function(){};
  function vmFit(w){var f=w.querySelector('iframe');if(!f)return;var W=w.clientWidth,H=w.clientHeight,r=parseFloat(w.getAttribute('data-ar'))||1.7778;var fw=Math.max(W,H*r),fh=Math.max(H,W/r);f.style.width=fw+'px';f.style.height=fh+'px'}
  function vmFill(w,o){o=o||{};var id=w.getAttribute('data-vm');if(o.m&&w.getAttribute('data-vm-m')&&window.innerWidth<=700){id=w.getAttribute('data-vm-m')}var f=document.createElement('iframe');f.src='https://player.vimeo.com/video/'+id+'?dnt=1'+(o.ctrl?'&autoplay=1&title=0&byline=0&portrait=0':'&background=1');f.setAttribute('allow','autoplay; fullscreen; picture-in-picture');f.setAttribute('title',w.getAttribute('aria-label')||'影片');if(o.ctrl){f.style.pointerEvents='auto';f.style.width='100%';f.style.height='100%'}f.addEventListener('load',function(){w.classList.add('ld');vmReady(w)});w.appendChild(f);if(!o.ctrl){vmFit(w)}}
  function vmDrop(w){var f=w.querySelector('iframe');if(f){w.removeChild(f)}w.classList.remove('ld')}
  var vms=root.querySelectorAll('.vm[data-vm]');
  if(!rm&&'IntersectionObserver' in window){var vio=new IntersectionObserver(function(es){es.forEach(function(e){var w=e.target;if(w.id==='vv')return;if(e.isIntersecting){if(!w.querySelector('iframe')){vmFill(w,{m:1})}}else{vmDrop(w)}})},{rootMargin:'200px 0px',threshold:.01});vms.forEach(function(w){vio.observe(w)})}
  window.addEventListener('resize',function(){vms.forEach(vmFit)});
  var hs=null;

  // hero slideshow
  var slides=root.querySelectorAll('.hero .bg img.s'),si=0;
  var hv=root.querySelector('.hero .hv');
  if(slides.length>1&&!rm){hs=setInterval(function(){slides[si].classList.remove('on');si=(si+1)%slides.length;slides[si].classList.add('on')},6500)}
  vmReady=function(el){if(el===hv){hv.classList.add('on');if(hs){clearInterval(hs)}}};
  // counters
  root.querySelectorAll('[data-count]').forEach(function(b){
    var to=parseInt(b.getAttribute('data-count'),10);if(rm){return}b.textContent='0';
    new IntersectionObserver(function(es,o){es.forEach(function(e){if(e.isIntersecting){o.disconnect();var t0=performance.now();(function f(t){var p=Math.min(1,(t-t0)/1600);b.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}})},{threshold:.6}).observe(b);
  });
  // tabs
  var tabs=root.querySelectorAll('.tabs button'),panes=root.querySelectorAll('.pane');
  tabs.forEach(function(b,i){b.addEventListener('click',function(){tabs.forEach(function(x){x.classList.remove('on')});panes.forEach(function(x){x.classList.remove('on')});b.classList.add('on');panes[i].classList.add('on')})});
  // tilt
  if(!rm&&window.matchMedia('(hover:hover)').matches){
    root.querySelectorAll('.dn .ph').forEach(function(t){
      t.addEventListener('mousemove',function(e){var r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform='perspective(900px) rotateY('+(x*10)+'deg) rotateX('+(-y*10)+'deg)'});
      t.addEventListener('mouseleave',function(){t.style.transform=''});
    });
    root.querySelectorAll('.card .t').forEach(function(t){
      t.addEventListener('mousemove',function(e){var r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform='rotateY('+(x*10)+'deg) rotateX('+(-y*10)+'deg)'});
      t.addEventListener('mouseleave',function(){t.style.transform=''});
    });
  }
})();

(function(){
  var r=document.querySelector('.ush');if(!r)return;
  function prep(){
    [].forEach.call(r.querySelectorAll('.rv,.ph,.sp,.chap'),function(e){e.classList.add('in')});
    [].forEach.call(r.querySelectorAll('[data-count]'),function(b){b.textContent=b.getAttribute('data-count')});
    [].forEach.call(r.querySelectorAll('details'),function(d){d.open=true});
    [].forEach.call(r.querySelectorAll('img[loading]'),function(i){i.loading='eager'});
    [].forEach.call(r.querySelectorAll('.vm[data-poster]'),function(v){if(v.closest('.hero,.vid,.iceband'))return;var n=v.nextElementSibling;if(n&&n.classList&&n.classList.contains('pv'))return;var i=document.createElement('img');i.className='pv';i.src=v.getAttribute('data-poster');i.alt=v.getAttribute('aria-label')||'';i.style.objectPosition=v.style.backgroundPosition||'50% 50%';v.parentNode.insertBefore(i,v.nextSibling)});
  }
  addEventListener('beforeprint',prep);
  var op=window.print;
  window.print=function(){prep();var im=[].filter.call(r.querySelectorAll('img'),function(i){return !i.complete});
    Promise.race([Promise.all(im.map(function(i){return new Promise(function(t){i.addEventListener('load',t);i.addEventListener('error',t)})})),new Promise(function(t){setTimeout(t,8000)})]).then(function(){op.call(window)})};
})();

}
})();
