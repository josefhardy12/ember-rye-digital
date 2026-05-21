// Ember & Rye — shared scripts
(function(){
  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click',()=>{
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      toggle.classList.remove('open');links.classList.remove('open');
    }));
  }

  // Header scroll shadow
  const header = document.querySelector('.site-header');
  if(header){
    const onScroll=()=>header.classList.toggle('scrolled',window.scrollY>10);
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  }

  // Fade-up on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12});
  document.querySelectorAll('.fade-up').forEach(el=>io.observe(el));

  // Reservation form
  const form = document.querySelector('#reservation-form');
  if(form){
    // Set min date today
    const dateEl = form.querySelector('input[type="date"]');
    if(dateEl){ dateEl.min = new Date().toISOString().split('T')[0]; }
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const status = form.querySelector('.form-status');
      status.textContent = `Thanks ${data.name.split(' ')[0]}! We've received your request for ${data.guests} on ${data.date} at ${data.time}. We'll confirm by email shortly.`;
      status.style.display='block';
      form.reset();
      if(dateEl) dateEl.min = new Date().toISOString().split('T')[0];
      window.scrollTo({top:status.getBoundingClientRect().top+window.scrollY-120,behavior:'smooth'});
    });
  }
})();
