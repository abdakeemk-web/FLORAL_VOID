(function(){
  var b=document.querySelector('.burger'),m=document.getElementById('mobile-menu');
  function setMenu(open){if(!b||!m)return;b.setAttribute('aria-expanded',open);b.setAttribute('aria-label',open?'Close menu':'Open menu');m.hidden=!open;if(open){var a=m.querySelector('a');if(a)a.focus()}}
  if(b&&m){
    b.addEventListener('click',function(){setMenu(b.getAttribute('aria-expanded')!=='true')});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&b.getAttribute('aria-expanded')==='true'){setMenu(false);b.focus()}});
    window.matchMedia('(min-width:900px)').addEventListener('change',function(e){if(e.matches)setMenu(false)});
  }
  document.querySelectorAll('[data-copy]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var text=btn.getAttribute('data-copy'),toast=btn.closest('.handle').querySelector('.toast');
      function done(ok){toast.textContent=ok?'Copied: '+text:'Copy failed. Please select and copy the name manually.';setTimeout(function(){toast.textContent=''},2500)}
      if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(function(){done(true)},function(){done(false)})}
      else{var t=document.createElement('textarea');t.value=text;t.setAttribute('readonly','');t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();var ok=false;try{ok=document.execCommand('copy')}catch(e){}document.body.removeChild(t);done(ok)}
    });
  });
  document.querySelectorAll('[data-email-user]').forEach(function(eb){
    eb.addEventListener('click',function(){
      var addr=eb.getAttribute('data-email-user')+'@'+eb.getAttribute('data-email-domain'),out=eb.parentNode.querySelector('.mail-out');
      if(!out||out.querySelector('a'))return;
      var a=document.createElement('a');a.href='mailto:'+addr;a.textContent=addr;out.textContent='';out.appendChild(a);eb.hidden=true;
    });
  });
  var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
  var slides=document.querySelectorAll('.hero-slide'),dots=document.querySelectorAll('.hero-dot');
  if(slides.length>1){
    var current=0,timer=null;
    var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function loadSlide(s){
      if(s.getAttribute('data-src')){
        s.setAttribute('src',s.getAttribute('data-src'));
        s.setAttribute('srcset',s.getAttribute('data-srcset'));
        s.removeAttribute('data-src');s.removeAttribute('data-srcset');
      }
    }
    function show(n){
      current=(n+slides.length)%slides.length;
      slides.forEach(function(s,i){
        var on=i===current;
        if(on)loadSlide(s);
        s.classList.toggle('is-active',on);
        if(on){s.style.animation='none';void s.offsetWidth;s.style.animation=''}
      });
      dots.forEach(function(d,i){
        d.classList.toggle('is-active',i===current);
        d.setAttribute('aria-pressed',i===current?'true':'false');
      });
    }
    function start(){if(reduce||timer)return;timer=setInterval(function(){show(current+1)},6000)}
    function stop(){if(timer){clearInterval(timer);timer=null}}
    dots.forEach(function(d,i){d.addEventListener('click',function(){stop();show(i);start()})});
    var hero=document.querySelector('.hero-slideshow');
    if(hero){
      hero.addEventListener('mouseenter',stop);
      hero.addEventListener('mouseleave',start);
      hero.addEventListener('focusin',stop);
      hero.addEventListener('focusout',start);
    }
    document.addEventListener('visibilitychange',function(){if(document.hidden)stop();else start()});
    start();
    if('requestIdleCallback' in window){requestIdleCallback(function(){loadSlide(slides[1])},{timeout:3000})}
    else{setTimeout(function(){loadSlide(slides[1])},2000)}
  }
  var typed=document.querySelector('.js-typed');
  if(typed&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var full=typed.textContent;typed.textContent='';typed.classList.add('is-typing');
    var ci=0;
    var typeTimer=setInterval(function(){
      ci++;typed.textContent=full.slice(0,ci);
      if(ci>=full.length){clearInterval(typeTimer);typed.classList.remove('is-typing')}
    },55);
  }
})();
