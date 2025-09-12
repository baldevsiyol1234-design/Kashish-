// Chapter navigation and animations
const chapters = Array.from(document.querySelectorAll('.chapter'));
const total = chapters.length;
const curEl = document.getElementById('cur');
const totalEl = document.getElementById('total');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const bg = document.getElementById('bg');
const floating = document.getElementById('floatingHearts');
const confettiArea = document.getElementById('confetti');
const confettiBtn = document.getElementById('confettiBtn');

let idx = 0;
totalEl.textContent = total;
curEl.textContent = idx+1;

// Keep audio playing continuously; start only on user gesture
function tryPlayAudio(){
  bg.play().catch(()=>{/* needs user gesture */});
}

// Show initial chapter
function showChapter(i){
  chapters.forEach((c,ci)=> {
    c.classList.toggle('active', ci===i);
  });
  idx = i;
  curEl.textContent = idx+1;
  // small flourish: spawn hearts when moving to a chapter
  spawnHearts(6);
}

// Next / Prev handlers
nextBtn.addEventListener('click', ()=> {
  if(idx < total-1) showChapter(idx+1);
});
prevBtn.addEventListener('click', ()=> {
  if(idx > 0) showChapter(idx-1);
});

// Start audio on first interaction
document.addEventListener('click', function once(){
  tryPlayAudio();
  document.removeEventListener('click', once);
});

// heart spawning
function spawnHearts(n=4){
  for(let i=0;i<n;i++){
    setTimeout(()=> {
      const h = document.createElement('div');
      h.className = 'heart';
      const size = 18 + Math.random()*36;
      h.style.width = size + 'px';
      h.style.height = size + 'px';
      h.style.left = (10 + Math.random()*80) + '%';
      h.style.top = (60 + Math.random()*20) + 'vh';
      h.style.opacity = 1;
      h.style.transform = 'translateY(0) scale(0.95)';
      floating.appendChild(h);
      // animate
      const dur = 4000 + Math.random()*3000;
      h.animate([
        { transform: 'translateY(0) scale(0.95)', opacity: 1 },
        { transform: 'translateY(-140vh) rotate(45deg) scale(1.2)', opacity: 0 }
      ], {duration: dur, easing:'ease-out'});
      setTimeout(()=> h.remove(), dur+50);
    }, i*160);
  }
}

// Confetti
function spawnConfettiPiece(){
  const c = document.createElement('div');
  c.className = 'confetti-piece';
  c.style.left = Math.random()*100 + '%';
  c.style.background = ['#ff6f91','#ffd1dc','#ff9aa2','#fff7f9'][Math.floor(Math.random()*4)];
  c.style.transform = 'rotate(' + Math.random()*360 + 'deg)';
  confettiArea.appendChild(c);
  const dur = 2500 + Math.random()*2000;
  c.animate([
    { transform: 'translateY(-20vh) rotate(0deg)', opacity: 1 },
    { transform: 'translateY(110vh) rotate(360deg)', opacity: 0.8 }
  ], {duration: dur, easing:'linear'});
  setTimeout(()=> c.remove(), dur+50);
}

function spawnConfettiBurst(n=18){
  for(let i=0;i<n;i++) setTimeout(spawnConfettiPiece, i*60);
}

if(confettiBtn) confettiBtn.addEventListener('click', ()=> {
  spawnConfettiBurst(36);
  spawnHearts(16);
});

// initialize
showChapter(0);
