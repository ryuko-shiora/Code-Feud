'use strict';

// ══════════════════════════════════════════════
//  CODE FEUD — LOBBY / QR MANAGER
//  1 jugador por equipo · localhost dev
// ══════════════════════════════════════════════

const LOBBY_KEY = 'codefeud_lobby';
const NAMES_KEY = 'codefeud_names';
const BUZZ_KEY  = 'codefeud_buzz';

class LobbyManager {
  constructor() {
    // Auto-detect: mismo origen, ruta /buzzer/index.html
    this.buzzerBase = location.origin + '/Code-Feud/HTML/buzzer.html';
    this._pollInterval = null;
    this._build();
    this._bindEvents();
  }

  /* ── DOM ──────────────────────────────────── */
  _build() {
    const el = document.createElement('div');
    el.id = 'screen-lobby';
    el.innerHTML = `
      <div class="lobby-title">SCAN TO JOIN</div>
      <div class="lobby-subtitle">&gt; One player per team — scan your QR</div>

      <div class="lobby-qr-grid">

        <div class="qr-panel qr-panel-1">
          <div class="connected-badge" id="lobby-badge-1">● READY</div>
          <div class="qr-panel-name" id="lobby-qr-name1">TEAM 1</div>
          <div class="qr-code-wrap" id="qr-wrap-1"></div>
          <div class="qr-status" id="qr-status-1">Waiting for player...</div>
        </div>

        <div class="qr-panel qr-panel-2">
          <div class="connected-badge" id="lobby-badge-2">● READY</div>
          <div class="qr-panel-name" id="lobby-qr-name2">TEAM 2</div>
          <div class="qr-code-wrap" id="qr-wrap-2"></div>
          <div class="qr-status" id="qr-status-2">Waiting for player...</div>
        </div>

      </div>

      <div class="lobby-bottom">
        <div class="lobby-waiting" id="lobby-waiting-msg">
          Waiting for both players<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
        </div>
        <button class="btn-launch" id="btn-launch">▶ LAUNCH GAME</button>
        <button class="btn-skip-lobby" id="btn-skip-lobby">SKIP (host only)</button>
      </div>
    `;

    const gameScreen = document.getElementById('screen-game');
    gameScreen
      ? gameScreen.parentNode.insertBefore(el, gameScreen)
      : document.body.appendChild(el);

    this.el = {
      screen:     el,
      qrName1:    el.querySelector('#lobby-qr-name1'),
      qrName2:    el.querySelector('#lobby-qr-name2'),
      qrWrap1:    el.querySelector('#qr-wrap-1'),
      qrWrap2:    el.querySelector('#qr-wrap-2'),
      status1:    el.querySelector('#qr-status-1'),
      status2:    el.querySelector('#qr-status-2'),
      badge1:     el.querySelector('#lobby-badge-1'),
      badge2:     el.querySelector('#lobby-badge-2'),
      waitingMsg: el.querySelector('#lobby-waiting-msg'),
      btnLaunch:  el.querySelector('#btn-launch'),
      btnSkip:    el.querySelector('#btn-skip-lobby'),
    };
  }

  _bindEvents() {
    this.el.btnLaunch.addEventListener('click', () => this._launch());
    this.el.btnSkip.addEventListener('click',   () => this._launch());
    window.addEventListener('storage', e => {
      if (e.key === LOBBY_KEY && this._isOpen()) this._refresh();
    });
  }

  _isOpen() { return this.el.screen.classList.contains('active'); }

  /* ── Open ─────────────────────────────────── */
  open(team1Name, team2Name) {
    this.el.qrName1.textContent = team1Name;
    this.el.qrName2.textContent = team2Name;

    localStorage.setItem(NAMES_KEY, JSON.stringify({ team1: team1Name, team2: team2Name }));
    localStorage.removeItem(LOBBY_KEY);
    localStorage.removeItem(BUZZ_KEY);

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    this.el.screen.classList.add('active');

    // Reset badges & status
    this.el.badge1.classList.remove('visible');
    this.el.badge2.classList.remove('visible');
    this.el.status1.textContent = 'Waiting for player...';
    this.el.status2.textContent = 'Waiting for player...';
    this.el.btnLaunch.classList.remove('ready');
    this.el.waitingMsg.innerHTML =
      'Waiting for both players<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
    this.el.waitingMsg.style.color = '';

    this._generateQRs();
    this._startPolling();
  }

  /* ── QR generation ────────────────────────── */
  _generateQRs() {
    const url1 = this.buzzerBase + '?team=1';
    const url2 = this.buzzerBase + '?team=2';
    this._renderQR(this.el.qrWrap1, url1);
    this._renderQR(this.el.qrWrap2, url2);
  }

  _renderQR(wrap, url) {
    wrap.innerHTML = '';
    if (typeof QRCode !== 'undefined') {
      new QRCode(wrap, {
        text: url, width: 160, height: 160,
        colorDark: '#000', colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.M,
      });
    } else {
      // Fallback: imagen externa
      const img = document.createElement('img');
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(url)}`;
      img.alt = url;
      img.style.cssText = 'width:100%;height:100%;';
      wrap.appendChild(img);
    }
  }

  /* ── Polling ──────────────────────────────── */
  _startPolling() {
    clearInterval(this._pollInterval);
    this._pollInterval = setInterval(() => this._refresh(), 800);
  }

  _stopPolling() { clearInterval(this._pollInterval); }

  _refresh() {
    const { team1 = [], team2 = [] } = this._readLobby();
    const has1 = team1.length >= 1;
    const has2 = team2.length >= 1;

    // Status
    this.el.status1.textContent = has1 ? '✓ Player connected' : 'Waiting for player...';
    this.el.status2.textContent = has2 ? '✓ Player connected' : 'Waiting for player...';
    this.el.badge1.classList.toggle('visible', has1);
    this.el.badge2.classList.toggle('visible', has2);

    // Launch button
    const bothReady = has1 && has2;
    this.el.btnLaunch.classList.toggle('ready', bothReady);

    // Waiting message
    if (bothReady) {
      this.el.waitingMsg.textContent = '✓ Both players ready — launch when set!';
      this.el.waitingMsg.style.color = '#00ff88aa';
    } else {
      const missing = !has1 && !has2 ? 'both players'
                    : !has1          ? 'Team 1 player'
                                     : 'Team 2 player';
      this.el.waitingMsg.innerHTML =
        `Waiting for ${missing}<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>`;
      this.el.waitingMsg.style.color = '';
    }
  }

  _readLobby() {
    try { return JSON.parse(localStorage.getItem(LOBBY_KEY)) || {}; }
    catch { return {}; }
  }

  /* ── Launch ───────────────────────────────── */
  _launch() {
    this._stopPolling();
    localStorage.removeItem(BUZZ_KEY);
    this.el.screen.classList.remove('active');
    if (typeof window.startGame === 'function') {
      window.startGame();
    } else {
      const g = document.getElementById('screen-game');
      if (g) { g.classList.add('active'); g.style.display = 'flex'; }
    }
  }
}

/* ══════════════════════════════════════════════
   BUZZER PAGE: auto-register al lobby
   Sólo se activa si estamos en la página del buzzer
══════════════════════════════════════════════ */
function registerBuzzerPlayer() {
  if (!document.getElementById('big-buzzer-btn')) return;

  const pid     = 'p_' + Math.random().toString(36).slice(2, 8);
  const team    = new URLSearchParams(location.search).get('team');
  if (!team) return;
  const teamKey = team === '1' ? 'team1' : 'team2';

  function joinLobby() {
    try {
      const data = JSON.parse(localStorage.getItem(LOBBY_KEY) || '{"team1":[],"team2":[]}');
      if (!data.team1) data.team1 = [];
      if (!data.team2) data.team2 = [];
      if (!data[teamKey].find(p => p.id === pid)) {
        data[teamKey].push({ id: pid, name: `Player ${data[teamKey].length + 1}` });
        localStorage.setItem(LOBBY_KEY, JSON.stringify(data));
      }
    } catch {}
  }

  function leaveLobby() {
    try {
      const data = JSON.parse(localStorage.getItem(LOBBY_KEY) || '{}');
      if (data[teamKey]) {
        data[teamKey] = data[teamKey].filter(p => p.id !== pid);
        localStorage.setItem(LOBBY_KEY, JSON.stringify(data));
      }
    } catch {}
  }

  joinLobby();
  window.addEventListener('beforeunload', leaveLobby);
  setInterval(joinLobby, 4000); // heartbeat
}

window.LobbyManager = LobbyManager;
registerBuzzerPlayer();