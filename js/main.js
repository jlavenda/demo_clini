/* ═══════════════════════════════════════════
   Edént Soacha — Scripts principales
   Desarrollado por Libeldata
═══════════════════════════════════════════ */


  // Navbar transparente → blanco al scroll
  const nav = document.querySelector('.nav');
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    // Mostrar botón scroll-top después de mitad de página
    const halfway = document.body.scrollHeight / 2;
    if(window.scrollY > halfway){
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.pointerEvents = 'auto';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.pointerEvents = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
  });
  scrollTopBtn.addEventListener('mouseover', ()=>{ scrollTopBtn.style.background='#1F2D3D'; });
  scrollTopBtn.addEventListener('mouseout',  ()=>{ scrollTopBtn.style.background='rgba(31,45,61,.75)'; });

  // Testimonials carousel
  const testimonials = [
    {
      quote: "La mejor clínica odontológica en Soacha. Me hicieron ortodoncia y el resultado superó mis expectativas. El ambiente es tan tranquilo con la música cristiana, me sentí muy cómoda.",
      name: "María Elena García", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"M",
      color: "linear-gradient(135deg,#FED7C4,#E8A48E)"
    },
    {
      quote: "Servicio impecable. El equipo es muy profesional y te explican cada paso del tratamiento. Mi blanqueamiento quedó perfecto y a un precio justo.",
      name: "Carlos Andrés Rojas", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"C",
      color: "linear-gradient(135deg,#C7E8D5,#7FBE9C)"
    },
    {
      quote: "Llevé a mi hijo de 7 años con miedo al dentista y salieron riéndose juntos. La paciencia y el cariño con los niños es algo que valoro muchísimo.",
      name: "Andrea Sánchez", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"A",
      color: "linear-gradient(135deg,#D9D2F0,#9F92D6)"
    },
    {
      quote: "Mejor relación calidad-precio en toda la zona. Las instalaciones son modernas y la atención al cliente desde la llamada hasta la salida es excelente.",
      name: "Jorge Mendoza", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"J",
      color: "linear-gradient(135deg,#C9E0F2,#7DA9CC)"
    },
    {
      quote: "Súper recomendados. Me hicieron una endodoncia que pensé que iba a doler horrible y no sentí absolutamente nada. ¡Gracias EDÉNT!",
      name: "Laura Pinzón", loc:"Soacha, Cundinamarca", rating:"5.0", initial:"L",
      color: "linear-gradient(135deg,#F5D5DD,#D695A4)"
    }
  ];

  const dotsEl = document.getElementById('testDots');
  let current = 0;
  testimonials.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'dot' + (i===0?' active':'');
    d.addEventListener('click', () => render(i));
    dotsEl.appendChild(d);
  });

  function render(i){
    current = (i + testimonials.length) % testimonials.length;
    const t = testimonials[current];
    const card = document.getElementById('testCard');
    card.style.opacity = 0;
    setTimeout(()=>{
      document.getElementById('testQuote').textContent = t.quote;
      document.getElementById('testName').textContent = t.name;
      document.getElementById('testLoc').textContent = t.loc;
      document.getElementById('ratingNum').textContent = t.rating;
      const av = document.getElementById('testAvatar');
      av.textContent = t.initial;
      av.style.background = t.color;
      [...dotsEl.children].forEach((d,idx)=>d.classList.toggle('active', idx===current));
      card.style.opacity = 1;
    }, 150);
  }
  // Reveal del test-card — manual para evitar conflicto con carrusel
  const testCardEl = document.getElementById('testCard');
  testCardEl.style.opacity = '0';
  testCardEl.style.transform = 'translateY(22px)';
  // Doble requestAnimationFrame garantiza que el browser pinte opacity:0 antes de observar
  requestAnimationFrame(() => requestAnimationFrame(() => {
    testCardEl.style.transition = 'opacity .65s ease, transform .65s ease';
    new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting){
        testCardEl.style.opacity = '1';
        testCardEl.style.transform = 'translateY(0)';
        setTimeout(()=>{ testCardEl.style.transition = 'opacity .25s'; }, 700);
      }
    }, {threshold: 0.15}).observe(testCardEl);
  }));
  document.getElementById('prevBtn').addEventListener('click', ()=>{
    document.getElementById('prevBtn').classList.add('active');
    document.getElementById('nextBtn').classList.remove('active');
    render(current-1);
  });
  document.getElementById('nextBtn').addEventListener('click', ()=>{
    document.getElementById('nextBtn').classList.add('active');
    document.getElementById('prevBtn').classList.remove('active');
    render(current+1);
  });
  // auto rotate every 7s
  setInterval(()=>render(current+1), 7000);

  function handleSubmit(e){
    e.preventDefault();
    const btn = e.target.querySelector('.send-btn');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Mensaje enviado!';
    btn.style.background = '#1FAE97';
    setTimeout(()=>{
      btn.innerHTML = original; btn.style.background='';
      e.target.reset();
    }, 2400);
    return false;
  }

  // ── Hamburguesa mobile ──
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Cerrar al hacer clic en un link
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── Scroll reveal animations ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // solo una vez
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const id = this.getAttribute('href');
      if(id.length>1){
        const el = document.querySelector(id);
        if(el){ e.preventDefault(); window.scrollTo({top: el.offsetTop - 70, behavior:'smooth'}); }
      }
    });
  });
