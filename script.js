/**
 * Royal Wedding Invitation - Norhan & Khalid (نورهان & خالد)
 * Clean, Elegant & Cinematic Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // ========================================================================
  // 1. Personalized Guest Recognition
  // ========================================================================
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get("guest") || urlParams.get("name") || urlParams.get("to");
  const storedName = localStorage.getItem("wedding_guest_name");
  
  const defaultGuest = "ضيفنا العزيز";
  const activeGuest = guestParam || storedName || defaultGuest;

  const guestDisplay = document.getElementById("guest-display");
  const guestInput = document.getElementById("guest-input");
  const updateGuestBtn = document.getElementById("update-guest-btn");

  if (guestDisplay) {
    guestDisplay.textContent = activeGuest;
  }

  if (guestInput && (guestParam || storedName)) {
    guestInput.value = activeGuest;
  }

  if (updateGuestBtn && guestInput) {
    const handleUpdate = () => {
      const val = guestInput.value.trim();
      if (val) {
        localStorage.setItem("wedding_guest_name", val);
        if (guestDisplay) guestDisplay.textContent = val;
      }
    };

    updateGuestBtn.addEventListener("click", handleUpdate);
    guestInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleUpdate();
    });
  }

  // ========================================================================
  // 2. The Smooth Invitation Opening Motion
  // ========================================================================
  const waxSeal = document.getElementById("wax-seal");
  const envelopeScreen = document.getElementById("envelope-screen");
  const cardScreen = document.getElementById("card-screen");
  const resealBtn = document.getElementById("reseal-btn");

  let isOpen = false;

  function triggerOpen() {
    if (isOpen) return;
    isOpen = true;

    // Start gentle audio & play wax release chime
    audioEngine.playChime();
    audioEngine.startMusic();

    // Spawn gold confetti burst right at wax seal position
    if (waxSeal) {
      const rect = waxSeal.getBoundingClientRect();
      spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
      waxSeal.classList.add("breaking");
    }

    // Smooth cinematic transition to the luxury card
    setTimeout(() => {
      envelopeScreen.classList.add("vanish");
      setTimeout(() => {
        envelopeScreen.style.display = "none";
        cardScreen.classList.remove("hidden");
        cardScreen.classList.add("visible");
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Gentle celebratory burst for card revelation
        spawnConfetti(window.innerWidth / 2, window.innerHeight * 0.35, 50);
      }, 500);
    }, 600);
  }

  function triggerReseal() {
    isOpen = false;
    cardScreen.classList.remove("visible");
    cardScreen.classList.add("hidden");

    envelopeScreen.style.display = "flex";
    setTimeout(() => {
      envelopeScreen.classList.remove("vanish");
      if (waxSeal) waxSeal.classList.remove("breaking");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  }

  if (waxSeal) {
    waxSeal.addEventListener("click", triggerOpen);
    waxSeal.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerOpen();
      }
    });
  }

  if (resealBtn) {
    resealBtn.addEventListener("click", triggerReseal);
  }

  // ========================================================================
  // 3. Real-Time Countdown to October 1, 2026 20:00:00
  // ========================================================================
  const weddingDate = new Date("2026-10-01T20:00:00+03:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const daysEl = document.getElementById("c-days");
    const hoursEl = document.getElementById("c-hours");
    const minutesEl = document.getElementById("c-minutes");
    const secondsEl = document.getElementById("c-seconds");

    if (!daysEl) return;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ========================================================================
  // 4. Soft Ambient Gold Stardust & Confetti Canvas
  // ========================================================================
  const canvas = document.getElementById("sparkle-canvas");
  const ctx = canvas.getContext("2d");

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const ambientDust = [];
  const dustCount = 55;

  for (let i = 0; i < dustCount; i++) {
    ambientDust.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 2 + 0.6,
      speedY: -Math.random() * 0.35 - 0.1,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? "#d4af37" : "#faebb0"
    });
  }

  const activeConfetti = [];

  function spawnConfetti(x, y, count = 40) {
    const palette = ["#d4af37", "#fbeea4", "#ffffff", "#c5a059", "#aa242c"];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 7 + 2;
      activeConfetti.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        size: Math.random() * 6 + 3,
        color: palette[Math.floor(Math.random() * palette.length)],
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 10,
        gravity: 0.16,
        life: 1,
        decay: Math.random() * 0.015 + 0.01
      });
    }
  }

  function loopCanvas() {
    ctx.clearRect(0, 0, w, h);

    // Floating Stardust
    for (let p of ambientDust) {
      p.y += p.speedY;
      p.x += p.speedX;
      p.opacity += Math.sin(Date.now() * p.pulse) * 0.008;

      if (p.y < -10) p.y = h + 10;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(1, p.opacity));
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#d4af37";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Confetti particles
    for (let i = activeConfetti.length - 1; i >= 0; i--) {
      const c = activeConfetti[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += c.gravity;
      c.rotation += c.spin;
      c.life -= c.decay;

      if (c.life <= 0) {
        activeConfetti.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = c.life;
      ctx.translate(c.x, c.y);
      ctx.rotate((c.rotation * Math.PI) / 180);
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
      ctx.restore();
    }

    requestAnimationFrame(loopCanvas);
  }
  loopCanvas();

  // ========================================================================
  // 5. Minimal Web Audio Romantic Harp Synthesizer
  // ========================================================================
  class AmbientAudioEngine {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.timer = null;
      this.btn = document.getElementById("music-btn");
      this.text = document.getElementById("music-text");

      if (this.btn) {
        this.btn.addEventListener("click", () => this.toggle());
      }
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }

    playChime() {
      try {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.35); // G5

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.7);
      } catch (e) {
        // Autoplay restrictions
      }
    }

    startMusic() {
      if (this.isPlaying) return;
      try {
        this.init();
        this.isPlaying = true;
        document.body.classList.add("music-playing");
        if (this.text) this.text.textContent = "إيقاف الموسيقى";

        // Romantic Pentatonic Chord Progression
        const notes = [392.0, 440.0, 523.25, 587.33, 659.25, 783.99]; // G4, A4, C5, D5, E5, G5
        const chords = [
          [0, 2, 4], // C
          [1, 3, 5], // Am
          [0, 3, 4], // F
          [2, 4, 5]  // Em
        ];

        let chordIdx = 0;
        let step = 0;

        this.timer = setInterval(() => {
          if (!this.isPlaying || !this.ctx) return;
          const currentChord = chords[chordIdx];
          const freq = notes[currentChord[step % currentChord.length]];
          this.playNote(freq);

          step++;
          if (step % 4 === 0) {
            chordIdx = (chordIdx + 1) % chords.length;
          }
        }, 800);
      } catch (e) {
        // Autoplay policy
      }
    }

    playNote(freq) {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(250, now + 1.4);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.8);
    }

    stopMusic() {
      this.isPlaying = false;
      document.body.classList.remove("music-playing");
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      if (this.text) this.text.textContent = "موسيقى هادئة";
    }

    toggle() {
      if (this.isPlaying) {
        this.stopMusic();
      } else {
        this.startMusic();
      }
    }
  }

  const audioEngine = new AmbientAudioEngine();
});
