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

