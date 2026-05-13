script.js



/* ========================================
   GTcode — Guia Básico de Programação
   JavaScript
   ======================================== */
 
document.addEventListener('DOMContentLoaded', () => {
 
  // === PRELOADER ===
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 800);
  });
 
  // === PARTICLES BACKGROUND ===
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
 
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
 
  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
 
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.x -= dx * 0.01;
          this.y -= dy * 0.01;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
      ctx.fill();
    }
  }
 
  function initParticles() {
    particles = [];
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();
 
  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108, 99, 255, ${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
 
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
 
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
 
  // === NAVBAR ===
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navLinks');
 
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
 
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
 
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
 
  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  function updateActiveLink() {
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollPos >= top && scrollPos < top + height);
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink);
 
  // === HERO TYPING EFFECT ===
  const codeLines = [
    { text: '<span class="code-comment"># Bem-vindo ao GTcode!</span>', delay: 40 },
    { text: '<span class="code-keyword">class</span> <span class="code-function">Programador</span>:', delay: 50 },
    { text: '    <span class="code-keyword">def</span> <span class="code-function">__init__</span>(<span class="code-variable">self</span>):', delay: 50 },
    { text: '        <span class="code-variable">self</span>.nome <span class="code-operator">=</span> <span class="code-string">"Você"</span>', delay: 40 },
    { text: '        <span class="code-variable">self</span>.stack <span class="code-operator">=</span> []', delay: 40 },
    { text: '        <span class="code-variable">self</span>.motivacao <span class="code-operator">=</span> <span class="code-number">100</span>', delay: 40 },
    { text: '', delay: 20 },
    { text: '    <span class="code-keyword">def</span> <span class="code-function">aprender</span>(<span class="code-variable">self</span>, lang):', delay: 50 },
    { text: '        <span class="code-variable">self</span>.stack.append(lang)', delay: 40 },
    { text: '        <span class="code-keyword">print</span>(<span class="code-string">f"Aprendendo {lang}!"</span>)', delay: 40 },
    { text: '', delay: 20 },
    { text: '<span class="code-variable">dev</span> <span class="code-operator">=</span> <span class="code-function">Programador</span>()', delay: 50 },
    { text: '<span class="code-variable">dev</span>.<span class="code-function">aprender</span>(<span class="code-string">"Python"</span>)  <span class="code-comment"># 🚀</span>', delay: 50 },
  ];
 
  const typingCodeEl = document.getElementById('typingCode');
  let lineIndex = 0;
  let charIndex = 0;
  let currentDisplayLines = [];
 
  function getPlainText(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }
 
  function typeCode() {
    if (lineIndex >= codeLines.length) {
      setTimeout(() => {
        lineIndex = 0;
        charIndex = 0;
        currentDisplayLines = [];
        typingCodeEl.innerHTML = '';
        typeCode();
      }, 3000);
      return;
    }
 
    const line = codeLines[lineIndex];
    const plainText = getPlainText(line.text);
 
    if (charIndex <= plainText.length) {
      const partialText = plainText.substring(0, charIndex);
      const displayLines = [...currentDisplayLines, partialText + '<span class="code-operator">|</span>'];
      typingCodeEl.innerHTML = displayLines.join('\n');
      charIndex++;
      setTimeout(typeCode, line.delay);
    } else {
      currentDisplayLines.push(line.text);
      typingCodeEl.innerHTML = currentDisplayLines.join('\n');
      lineIndex++;
      charIndex = 0;
      setTimeout(typeCode, 100);
    }
  }
  typeCode();
 
  // === COUNTER ANIMATION ===
  const statNumbers = document.querySelectorAll('.stat-number');
  let counterAnimated = false;
 
  function animateCounters() {
    if (counterAnimated) return;
    counterAnimated = true;
 
    statNumbers.forEach(num => {
      const target = parseInt(num.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
 
      function updateCounter() {
        current += increment;
        if (current >= target) {
          num.textContent = target;
        } else {
          num.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        }
      }
      updateCounter();
    });
  }
 
  // === INTERSECTION OBSERVER ===
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
 
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
 
        if (entry.target.closest('#hero')) {
          animateCounters();
        }
      }
    });
  }, observerOptions);
 
  // Observe career cards
  document.querySelectorAll('.career-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
    fadeObserver.observe(card);
  });
 
  // Observe timeline items
  document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.15}s`;
    fadeObserver.observe(item);
  });
 
  // Observe section headers
  document.querySelectorAll('.section-header').forEach(header => {
    header.classList.add('fade-in');
    fadeObserver.observe(header);
  });
 
  // Observe tip cards, course cards, creator cards, process steps
  const animateElements = document.querySelectorAll('.tip-card, .course-card, .creator-card, .process-step');
  animateElements.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
    fadeObserver.observe(el);
  });
 
  // Counter observer
  const heroSection = document.getElementById('hero');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateCounters();
    });
  }, { threshold: 0.5 });
  counterObserver.observe(heroSection);
 
  // === LANGUAGE FILTER ===
  const filterBtns = document.querySelectorAll('.filter-btn');
  const langCards = document.querySelectorAll('.lang-card');
 
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
 
      langCards.forEach((card, i) => {
        const categories = card.getAttribute('data-category');
        const show = filter === 'all' || categories.includes(filter);
 
        card.style.transition = `opacity 0.3s ease ${i * 0.03}s, transform 0.3s ease ${i * 0.03}s`;
 
        if (show) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => card.classList.add('hidden'), 300);
        }
      });
    });
  });
 
  // === QUIZ ===
  const quizData = [
    {
      question: 'Qual linguagem foi criada em apenas 10 dias?',
      options: ['Python', 'JavaScript', 'Java', 'C++'],
      correct: 1
    },
    {
      question: 'Quem criou a linguagem Python?',
      options: ['Dennis Ritchie', 'James Gosling', 'Guido van Rossum', 'Bjarne Stroustrup'],
      correct: 2
    },
    {
      question: 'Qual linguagem é usada oficialmente para desenvolver apps Android?',
      options: ['Swift', 'Kotlin', 'C#', 'Ruby'],
      correct: 1
    },
    {
      question: 'O que faz um compilador?',
      options: [
        'Executa código linha por linha',
        'Traduz todo o código para linguagem de máquina antes de executar',
        'Cria interfaces gráficas',
        'Conecta ao banco de dados'
      ],
      correct: 1
    },
    {
      question: 'Qual dessas é uma linguagem compilada?',
      options: ['Python', 'JavaScript', 'Ruby', 'Go'],
      correct: 3
    }
  ];
 
  let currentQuestion = 0;
  let score = 0;
  let quizAnswered = false;
 
  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const quizProgress = document.getElementById('quizProgress');
  const quizResult = document.getElementById('quizResult');
  const quizScore = document.getElementById('quizScore');
  const quizRestart = document.getElementById('quizRestart');
 
  function loadQuestion() {
    quizAnswered = false;
    const q = quizData[currentQuestion];
    quizProgress.style.width = `${((currentQuestion) / quizData.length) * 100}%`;
    quizQuestion.textContent = `${currentQuestion + 1}. ${q.question}`;
    quizOptions.innerHTML = '';
 
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectAnswer(i, btn));
      quizOptions.appendChild(btn);
    });
  }
 
  function selectAnswer(index, btn) {
    if (quizAnswered) return;
    quizAnswered = true;
 
    const q = quizData[currentQuestion];
    const allBtns = quizOptions.querySelectorAll('.quiz-option');
 
    if (index === q.correct) {
      btn.classList.add('correct');
      score++;
    } else {
      btn.classList.add('wrong');
      allBtns[q.correct].classList.add('correct');
    }
 
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }, 1200);
  }
 
  function showResult() {
    quizProgress.style.width = '100%';
    quizQuestion.style.display = 'none';
    quizOptions.style.display = 'none';
    quizResult.style.display = 'block';
 
    const percent = Math.round((score / quizData.length) * 100);
    let emoji = '🎉';
    let msg = 'Excelente!';
    if (percent < 40) { emoji = '📚'; msg = 'Continue estudando!'; }
    else if (percent < 80) { emoji = '👍'; msg = 'Bom trabalho!'; }
 
    quizScore.innerHTML = `${emoji} Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> (${percent}%)<br><span style="font-size:1rem;color:var(--text-secondary)">${msg}</span>`;
  }
 
  quizRestart.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizQuestion.style.display = 'block';
    quizOptions.style.display = 'flex';
    quizResult.style.display = 'none';
    loadQuestion();
  });
 
  loadQuestion();
 
  // === BACK TO TOP ===
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
 
  // === SMOOTH SCROLL OFFSET ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });
 
  // === TILT EFFECT ON CARDS ===
  const tiltCards = document.querySelectorAll('.career-card, .tip-card, .creator-card, .course-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
 
  // === PARALLAX ON HERO ===
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
      heroVisual.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
  });
 
});
