/* ═══════════════════════════════════════════
   CODE FEUD — GAME LOGIC
   ═══════════════════════════════════════════ */

'use strict';

// ══════════════════════════════════════════
//  QUESTIONS DATABASE
// ══════════════════════════════════════════
const QUESTIONS = [
  // ── VIDEOGAMES ────────────────────────────────────────────
  {
    question: "Who's the most popular character from the Sonic the Hedgehog franchise?",
    answers: [
      { text: "Sonic",   pts: 42 },
      { text: "Shadow",  pts: 22 },
      { text: "Tails",   pts: 16 },
      { text: "Knuckles",pts: 10 },
      { text: "Amy",     pts:  6 },
      { text: "Dr. Robotnik",   pts:  4 },
    ]
  },
  {
    question: "Name a playable character from the Super Smash Bros. roster everyone knows",
    answers: [
      { text: "Mario",   pts: 35 },
      { text: "Pikachu", pts: 24 },
      { text: "Link",    pts: 18 },
      { text: "Kirby",   pts: 13 },
      { text: "Samus",   pts:  7 },
      { text: "Fox",     pts:  3 },
    ]
  },
  {
    question: "Name a weapon or item everyone picks first in The Legend of Zelda",
    answers: [
      { text: "Bow",          pts: 32 },
      { text: "Master Sword", pts: 28 },
      { text: "Boomerang",    pts: 18 },
      { text: "Bombs",        pts: 12 },
      { text: "Shield",       pts:  6 },
      { text: "Hookshot",     pts:  4 },
    ]
  },
  {
    question: "Name something players do first when they start a new Minecraft world",
    answers: [
      { text: "Punch a tree",   pts: 45 },
      { text: "Find shelter",   pts: 22 },
      { text: "Dig for stone",  pts: 15 },
      { text: "Look for food",  pts: 10 },
      { text: "Build a house",  pts:  5 },
      { text: "Find diamonds",  pts:  3 },
    ]
  },
  {
    question: "Name a popular game mode in Fortnite that everyone has played",
    answers: [
      { text: "Battle Royale", pts: 50 },
      { text: "Zero Build",    pts: 22 },
      { text: "Creative",      pts: 14 },
      { text: "LEGO Fortnite", pts:  8 },
      { text: "Save the World",pts:  4 },
      { text: "Rocket Racing", pts:  2 },
    ]
  },
  {
    question: "Name a Grand Theft Auto game that everyone has played or heard of",
    answers: [
      { text: "GTA V",          pts: 48 },
      { text: "GTA: San Andreas",pts: 28 },
      { text: "GTA IV",         pts: 12 },
      { text: "GTA: Vice City", pts:  8 },
      { text: "GTA III",        pts:  3 },
      { text: "GTA VI",         pts:  1 },
    ]
  },
  {
    question: "Name a Call of Duty game or mode that made the franchise famous",
    answers: [
      { text: "Warzone",        pts: 35 },
      { text: "Modern Warfare", pts: 28 },
      { text: "Zombies",        pts: 18 },
      { text: "Black Ops",      pts: 12 },
      { text: "Search & Destroy",pts: 5 },
      { text: "MW2 (2009)",     pts:  2 },
    ]
  },
  {
    question: "Name a popular Pokémon that almost everyone has used on their team",
    answers: [
      { text: "Charizard",  pts: 40 },
      { text: "Pikachu",    pts: 26 },
      { text: "Mewtwo",     pts: 16 },
      { text: "Gengar",     pts:  9 },
      { text: "Eevee",      pts:  6 },
      { text: "Snorlax",    pts:  3 },
    ]
  },
  {
    question: "Name something every player does when they first load into Elden Ring",
    answers: [
      { text: "Die immediately",    pts: 38 },
      { text: "Explore randomly",   pts: 24 },
      { text: "Get killed by Tree Sentinel", pts: 18 },
      { text: "Customize character",pts: 12 },
      { text: "Try to read the lore",pts: 5 },
      { text: "Quit and play again",pts: 3 },
    ]
  },
  {
    question: "Name a map from CS:GO / CS2 that every player knows by heart",
    answers: [
      { text: "Dust II",    pts: 52 },
      { text: "Mirage",     pts: 22 },
      { text: "Inferno",    pts: 14 },
      { text: "Nuke",       pts:  6 },
      { text: "Overpass",   pts:  4 },
      { text: "Vertigo",    pts:  2 },
    ]
  },
  {
    question: "Name a villain from a video game that everyone remembers",
    answers: [
      { text: "Bowser",       pts: 30 },
      { text: "Ganondorf",    pts: 24 },
      { text: "Sephiroth",    pts: 20 },
      { text: "GLaDOS",       pts: 12 },
      { text: "Nemesis",      pts:  8 },
      { text: "Dr. Robotnik", pts:  6 },
    ]
  },
  {
    question: "Name a game that has sold more than 30 million copies worldwide",
    answers: [
      { text: "Minecraft",        pts: 38 },
      { text: "GTA V",            pts: 28 },
      { text: "Tetris",           pts: 16 },
      { text: "Mario Kart 8",     pts: 10 },
      { text: "Red Dead Redemption 2", pts: 5 },
      { text: "Elden Ring",       pts:  3 },
    ]
  },
  // ── PROGRAMMING ───────────────────────────────────────────
  {
    question: "What's the most common problem when coding in HTML?",
    answers: [
      { text: "Unclosed tags",        pts: 36 },
      { text: "Wrong indentation",    pts: 24 },
      { text: "Missing quotes on attributes", pts: 18 },
      { text: "Broken image paths",   pts: 12 },
      { text: "Forgot DOCTYPE",       pts:  6 },
      { text: "div soup",             pts:  4 },
    ]
  },
  {
    question: "What's the first thing a developer Googles when they get stuck?",
    answers: [
      { text: "Stack Overflow",   pts: 48 },
      { text: "The error message",pts: 22 },
      { text: "GitHub issues",    pts: 14 },
      { text: "Reddit",           pts:  8 },
      { text: "YouTube tutorial", pts:  5 },
      { text: "ChatGPT",          pts:  3 },
    ]
  },
  {
    question: "Name a CSS property that drives developers absolutely crazy",
    answers: [
      { text: "flexbox",    pts: 30 },
      { text: "z-index",    pts: 26 },
      { text: "position: absolute", pts: 20 },
      { text: "margin: auto",pts: 12 },
      { text: "float",      pts:  8 },
      { text: "grid",       pts:  4 },
    ]
  },
  {
    question: "What do developers blame first when their code doesn't work?",
    answers: [
      { text: "The framework",    pts: 30 },
      { text: "A missing semicolon", pts: 26 },
      { text: "The browser",     pts: 18 },
      { text: "The API",         pts: 14 },
      { text: "Their coworker",  pts:  8 },
      { text: "The intern",      pts:  4 },
    ]
  },
  {
    question: "Name something every programmer forgets to do before pushing to main",
    answers: [
      { text: "Pull before push",    pts: 35 },
      { text: "Write tests",         pts: 25 },
      { text: "Check for console.logs", pts: 18 },
      { text: "Update the README",   pts: 12 },
      { text: "Review their own PR", pts:  7 },
      { text: "Remove hardcoded keys", pts: 3 },
    ]
  },
  {
    question: "Name a JavaScript error that gives every developer a headache",
    answers: [
      { text: "undefined is not a function", pts: 38 },
      { text: "Cannot read properties of null", pts: 28 },
      { text: "CORS error",          pts: 18 },
      { text: "Maximum call stack exceeded", pts: 9 },
      { text: "NaN",                 pts:  5 },
      { text: "Promise rejected",    pts:  2 },
    ]
  },
  {
    question: "Name a thing developers do instead of writing documentation",
    answers: [
      { text: "Add a TODO comment",   pts: 35 },
      { text: "Leave it for later",   pts: 28 },
      { text: "Hope others figure it out", pts: 18 },
      { text: "Write confusing variable names", pts: 10 },
      { text: "Blame the previous dev", pts: 6 },
      { text: "Delete the project",   pts:  3 },
    ]
  },
  {
    question: "What's the most used programming language in 2024 according to surveys?",
    answers: [
      { text: "JavaScript", pts: 45 },
      { text: "Python",     pts: 28 },
      { text: "TypeScript", pts: 12 },
      { text: "Java",       pts:  8 },
      { text: "C#",         pts:  5 },
      { text: "Rust",       pts:  2 },
    ]
  },
  {
    question: "Name a sign that tells you a codebase was written a long time ago",
    answers: [
      { text: "jQuery everywhere",     pts: 38 },
      { text: "var instead of let/const", pts: 26 },
      { text: "No version control",    pts: 16 },
      { text: "PHP 5",                 pts: 10 },
      { text: "Comments say 'don't touch'", pts: 6 },
      { text: "Flash animations",      pts:  4 },
    ]
  },
];
// ══════════════════════════════════════════
//  SOUND ENGINE (Web Audio)
// ══════════════════════════════════════════
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudio() {
  if (!audioCtx) audioCtx = new AudioCtx();
  return audioCtx;
}

function beep(freq, dur, type = 'square', vol = .15, delay = 0) {
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + delay + dur);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + dur + .05);
  } catch(e) {}
}

function playReveal() {
  beep(440, .08); beep(550, .08, 'square', .15, .09); beep(660, .12, 'square', .15, .18);
}
function playStrike() {
  beep(220, .06, 'sawtooth', .2); beep(180, .1, 'sawtooth', .2, .07); beep(140, .2, 'sawtooth', .15, .14);
}
function playCorrect() {
  [523, 659, 784, 1047].forEach((f, i) => beep(f, .08, 'triangle', .12, i * .07));
}
function playWin() {
  const melody = [523,659,784,1047,784,1047,1319];
  melody.forEach((f, i) => beep(f, .12, 'triangle', .15, i * .1));
}
function playClick() { beep(800, .03, 'square', .06); }
function playType()  { beep(1200, .02, 'square', .04); }

// ══════════════════════════════════════════
//  PARTICLE BACKGROUND
// ══════════════════════════════════════════
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const COLORS = ['#00ff88', '#00e5ff', '#bf5fff', '#ffe34d'];
  const CHARS = ['0','1','{','}','<','>','/','*',';','#','=','λ','Σ','∞','△','□'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function spawnParticle() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      char: CHARS[Math.random() * CHARS.length | 0],
      color: COLORS[Math.random() * COLORS.length | 0],
      speed: .3 + Math.random() * .7,
      opacity: .1 + Math.random() * .4,
      size: 10 + Math.random() * 14,
      drift: (Math.random() - .5) * .3,
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < 60; i++) {
      const p = spawnParticle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -20) particles[i] = spawnParticle();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.font = `${p.size}px 'Share Tech Mono', monospace`;
      ctx.fillText(p.char, p.x, p.y);
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  resize();
  initParticles();
  tick();
  window.addEventListener('resize', () => { resize(); });
})();

// ══════════════════════════════════════════
//  CONFETTI
// ══════════════════════════════════════════
function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const pieces = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: -20,
    r: 5 + Math.random() * 8,
    d: Math.random() * 120 + 10,
    color: ['#00ff88','#00e5ff','#bf5fff','#ffe34d','#ff3b5c'][Math.random()*5|0],
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
    tiltAngleInc: .07 + Math.random() * .05,
  }));
  let alive = true;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.tiltAngle += p.tiltAngleInc;
      p.y += (Math.cos(p.d) + 1.5);
      p.x += Math.sin(p.tiltAngle) * .7;
      p.tilt = Math.sin(p.tiltAngle - p.d / 3) * 15;
      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 3, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 5);
      ctx.stroke();
      if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width; }
    });
    if (alive) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }

  draw();
  setTimeout(() => { alive = false; }, 6000);
}

// ══════════════════════════════════════════
//  GAME STATE
// ══════════════════════════════════════════
const state = {
  team1Name: 'EQUIPO 1',
  team2Name: 'EQUIPO 2',
  score1: 0,
  score2: 0,
  strikes1: 0,
  strikes2: 0,
  currentTeam: 1,       // 1 or 2
  currentRound: 0,
  rounds: [],           // shuffled question order
  bank: 0,
  revealedAnswers: [],  // indices of revealed answers
  maxStrikes: 3,
  maxRounds: 5,
  stealMode: false,
  gameOver: false,
};

// ══════════════════════════════════════════
//  DOM REFS
// ══════════════════════════════════════════
const $ = id => document.getElementById(id);
const screens = {
  intro:  $('screen-intro'),
  game:   $('screen-game'),
  winner: $('screen-winner'),
};

// ══════════════════════════════════════════
//  SCREEN MANAGEMENT
// ══════════════════════════════════════════
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ══════════════════════════════════════════
//  UTILITIES
// ══════════════════════════════════════════
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.random() * (i + 1) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ══════════════════════════════════════════
//  HUD UPDATES
// ══════════════════════════════════════════
function updateHUD() {
  $('hud-name1').textContent = state.team1Name;
  $('hud-name2').textContent = state.team2Name;
  $('score1').textContent = state.score1;
  $('score2').textContent = state.score2;
  $('round-num').textContent = state.currentRound + 1;
  $('round-total').textContent = `/ ${state.maxRounds}`;
  $('bank-amount').textContent = state.bank;

  // Strikes display
  ['strikes1','strikes2'].forEach((id, i) => {
    const el = $(id);
    const count = i === 0 ? state.strikes1 : state.strikes2;
    el.innerHTML = '';
    for (let s = 0; s < count; s++) {
      const pip = document.createElement('div');
      pip.className = 'strike-pip';
      pip.textContent = '✕';
      el.appendChild(pip);
    }
  });

  // Turn indicator
  const turnEl = $('turn-team');
  if (state.stealMode) {
    const other = state.currentTeam === 1 ? 2 : 1;
    const name = other === 1 ? state.team1Name : state.team2Name;
    turnEl.textContent = `⚡ ${name} ROBANDO`;
    turnEl.style.color = 'var(--neon-p)';
    turnEl.style.textShadow = 'var(--glow-p)';
  } else {
    const name = state.currentTeam === 1 ? state.team1Name : state.team2Name;
    const color = state.currentTeam === 1 ? 'var(--team1)' : 'var(--team2)';
    const shadow = state.currentTeam === 1 ? 'var(--glow-g)' : 'var(--glow-c)';
    turnEl.textContent = name;
    turnEl.style.color = color;
    turnEl.style.textShadow = shadow;
  }
}

// ══════════════════════════════════════════
//  BOARD RENDERING
// ══════════════════════════════════════════
function renderBoard() {
  const q = QUESTIONS[state.rounds[state.currentRound]];
  $('question-text').textContent = q.question;

  const board = $('answer-board');
  board.innerHTML = '';

  q.answers.forEach((ans, i) => {
    const tile = document.createElement('div');
    tile.className = 'board-tile' + (state.revealedAnswers.includes(i) ? ' revealed' : ' hidden');
    tile.id = `tile-${i}`;

    const num = document.createElement('div');
    num.className = 'tile-num';
    num.textContent = `#${i + 1}`;

    const answer = document.createElement('div');
    answer.className = 'tile-answer';
    answer.textContent = state.revealedAnswers.includes(i) ? ans.text : '';

    const pts = document.createElement('div');
    pts.className = 'tile-pts';
    pts.textContent = state.revealedAnswers.includes(i) ? ans.pts : '???';

    const lock = document.createElement('div');
    lock.className = 'tile-lock';
    if (!state.revealedAnswers.includes(i)) lock.textContent = '█ █ █ █ █';

    tile.appendChild(num);
    tile.appendChild(answer);
    tile.appendChild(pts);
    if (!state.revealedAnswers.includes(i)) tile.appendChild(lock);

    board.appendChild(tile);
  });
}

// ══════════════════════════════════════════
//  REVEAL ANSWER ANIMATION
// ══════════════════════════════════════════
async function revealAnswerTile(idx) {
  const q = QUESTIONS[state.rounds[state.currentRound]];
  const ans = q.answers[idx];
  const tile = $(`tile-${idx}`);
  if (!tile) return;

  // flip animation
  tile.style.transition = 'transform .2s ease-in';
  tile.style.transformOrigin = 'center';
  tile.style.transform = 'scaleY(0)';

  await sleep(220);
  tile.className = 'board-tile revealed';
  tile.innerHTML = '';

  const num = document.createElement('div');
  num.className = 'tile-num';
  num.textContent = `#${idx + 1}`;

  const answer = document.createElement('div');
  answer.className = 'tile-answer';
  answer.textContent = ans.text;

  const pts = document.createElement('div');
  pts.className = 'tile-pts';
  pts.textContent = ans.pts;

  tile.appendChild(num);
  tile.appendChild(answer);
  tile.appendChild(pts);
  tile.style.transform = 'scaleY(1)';
  tile.style.transition = 'transform .3s cubic-bezier(.34,1.56,.64,1)';

  playReveal();
  await sleep(300);
}

// ══════════════════════════════════════════
//  STRIKE ANIMATION
// ══════════════════════════════════════════
async function showStrikeAnim() {
  const el = $('strike-overlay');
  el.classList.add('show');
  playStrike();
  await sleep(800);
  el.classList.remove('show');
}

async function showCorrectAnim(pts) {
  const el = $('correct-overlay');
  $('correct-pts').textContent = `+${pts}`;
  el.classList.add('show');
  playCorrect();
  await sleep(900);
  el.classList.remove('show');
}

// ══════════════════════════════════════════
//  ANSWER CHECKING
// ══════════════════════════════════════════
function checkAnswer(input) {
  const q = QUESTIONS[state.rounds[state.currentRound]];
  const norm = normalize(input);
  if (!norm) return null;

  for (let i = 0; i < q.answers.length; i++) {
    if (state.revealedAnswers.includes(i)) continue;
    const ansNorm = normalize(q.answers[i].text);
    // exact or contained
    if (norm === ansNorm || ansNorm.includes(norm) || norm.includes(ansNorm)) {
      return i;
    }
  }
  return null;
}

// ══════════════════════════════════════════
//  SCORE BANK
// ══════════════════════════════════════════
function calcBank() {
  const q = QUESTIONS[state.rounds[state.currentRound]];
  return state.revealedAnswers.reduce((s, i) => s + q.answers[i].pts, 0);
}

function updateBank() {
  state.bank = calcBank();
  $('bank-amount').textContent = state.bank;
}

// ══════════════════════════════════════════
//  ANSWER SUBMIT HANDLER
// ══════════════════════════════════════════
let busy = false;

async function handleAnswer() {
  if (busy) return;
  const input = $('answer-input').value.trim();
  $('answer-input').value = '';
  if (!input) return;

  busy = true;
  playType();

  const idx = checkAnswer(input);

  if (idx !== null) {
    // Correct!
    state.revealedAnswers.push(idx);
    updateBank();
    renderBoard();
    await showCorrectAnim(QUESTIONS[state.rounds[state.currentRound]].answers[idx].pts);

    // Check if all answers revealed
    const q = QUESTIONS[state.rounds[state.currentRound]];
    if (state.revealedAnswers.length === q.answers.length) {
      awardBank();
      await sleep(400);
      nextRound();
    }
  } else {
    // Strike
    if (state.stealMode) {
      // Steal failed — bank goes to the playing team
      await showStrikeAnim();
      const otherTeam = state.currentTeam === 1 ? 2 : 1;
      awardBankTo(otherTeam);
      state.stealMode = false;
      nextRound();
    } else {
      if (state.currentTeam === 1) {
        state.strikes1++;
      } else {
        state.strikes2++;
      }
      await showStrikeAnim();
      updateHUD();

      const strikes = state.currentTeam === 1 ? state.strikes1 : state.strikes2;
      if (strikes >= state.maxStrikes) {
        // Give other team a chance to steal
        await triggerSteal();
      }
    }
  }

  $('answer-input').focus();
  busy = false;
}

async function triggerSteal() {
  state.stealMode = true;
  // Switch visual turn to other team
  updateHUD();
  // Reveal all remaining answers briefly? No — stays hidden for steal challenge
  renderBoard();
}

function awardBank() {
  awardBankTo(state.currentTeam);
}

function awardBankTo(team) {
  if (team === 1) {
    state.score1 += state.bank;
    $('score1').textContent = state.score1;
  } else {
    state.score2 += state.bank;
    $('score2').textContent = state.score2;
  }
  state.bank = 0;
  $('bank-amount').textContent = 0;
  playWin();
}

// ══════════════════════════════════════════
//  ROUND MANAGEMENT
// ══════════════════════════════════════════
function nextRound() {
  state.currentRound++;
  if (state.currentRound >= state.maxRounds) {
    endGame();
    return;
  }
  state.strikes1 = 0;
  state.strikes2 = 0;
  state.bank = 0;
  state.revealedAnswers = [];
  state.stealMode = false;
  // Alternate starting team
  state.currentTeam = state.currentRound % 2 === 0 ? 1 : 2;
  renderBoard();
  updateHUD();
  $('answer-input').focus();
}

// ══════════════════════════════════════════
//  END GAME
// ══════════════════════════════════════════
function endGame() {
  const won = state.score1 >= state.score2 ? 1 : 2;
  $('winner-name').textContent = won === 1 ? state.team1Name : state.team2Name;
  $('winner-score').textContent = won === 1 ? state.score1 : state.score2;
  $('final-name1').textContent = state.team1Name;
  $('final-score1').textContent = state.score1;
  $('final-name2').textContent = state.team2Name;
  $('final-score2').textContent = state.score2;
  showScreen('winner');
  startConfetti();
  playWin();
}

// ══════════════════════════════════════════
//  CONTROL BUTTONS
// ══════════════════════════════════════════
$('btn-strike').addEventListener('click', async () => {
  if (busy) return;
  playClick();
  busy = true;

  if (state.currentTeam === 1) {
    state.strikes1 = Math.min(state.strikes1 + 1, state.maxStrikes);
  } else {
    state.strikes2 = Math.min(state.strikes2 + 1, state.maxStrikes);
  }

  await showStrikeAnim();
  updateHUD();

  const strikes = state.currentTeam === 1 ? state.strikes1 : state.strikes2;
  if (strikes >= state.maxStrikes && !state.stealMode) {
    await triggerSteal();
  }

  busy = false;
});

$('btn-reveal').addEventListener('click', async () => {
  if (busy) return;
  busy = true;
  playClick();

  const q = QUESTIONS[state.rounds[state.currentRound]];
  const hidden = q.answers.map((_, i) => i).filter(i => !state.revealedAnswers.includes(i));

  for (const idx of hidden) {
    state.revealedAnswers.push(idx);
    updateBank();
    await revealAnswerTile(idx);
    await sleep(150);
  }

  renderBoard();
  updateHUD();
  await sleep(600);

  awardBank();
  updateHUD();
  await sleep(800);
  nextRound();

  busy = false;
});

$('btn-steal').addEventListener('click', () => {
  if (busy) return;
  playClick();
  state.stealMode = !state.stealMode;
  updateHUD();
});

$('btn-answer').addEventListener('click', handleAnswer);

$('answer-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleAnswer();
});

// ══════════════════════════════════════════
//  INTRO SCREEN
// ══════════════════════════════════════════
// startGame is called by the lobby after players connect.
// If no lobby is present (e.g. dev skip), it runs directly.
window.startGame = function () {
  playClick();
  const n1 = $('team1-name').value.trim().toUpperCase() || 'HACKERS';
  const n2 = $('team2-name').value.trim().toUpperCase() || 'DEBUGGERS';

  state.team1Name = n1;
  state.team2Name = n2;
  state.score1 = 0;
  state.score2 = 0;
  state.strikes1 = 0;
  state.strikes2 = 0;
  state.currentTeam = 1;
  state.currentRound = 0;
  state.bank = 0;
  state.revealedAnswers = [];
  state.stealMode = false;
  state.rounds = shuffle([...Array(QUESTIONS.length).keys()]).slice(0, state.maxRounds);

  renderBoard();
  updateHUD();
  showScreen('game');
  $('answer-input').focus();
};

// If a lobby script is present, it will call startGame() when ready.
$('btn-start').addEventListener('click', () => {
  if (typeof window._lobbyActive !== 'undefined') return; // lobby handles it
  window.startGame();
});

$('btn-replay').addEventListener('click', () => {
  playClick();
  showScreen('intro');
});

// ── type sound on inputs ──
[$('team1-name'), $('team2-name'), $('answer-input')].forEach(el => {
  el.addEventListener('keydown', () => playType());
});

// ══════════════════════════════════════════
//  BOOT
// ══════════════════════════════════════════
showScreen('intro');