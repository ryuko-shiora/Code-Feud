'use strict';

const { db, ref, set, onValue } = window.firebaseDB;

const buzzRef = ref(db, 'buzz/current');

const NAMES_KEY = 'codefeud_names';

// Read team names if set by host
function getTeamNames() {
  try {
    const raw = localStorage.getItem(NAMES_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return { team1: 'TEAM 1', team2: 'TEAM 2' };
}

// Screens
const selectScreen = document.getElementById('screen-select');
const buzzerScreen = document.getElementById('screen-buzzer');
const resultDiv    = document.getElementById('buzz-result');

// Elements
const pickT1        = document.getElementById('pick-team1');
const pickT2        = document.getElementById('pick-team2');
const buzzerBtn     = document.getElementById('big-buzzer-btn');
const teamDisplay   = document.getElementById('buzz-team-display');
const buzzerStatus  = document.getElementById('buzzer-status');
const btnChangeTeam = document.getElementById('btn-change-team');

let myTeam    = null; // 1 or 2
let buzzLocked = false;

// Apply team names from URL params or localStorage
const params  = new URLSearchParams(location.search);
const urlTeam = params.get('team'); // '1' or '2'

// Auto-select if URL param present
if (urlTeam === '1' || urlTeam === '2') {
  selectTeam(parseInt(urlTeam));
}

// Update team button labels from stored names
function refreshTeamLabels() {
  const names = getTeamNames();
  pickT1.textContent = `[ ${names.team1} ]`;
  pickT2.textContent = `[ ${names.team2} ]`;
  pickT1.className = 'btn-team btn-team-1';
  pickT2.className = 'btn-team btn-team-2';
}
refreshTeamLabels();

pickT1.addEventListener('click', () => selectTeam(1));
pickT2.addEventListener('click', () => selectTeam(2));

function selectTeam(n) {
  myTeam = n;
  const names = getTeamNames();
  const name  = n === 1 ? names.team1 : names.team2;

  selectScreen.style.display = 'none';
  buzzerScreen.style.display = 'flex';
  buzzerScreen.className     = `buzzer-team-${n}`;

  teamDisplay.textContent = `[ ${name} ]`;
  resultDiv.classList.remove('show');

  // Check current buzz state
  checkBuzzState();
}

btnChangeTeam.addEventListener('click', () => {
  selectScreen.style.display = 'flex';
  buzzerScreen.style.display = 'none';
  resultDiv.classList.remove('show');
  buzzLocked = false;
  refreshTeamLabels();
});

// ── BUZZ BUTTON ──
buzzerBtn.addEventListener('click', doBuzz);
buzzerBtn.addEventListener('touchstart', e => { e.preventDefault(); doBuzz(); }, { passive: false });

function doBuzz() {
  if (buzzLocked) return;

  const current = readBuzzState();
  // Only buzz if no one has buzzed yet
  if (current && current.team) return;

  const names = getTeamNames();
  const state = {
    team: myTeam,
    name: myTeam === 1 ? names.team1 : names.team2,
    ts:   Date.now()
  };

  set(buzzRef, state);

  // Trigger animation
  buzzerBtn.classList.add('buzzing');
  setTimeout(() => buzzerBtn.classList.remove('buzzing'), 400);

  // Haptic feedback
  if (navigator.vibrate) navigator.vibrate([80, 30, 80]);

  checkBuzzState();
}

let currentBuzzState = null;

function readBuzzState() {
  return currentBuzzState;
}

function checkBuzzState() {
  const state = readBuzzState();
  if (!state || !state.team) {
    // No buzz yet
    buzzLocked = false;
    resultDiv.classList.remove('show');
    buzzerStatus.textContent = 'Ready — be the first to buzz!';
    buzzerBtn.style.opacity  = '1';
    return;
  }

  buzzLocked = true;
  const names  = getTeamNames();

  if (state.team === myTeam) {
    // I won!
    resultDiv.className = 'buzz-result show buzz-result-winner';
    document.getElementById('buzz-result-icon').textContent  = '🏆';
    document.getElementById('buzz-result-title').textContent = "YOU'RE FIRST!";
    document.getElementById('buzz-result-sub').textContent   = `${state.name} buzzed in — go answer!`;
  } else {
    // Other team got it
    const otherName = state.team === 1 ? names.team1 : names.team2;
    resultDiv.className = 'buzz-result show buzz-result-loser';
    document.getElementById('buzz-result-icon').textContent  = '😤';
    document.getElementById('buzz-result-title').textContent = "TOO SLOW!";
    document.getElementById('buzz-result-sub').textContent   = `${otherName} got there first...`;
  }
}

onValue(buzzRef, (snapshot) => {

  currentBuzzState = snapshot.val();

  if (myTeam) {
    checkBuzzState();
  }

});