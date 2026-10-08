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
  var eb=document.querySelector('[data-email-user]');
  if(eb)eb.addEventListener('click',function(){
    var addr=eb.getAttribute('data-email-user')+'@'+eb.getAttribute('data-email-domain'),out=eb.parentNode.querySelector('.mail-out');
    var a=document.createElement('a');a.href='mailto:'+addr;a.textContent=addr;out.textContent='';out.appendChild(a);eb.hidden=true;
  });
  var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
})();
