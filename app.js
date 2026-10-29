// TITAN CORE - Multi-User Calisthenics & Six-Pack Academy Engine

const DEFAULT_AVATARS = ["⚡", "🦁", "🥊", "🥋", "🏆", "🔥", "🦅", "🚀", "🦍", "⚔️", "🥇", "💥"];

class TitanCoreApp {
  constructor() {
    this.selectedDayNumber = this.getCurrentDayNumber(); // 1 = Mon ... 7 = Sun
    this.todayDayNumber = this.selectedDayNumber;
    this.state = this.loadState();
    
    // Workout player state
    this.workoutSession = {
      active: false,
      dayNumber: 1,
      exerciseIndex: 0,
      setIndex: 1,
      totalSets: 3,
      isResting: false,
      timeRemaining: 30,
      totalDuration: 30,
      timerInterval: null,
      isPaused: false
    };

    // Selected avatar in new profile form
    this.selectedNewAvatar = DEFAULT_AVATARS[0];

    // Audio context for sound effects (Web Audio API)
    this.audioCtx = null;

    this.init();
  }

  getCurrentDayNumber() {
    const jsDay = new Date().getDay();
    return jsDay === 0 ? 7 : jsDay;
  }

  getTodayDateString() {
    return new Date().toISOString().split('T')[0];
  }

  // Helper to create a new profile object
  createNewProfile(id, name, age = 13, avatar = "⚡") {
    return {
      id: id || 'prof_' + Date.now(),
      name: name || 'Athlete 1',
      age: parseInt(age) || 13,
      avatar: avatar || '⚡',
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      completedWorkouts: {},
      habits: {},
      prs: {
        pullups: 0,
        plank: 0,
        hang: 0
      },
      reminderTime: "16:30",
      notificationsEnabled: false
    };
  }

  // Multi-user state loader with backward compatibility migration
  loadState() {
    const defaultInitialProfile = this.createNewProfile('prof_default', 'Athlete 1', 13, '⚡');

    // 1. Check if v2 multi-user state exists
    const storedV2 = localStorage.getItem('titan_core_profiles_v2');
    if (storedV2) {
      try {
        const parsed = JSON.parse(storedV2);
        if (parsed.profiles && parsed.activeProfileId && parsed.profiles[parsed.activeProfileId]) {
          return parsed;
        }
      } catch (e) {
        console.warn("Could not read v2 localStorage:", e);
      }
    }

    // 2. Check if v1 single-user state exists to migrate
    const storedV1 = localStorage.getItem('titan_core_state_v1');
    if (storedV1) {
      try {
        const v1 = JSON.parse(storedV1);
        const migratedProfile = {
          id: 'prof_default',
          name: 'Athlete 1',
          age: 13,
          avatar: '⚡',
          xp: v1.xp || 0,
          streak: v1.streak || 0,
          lastActiveDate: v1.lastActiveDate || null,
          completedWorkouts: v1.completedWorkouts || {},
          habits: v1.habits || {},
          prs: v1.prs || { pullups: 0, plank: 0, hang: 0 },
          reminderTime: v1.reminderTime || "16:30",
          notificationsEnabled: !!v1.notificationsEnabled
        };

        const stateObj = {
          activeProfileId: 'prof_default',
          profiles: {
            'prof_default': migratedProfile
          }
        };
        localStorage.setItem('titan_core_profiles_v2', JSON.stringify(stateObj));
        return stateObj;
      } catch (e) {
        console.warn("Could not migrate v1 state:", e);
      }
    }

    // 3. Fallback default
    return {
      activeProfileId: defaultInitialProfile.id,
      profiles: {
        [defaultInitialProfile.id]: defaultInitialProfile
      }
    };
  }

  // Active athlete profile getter
  get profile() {
    if (!this.state.profiles || !this.state.activeProfileId || !this.state.profiles[this.state.activeProfileId]) {
      const firstId = Object.keys(this.state.profiles || {})[0];
      if (firstId) {
        this.state.activeProfileId = firstId;
      } else {
        const fallback = this.createNewProfile('prof_default', 'Athlete 1', 13, '⚡');
        this.state.profiles = { [fallback.id]: fallback };
        this.state.activeProfileId = fallback.id;
      }
    }
    return this.state.profiles[this.state.activeProfileId];
  }

  saveState() {
    try {
      localStorage.setItem('titan_core_profiles_v2', JSON.stringify(this.state));
      // Mirror active profile to v1 for backward compatibility
      localStorage.setItem('titan_core_state_v1', JSON.stringify(this.profile));
    } catch (e) {
      console.warn("Could not write localStorage:", e);
    }
    this.updateHeaderStats();
  }

  init() {
    this.initAudioContext();
    this.registerServiceWorker();
    this.calculateStreak();
    this.setupEventListeners();
    this.renderDaySelector();
    this.renderCurrentDayWorkout();
    this.renderHabits();
    this.renderProgressPlan();
    this.renderAnatomyExerciseList();
    this.renderAvatarPicker();
    this.updateHeaderStats();
    this.checkReminderTimer();
    this.renderQRCode();
    
    // Check reminder timer periodically
    setInterval(() => this.checkReminderTimer(), 30000);
  }

  // Register PWA Service Worker for offline support
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then((reg) => {
          console.log('Titan Core SW registered:', reg.scope);
        }).catch((err) => {
          console.log('Titan Core SW registration failed:', err);
        });
      });
    }
  }

  initAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.audioCtx = new AudioContext();
    }
  }

  // Synthesize workout sounds via Web Audio API
  playSound(type) {
    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    if (type === 'beep') {
      // 3-2-1 countdown beep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'go') {
      // Start exercise buzzer / chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.2);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'rest') {
      // Rest chime
      const freqs = [440, 554.37];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.2, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.35);
      });
    } else if (type === 'fanfare') {
      // Victory fanfare
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.14);
        gain.gain.setValueAtTime(0.25, now + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.14);
        osc.stop(now + idx * 0.14 + 0.4);
      });
    }
  }

  showToast(message, icon = "⚡") {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // Calculate daily streak for active athlete
  calculateStreak() {
    const today = this.getTodayDateString();
    const completedDays = Object.keys(this.profile.completedWorkouts || {}).sort().reverse();
    if (completedDays.length === 0) {
      this.profile.streak = 0;
      return;
    }

    let streak = 0;
    let checkDate = new Date();
    
    // Check if worked out today
    if (this.profile.completedWorkouts[today]) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      checkDate.setDate(checkDate.getDate() - 1);
      const yesterday = checkDate.toISOString().split('T')[0];
      if (!this.profile.completedWorkouts[yesterday]) {
        this.profile.streak = 0;
        return;
      }
    }

    // Count consecutive previous days
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (this.profile.completedWorkouts[dateStr]) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    this.profile.streak = streak;
  }

  getCurrentRank() {
    const xp = this.profile.xp || 0;
    let current = PROGRESSION_RANKS[0];
    for (const rank of PROGRESSION_RANKS) {
      if (xp >= rank.minXp) {
        current = rank;
      }
    }
    return current;
  }

  getNextRank() {
    const xp = this.profile.xp || 0;
    for (const rank of PROGRESSION_RANKS) {
      if (xp < rank.minXp) {
        return rank;
      }
    }
    return null;
  }

  updateHeaderStats() {
    const p = this.profile;
    const rank = this.getCurrentRank();

    // Profile button display
    const avatarEl = document.getElementById('header-profile-avatar');
    const nameEl = document.getElementById('header-profile-name');
    const mobileAvatarEl = document.getElementById('mobile-profile-avatar');
    
    if (avatarEl) avatarEl.textContent = p.avatar || "⚡";
    if (nameEl) nameEl.textContent = `${p.name} (${p.age}yo)`;
    if (mobileAvatarEl) mobileAvatarEl.textContent = p.avatar || "⚡";

    // Header stats
    document.getElementById('header-streak-count').textContent = `${p.streak} Day Streak`;
    document.getElementById('header-rank-badge').textContent = rank.badge;
    document.getElementById('header-rank-title').textContent = rank.title;
    document.getElementById('header-xp-val').textContent = `${p.xp} XP`;
  }

  // ========================================================
  // MULTI-USER PROFILE MANAGEMENT
  // ========================================================
  renderAvatarPicker() {
    const grid = document.getElementById('avatar-picker-grid');
    if (!grid) return;
    grid.innerHTML = '';

    DEFAULT_AVATARS.forEach(emoji => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `avatar-opt-btn ${emoji === this.selectedNewAvatar ? 'selected' : ''}`;
      btn.textContent = emoji;
      btn.addEventListener('click', () => {
        this.selectedNewAvatar = emoji;
        grid.querySelectorAll('.avatar-opt-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
      grid.appendChild(btn);
    });
  }

  openProfileModal() {
    this.renderProfilesModalList();
    document.getElementById('profile-modal').classList.add('active');
  }

  closeProfileModal() {
    document.getElementById('profile-modal').classList.remove('active');
  }

  renderProfilesModalList() {
    const container = document.getElementById('profiles-list-container');
    if (!container) return;
    container.innerHTML = '';

    const profiles = Object.values(this.state.profiles);

    profiles.forEach(p => {
      const isActive = p.id === this.state.activeProfileId;
      const rank = PROGRESSION_RANKS.slice().reverse().find(r => p.xp >= r.minXp) || PROGRESSION_RANKS[0];

      const card = document.createElement('div');
      card.className = `profile-item-card ${isActive ? 'active-profile' : ''}`;
      card.innerHTML = `
        <div class="profile-item-left">
          <div class="profile-item-avatar">${p.avatar || '⚡'}</div>
          <div>
            <div class="profile-item-title">${p.name} (${p.age} years old)</div>
            <div class="profile-item-meta">${rank.badge} ${rank.title} • ${p.xp} XP • 🔥 ${p.streak} Days</div>
          </div>
        </div>
        <div class="profile-item-actions">
          ${isActive 
            ? '<span class="badge badge-green">ACTIVE NOW</span>'
            : `<button class="btn btn-primary btn-sm btn-switch-profile" data-id="${p.id}">Switch</button>`
          }
          ${profiles.length > 1 && !isActive
            ? `<button class="btn btn-secondary btn-sm btn-delete-profile" data-id="${p.id}" style="color: var(--accent-red); padding: 6px 10px;" title="Delete profile">🗑️</button>`
            : ''
          }
        </div>
      `;

      container.appendChild(card);
    });

    // Event listeners on switch buttons
    container.querySelectorAll('.btn-switch-profile').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        this.switchProfile(id);
      });
    });

    // Event listeners on delete buttons
    container.querySelectorAll('.btn-delete-profile').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        this.deleteProfile(id);
      });
    });
  }

  switchProfile(profileId) {
    if (!this.state.profiles[profileId]) return;
    this.state.activeProfileId = profileId;
    this.calculateStreak();
    this.saveState();

    this.renderProfilesModalList();
    this.renderDaySelector();
    this.renderCurrentDayWorkout();
    this.renderHabits();
    this.renderProgressPlan();
    this.updateHeaderStats();
    this.closeProfileModal();

    this.playSound('go');
    this.showToast(`Switched athlete to ${this.profile.name}!`, this.profile.avatar);
  }

  createProfile(name, age, avatar) {
    const newId = 'prof_' + Date.now();
    const newProf = this.createNewProfile(newId, name, age, avatar);
    this.state.profiles[newId] = newProf;
    this.state.activeProfileId = newId;
    this.saveState();

    this.switchProfile(newId);
    this.showToast(`Welcome ${name}! Profile created.`, avatar);
  }

  deleteProfile(profileId) {
    const prof = this.state.profiles[profileId];
    if (!prof) return;
    if (confirm(`Are you sure you want to delete profile for ${prof.name}? This will remove their stats.`)) {
      delete this.state.profiles[profileId];
      if (this.state.activeProfileId === profileId) {
        this.state.activeProfileId = Object.keys(this.state.profiles)[0];
      }
      this.saveState();
      this.renderProfilesModalList();
      this.renderDaySelector();
      this.renderCurrentDayWorkout();
      this.renderHabits();
      this.renderProgressPlan();
      this.updateHeaderStats();
      this.showToast("Profile deleted.", "🗑️");
    }
  }

  // ========================================================
  // QR CODE & DEVICE SHARING
  // ========================================================
  renderQRCode() {
    const qrContainer = document.getElementById('wifi-qr-container');
    const urlInput = document.getElementById('share-wifi-url');
    if (!qrContainer) return;

    // Use current origin if loaded over HTTP, else detect
    let targetUrl = window.location.href;
    if (window.location.protocol === 'file:') {
      targetUrl = "http://192.168.68.66:8080";
    }

    if (urlInput) {
      urlInput.value = targetUrl;
    }

    if (window.TitanQR) {
      qrContainer.innerHTML = window.TitanQR.generateSVG(targetUrl, 200);
    }
  }

  openShareModal() {
    this.renderQRCode();
    document.getElementById('share-modal').classList.add('active');
  }

  closeShareModal() {
    document.getElementById('share-modal').classList.remove('active');
  }

  // ========================================================
  // SETUP EVENT LISTENERS
  // ========================================================
  setupEventListeners() {
    // Desktop / Tablet Navigation tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        this.switchTab(targetId);
      });
    });

    // Mobile Bottom Navigation buttons
    const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
    mobileNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.id === 'btn-mobile-nav-profile') {
          this.openProfileModal();
          return;
        }
        const targetId = btn.getAttribute('data-tab');
        this.switchTab(targetId);
      });
    });

    // Profile modal open / close
    document.getElementById('btn-open-profile-modal').addEventListener('click', () => this.openProfileModal());
    document.getElementById('btn-close-profile-modal').addEventListener('click', () => this.closeProfileModal());

    // Share modal open / close
    document.getElementById('btn-open-share-modal').addEventListener('click', () => this.openShareModal());
    document.getElementById('btn-close-share-modal').addEventListener('click', () => this.closeShareModal());

    // Copy URL button
    const copyBtn = document.getElementById('btn-copy-url');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const urlInput = document.getElementById('share-wifi-url');
        urlInput.select();
        navigator.clipboard.writeText(urlInput.value).then(() => {
          this.showToast("Link copied to clipboard!", "📋");
        }).catch(() => {
          document.execCommand('copy');
          this.showToast("Link copied!", "📋");
        });
      });
    }

    // Share modal sub-tabs
    const shareTabBtns = document.querySelectorAll('.share-tab-btn');
    shareTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        shareTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-share-tab');
        document.querySelectorAll('.share-tab-content').forEach(c => c.classList.remove('active'));
        const targetContent = document.getElementById(targetId);
        if (targetContent) targetContent.classList.add('active');
      });
    });

    // Create Profile form
    const createForm = document.getElementById('create-profile-form');
    if (createForm) {
      createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('new-profile-name').value.trim();
        const age = parseInt(document.getElementById('new-profile-age').value) || 13;
        if (name) {
          this.createProfile(name, age, this.selectedNewAvatar);
          createForm.reset();
          document.getElementById('new-profile-age').value = 13;
        }
      });
    }

    // Quick Start Workout button in banner
    const quickStartBtn = document.getElementById('btn-quick-start-today');
    if (quickStartBtn) {
      quickStartBtn.addEventListener('click', () => {
        this.startWorkout(this.todayDayNumber);
      });
    }

    // Notification permission toggle
    const permBtn = document.getElementById('btn-toggle-notification-perm');
    if (permBtn) {
      permBtn.addEventListener('click', () => this.requestNotificationPermission());
    }

    // Save reminder time
    const saveReminderBtn = document.getElementById('btn-save-reminder');
    if (saveReminderBtn) {
      saveReminderBtn.addEventListener('click', () => {
        const timeVal = document.getElementById('reminder-time-input').value;
        this.profile.reminderTime = timeVal;
        this.saveState();
        document.getElementById('reminder-status-badge').textContent = `Active for ${timeVal} Daily`;
        this.showToast(`Daily reminder saved for ${timeVal}!`, "⏰");
      });
    }

    // Test sound chime
    const testSoundBtn = document.getElementById('btn-test-sound');
    if (testSoundBtn) {
      testSoundBtn.addEventListener('click', () => {
        this.playSound('go');
        this.showToast("Workout buzzer sound preview!", "🔊");
      });
    }

    // PR submission form
    const prForm = document.getElementById('pr-form');
    if (prForm) {
      prForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pullups = parseInt(document.getElementById('input-pr-pullups').value) || 0;
        const plank = parseInt(document.getElementById('input-pr-plank').value) || 0;
        const hang = parseInt(document.getElementById('input-pr-hang').value) || 0;

        if (pullups > this.profile.prs.pullups) this.profile.prs.pullups = pullups;
        if (plank > this.profile.prs.plank) this.profile.prs.plank = plank;
        if (hang > this.profile.prs.hang) this.profile.prs.hang = hang;

        this.profile.xp += 25;
        this.saveState();
        this.renderProgressPlan();
        this.showToast(`Personal Records updated for ${this.profile.name}! +25 XP`, "🏆");
        this.playSound('go');
      });
    }

    // Export all profiles progress backup
    const exportBtn = document.getElementById('btn-export-data');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", `titan_core_all_athletes_${this.getTodayDateString()}.json`);
        dlAnchor.click();
        this.showToast("Full athlete backup exported!", "💾");
      });
    }

    // Reset current profile data
    const resetBtn = document.getElementById('btn-reset-demo');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm(`Reset stats and history for ${this.profile.name}?`)) {
          const fresh = this.createNewProfile(this.profile.id, this.profile.name, this.profile.age, this.profile.avatar);
          this.state.profiles[fresh.id] = fresh;
          this.saveState();
          this.calculateStreak();
          this.renderDaySelector();
          this.renderCurrentDayWorkout();
          this.renderHabits();
          this.renderProgressPlan();
          this.updateHeaderStats();
          this.showToast(`Stats reset for ${fresh.name}.`, "🔄");
        }
      });
    }

    // Interactive anatomy clicks
    const anatomySvg = document.getElementById('anatomy-svg');
    if (anatomySvg) {
      anatomySvg.addEventListener('click', (e) => {
        const target = e.target.closest('.muscle-path');
        if (target) {
          const muscleKey = target.getAttribute('data-muscle');
          this.highlightMuscleAndFilter(muscleKey);
        }
      });
    }

    const resetFilterBtn = document.getElementById('btn-reset-muscle-filter');
    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', () => {
        this.highlightMuscleAndFilter(null);
      });
    }

    // Workout player controls
    document.getElementById('btn-close-modal').addEventListener('click', () => this.stopWorkout());
    document.getElementById('btn-player-toggle').addEventListener('click', () => this.toggleWorkoutPause());
    document.getElementById('btn-player-next').addEventListener('click', () => this.skipToNextSet());
    document.getElementById('btn-player-prev').addEventListener('click', () => this.goToPrevSet());
  }

  switchTab(targetId) {
    // Sync top nav
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === targetId);
    });

    // Sync mobile bottom nav
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === targetId);
    });

    // Show view
    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.toggle('active', view.id === targetId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ========================================================
  // NOTIFICATIONS & REMINDERS
  // ========================================================
  requestNotificationPermission() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications. In-app chimes will still sound!");
      return;
    }

    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        this.profile.notificationsEnabled = true;
        this.saveState();
        this.showToast("Push alerts enabled! We will alert you at workout time.", "🔔");
        new Notification("⚡ TITAN CORE Active", {
          body: `Reminders enabled for ${this.profile.name}!`,
          icon: "icon-192.png"
        });
      } else {
        this.showToast("Notifications blocked. You will still receive in-app alerts.", "ℹ️");
      }
    });
  }

  checkReminderTimer() {
    const now = new Date();
    const currentHour = String(now.getHours()).padStart(2, '0');
    const currentMinute = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${currentHour}:${currentMinute}`;

    if (currentTimeStr === this.profile.reminderTime) {
      const today = this.getTodayDateString();
      if (!this.profile.completedWorkouts[today] && !this._reminderTriggeredToday) {
        this._reminderTriggeredToday = true;
        this.triggerWorkoutReminder();
      }
    }
  }

  triggerWorkoutReminder() {
    this.playSound('fanfare');
    this.showToast(`⏰ Workout Time, ${this.profile.name}! Pull-up bar is calling!`, "🔥");

    if (Notification.permission === "granted") {
      new Notification(`⚡ TITAN CORE: Workout Time, ${this.profile.name}!`, {
        body: "Time for today's strength session. Build your back & carve your six-pack!",
        requireInteraction: true,
        icon: "icon-192.png"
      });
    }
  }

  // ========================================================
  // DAY SELECTOR & WORKOUT RENDERING
  // ========================================================
  renderDaySelector() {
    const container = document.getElementById('day-selector-container');
    if (!container) return;
    container.innerHTML = '';

    const todayDate = this.getTodayDateString();

    WEEKLY_WORKOUT_PLAN.forEach(day => {
      const card = document.createElement('div');
      card.className = `day-card ${day.dayNumber === this.selectedDayNumber ? 'selected' : ''} ${day.dayNumber === this.todayDayNumber ? 'today' : ''}`;
      
      if (this.profile.completedWorkouts[todayDate] && day.dayNumber === this.todayDayNumber) {
        card.classList.add('completed');
      }

      card.innerHTML = `
        <div class="day-short">${day.dayName.substring(0, 3)}</div>
        <div class="day-title-short">Day ${day.dayNumber}</div>
        <div class="day-focus-tag" title="${day.focus}">${day.intensity}</div>
      `;

      card.addEventListener('click', () => {
        this.selectedDayNumber = day.dayNumber;
        this.renderDaySelector();
        this.renderCurrentDayWorkout();
      });

      container.appendChild(card);
    });
  }

  renderCurrentDayWorkout() {
    const dayPlan = WEEKLY_WORKOUT_PLAN.find(d => d.dayNumber === this.selectedDayNumber) || WEEKLY_WORKOUT_PLAN[0];
    const todayDate = this.getTodayDateString();
    const isCompleted = !!(this.profile.completedWorkouts[todayDate] && this.selectedDayNumber === this.todayDayNumber);

    // Hero Card
    const heroCard = document.getElementById('day-hero-card');
    heroCard.innerHTML = `
      <div class="hero-header">
        <div>
          <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 8px; flex-wrap: wrap;">
            <span class="badge badge-green">${dayPlan.dayName}</span>
            <span class="badge badge-cyan">${dayPlan.intensity} Intensity</span>
            ${isCompleted ? '<span class="badge badge-orange">✓ COMPLETED TODAY</span>' : ''}
          </div>
          <h2 class="hero-title">${dayPlan.title}</h2>
          <p class="hero-focus">${dayPlan.focus}</p>
        </div>
        <div class="hero-actions">
          <button class="btn btn-primary" id="btn-start-hero-workout">
            ⚡ Start Guided Workout
          </button>
        </div>
      </div>

      <div class="hero-meta">
        <div class="meta-item">
          <span>⏱️ Duration:</span>
          <strong>~${dayPlan.estimatedMinutes} mins</strong>
        </div>
        <div class="meta-item">
          <span>🧗 Equipment:</span>
          <strong>Pull-up Bar & Floor</strong>
        </div>
        <div class="meta-item">
          <span>🎯 Total:</span>
          <strong>${dayPlan.exercises.length} Exercises</strong>
        </div>
      </div>
    `;

    document.getElementById('btn-start-hero-workout').addEventListener('click', () => {
      this.startWorkout(this.selectedDayNumber);
    });

    // Teen Coach Tip
    document.getElementById('day-coach-tip').textContent = dayPlan.teenAdvice;

    // Warm-up Chips
    const warmupContainer = document.getElementById('day-warmup-chips');
    warmupContainer.innerHTML = '';
    if (dayPlan.warmup && dayPlan.warmup.length > 0) {
      dayPlan.warmup.forEach(w => {
        const chip = document.createElement('div');
        chip.className = 'warmup-chip';
        chip.innerHTML = `<strong>${w.duration}</strong> <span>${w.name} (${w.note})</span>`;
        warmupContainer.appendChild(chip);
      });
      document.getElementById('day-warmup-box').style.display = 'block';
    } else {
      document.getElementById('day-warmup-box').style.display = 'none';
    }

    // Exercises List
    const exContainer = document.getElementById('day-exercises-container');
    exContainer.innerHTML = '';

    dayPlan.exercises.forEach((item, index) => {
      const exercise = EXERCISES_DATABASE[item.id];
      if (!exercise) return;

      const card = document.createElement('div');
      card.className = 'exercise-card';
      card.innerHTML = `
        <div class="exercise-card-header">
          <div class="exercise-title-group">
            <div class="exercise-number">${index + 1}</div>
            <div>
              <div class="exercise-name">${exercise.name}</div>
              <div class="exercise-prescribed">${item.sets} Sets • ${item.target} (Rest: ${item.rest})</div>
            </div>
          </div>
          <span class="badge badge-cyan">${exercise.category}</span>
        </div>

        <!-- Targeted Muscles Box -->
        <div class="muscles-box">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--text-muted);">
            🎯 Targeted Muscle Groups:
          </div>
          <div class="muscle-tags-row">
            ${exercise.targetMuscles.primary.map(m => `<span class="muscle-tag primary">Primary: ${m}</span>`).join('')}
            ${exercise.targetMuscles.secondary.map(m => `<span class="muscle-tag secondary">Assist: ${m}</span>`).join('')}
          </div>
        </div>

        <!-- Why & How Breakdown Grid -->
        <div class="exercise-breakdown-grid">
          <div class="breakdown-box">
            <div class="breakdown-title why">💡 Why Do It (Strength & 6-Pack)</div>
            <div class="breakdown-body">${exercise.why}</div>
          </div>

          <div class="breakdown-box">
            <div class="breakdown-title how">📖 How To Do It (Step-by-Step Form)</div>
            <div class="breakdown-body">
              <ol class="steps-list">
                ${exercise.how.map(step => `<li>${step}</li>`).join('')}
              </ol>
            </div>
          </div>
        </div>

        <!-- Safety cues & Progression for beginners -->
        <div class="teen-tips-box">
          <strong>⚠️ 13yo Form Cue:</strong> ${exercise.teenTips}
        </div>

        <div class="progression-row">
          <div><strong>Too Hard?</strong> ${exercise.regression}</div>
          <div><strong>Too Easy?</strong> ${exercise.progression}</div>
        </div>
      `;

      exContainer.appendChild(card);
    });
  }

  // ========================================================
  // INTERACTIVE WORKOUT MODE (CIRCULAR TIMER & SOUNDS)
  // ========================================================
  startWorkout(dayNum) {
    const dayPlan = WEEKLY_WORKOUT_PLAN.find(d => d.dayNumber === dayNum) || WEEKLY_WORKOUT_PLAN[0];
    if (!dayPlan.exercises || dayPlan.exercises.length === 0) {
      this.showToast("Today is a complete rest day! Enjoy your recovery.", "😴");
      return;
    }

    this.workoutSession = {
      active: true,
      dayNumber: dayNum,
      dayPlan: dayPlan,
      exerciseIndex: 0,
      setIndex: 1,
      totalSets: dayPlan.exercises[0].sets || 3,
      isResting: false,
      timeRemaining: 30,
      totalDuration: 30,
      timerInterval: null,
      isPaused: false
    };

    document.getElementById('workout-modal').classList.add('active');
    this.setupCurrentExerciseInPlayer();
    this.playSound('go');
  }

  setupCurrentExerciseInPlayer() {
    const session = this.workoutSession;
    const planItem = session.dayPlan.exercises[session.exerciseIndex];
    const exercise = EXERCISES_DATABASE[planItem.id];

    if (!session.isResting) {
      document.getElementById('player-status-badge').textContent = `EXERCISE ${session.exerciseIndex + 1} OF ${session.dayPlan.exercises.length}`;
      document.getElementById('player-status-badge').className = 'player-status-tag exercise';
      document.getElementById('player-title').textContent = exercise.name;
      document.getElementById('player-set-label').textContent = `Set ${session.setIndex} of ${session.totalSets} • Target: ${planItem.target}`;

      session.totalDuration = exercise.defaultSeconds || 35;
      session.timeRemaining = session.totalDuration;

      document.getElementById('player-timer-digits').textContent = session.timeRemaining;
      document.getElementById('player-timer-sublabel').textContent = exercise.isTimed ? "HOLD SECONDS" : "ESTIMATED PACE";
      document.getElementById('player-cue-header').textContent = `🎯 Target Muscles: ${exercise.targetMuscles.primary.join(', ')}`;
      document.getElementById('player-cue-text').textContent = exercise.teenTips;
      document.getElementById('timer-progress-ring').classList.remove('rest');
    } else {
      document.getElementById('player-status-badge').textContent = `REST & RECOVERY`;
      document.getElementById('player-status-badge').className = 'player-status-tag rest';
      document.getElementById('player-title').textContent = "Breathe & Shake It Out";
      document.getElementById('player-set-label').textContent = `Next: Set ${session.setIndex} of ${session.totalSets} (${exercise.name})`;

      session.totalDuration = 45;
      session.timeRemaining = session.totalDuration;

      document.getElementById('player-timer-digits').textContent = session.timeRemaining;
      document.getElementById('player-timer-sublabel').textContent = "REST TIME";
      document.getElementById('player-cue-header').textContent = "💡 Recovery Breathing";
      document.getElementById('player-cue-text').textContent = "Inhale deep through your nose, expand your belly, and let your shoulder blades relax.";
      document.getElementById('timer-progress-ring').classList.add('rest');
    }

    this.updateCircleProgress();
    this.startTimerInterval();
  }

  startTimerInterval() {
    clearInterval(this.workoutSession.timerInterval);
    const session = this.workoutSession;

    session.timerInterval = setInterval(() => {
      if (session.isPaused) return;

      session.timeRemaining--;

      if (session.timeRemaining <= 3 && session.timeRemaining > 0) {
        this.playSound('beep');
      }

      document.getElementById('player-timer-digits').textContent = session.timeRemaining;
      this.updateCircleProgress();

      if (session.timeRemaining <= 0) {
        clearInterval(session.timerInterval);
        this.handleSetFinished();
      }
    }, 1000);
  }

  updateCircleProgress() {
    const session = this.workoutSession;
    const ring = document.getElementById('timer-progress-ring');
    const circumference = 2 * Math.PI * 90;
    const fraction = session.timeRemaining / session.totalDuration;
    const offset = circumference * (1 - fraction);
    ring.style.strokeDashoffset = offset;
  }

  handleSetFinished() {
    const session = this.workoutSession;

    if (!session.isResting) {
      if (session.setIndex < session.totalSets) {
        session.isResting = true;
        session.setIndex++;
        this.playSound('rest');
        this.setupCurrentExerciseInPlayer();
      } else {
        if (session.exerciseIndex < session.dayPlan.exercises.length - 1) {
          session.exerciseIndex++;
          session.setIndex = 1;
          session.totalSets = session.dayPlan.exercises[session.exerciseIndex].sets || 3;
          session.isResting = true;
          this.playSound('rest');
          this.setupCurrentExerciseInPlayer();
        } else {
          this.finishWorkout();
        }
      }
    } else {
      session.isResting = false;
      this.playSound('go');
      this.setupCurrentExerciseInPlayer();
    }
  }

  toggleWorkoutPause() {
    const session = this.workoutSession;
    session.isPaused = !session.isPaused;
    const toggleBtn = document.getElementById('btn-player-toggle');
    if (session.isPaused) {
      toggleBtn.textContent = "▶️ Resume";
      toggleBtn.classList.remove('btn-primary');
      toggleBtn.classList.add('btn-secondary');
    } else {
      toggleBtn.textContent = "⏸️ Pause";
      toggleBtn.classList.remove('btn-secondary');
      toggleBtn.classList.add('btn-primary');
    }
  }

  skipToNextSet() {
    clearInterval(this.workoutSession.timerInterval);
    this.handleSetFinished();
  }

  goToPrevSet() {
    const session = this.workoutSession;
    clearInterval(session.timerInterval);
    if (session.setIndex > 1) {
      session.setIndex--;
      session.isResting = false;
    } else if (session.exerciseIndex > 0) {
      session.exerciseIndex--;
      session.setIndex = 1;
      session.isResting = false;
    }
    this.setupCurrentExerciseInPlayer();
  }

  finishWorkout() {
    clearInterval(this.workoutSession.timerInterval);
    document.getElementById('workout-modal').classList.remove('active');

    const todayDate = this.getTodayDateString();
    this.profile.completedWorkouts[todayDate] = {
      dayNumber: this.workoutSession.dayNumber,
      completedAt: new Date().toISOString()
    };

    if (!this.profile.habits[todayDate]) {
      this.profile.habits[todayDate] = {};
    }
    this.profile.habits[todayDate]["habit_workout"] = true;

    this.profile.xp += 50;
    this.calculateStreak();
    this.saveState();

    this.playSound('fanfare');
    this.showToast(`🎉 WORKOUT CRUSHED! +50 XP for ${this.profile.name}!`, "🏆");

    this.renderDaySelector();
    this.renderCurrentDayWorkout();
    this.renderHabits();
    this.renderProgressPlan();
    this.updateHeaderStats();
  }

  stopWorkout() {
    if (confirm("Are you sure you want to exit this workout session?")) {
      clearInterval(this.workoutSession.timerInterval);
      this.workoutSession.active = false;
      document.getElementById('workout-modal').classList.remove('active');
    }
  }

  // ========================================================
  // HABIT TRACKER
  // ========================================================
  renderHabits() {
    const container = document.getElementById('habits-cards-container');
    if (!container) return;
    container.innerHTML = '';

    const todayDate = this.getTodayDateString();
    if (!this.profile.habits[todayDate]) {
      this.profile.habits[todayDate] = {};
    }
    const todayHabits = this.profile.habits[todayDate];

    let doneCount = 0;

    DAILY_HABIT_TEMPLATES.forEach(habit => {
      const isChecked = !!todayHabits[habit.id];
      if (isChecked) doneCount++;

      const card = document.createElement('div');
      card.className = `habit-card ${isChecked ? 'checked' : ''}`;
      card.innerHTML = `
        <div class="habit-card-left">
          <div class="habit-icon">${habit.icon}</div>
          <div>
            <div class="habit-title">${habit.title}</div>
            <div class="habit-desc">${habit.desc}</div>
          </div>
        </div>
        <div class="habit-checkbox">${isChecked ? '✓' : ''}</div>
      `;

      card.addEventListener('click', () => {
        const newState = !todayHabits[habit.id];
        todayHabits[habit.id] = newState;

        if (newState) {
          this.profile.xp += 10;
          this.playSound('go');
          this.showToast(`Completed: ${habit.title} (+10 XP)`, habit.icon);
        } else {
          this.profile.xp = Math.max(0, this.profile.xp - 10);
        }

        this.saveState();
        this.renderHabits();
        this.renderProgressPlan();
        this.updateHeaderStats();
      });

      container.appendChild(card);
    });

    document.getElementById('habit-score-label').textContent = `${doneCount}/${DAILY_HABIT_TEMPLATES.length} Done`;
    document.getElementById('today-date-display').textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
  }

  // ========================================================
  // VISUAL PROGRESS PLAN
  // ========================================================
  renderProgressPlan() {
    const p = this.profile;
    const workoutsTotal = Object.keys(p.completedWorkouts || {}).length;

    document.getElementById('prog-streak-val').textContent = p.streak;
    document.getElementById('prog-completed-workouts').textContent = workoutsTotal;
    document.getElementById('prog-max-pullups').textContent = `${p.prs.pullups} reps`;
    document.getElementById('prog-max-plank').textContent = `${p.prs.plank}s`;
    document.getElementById('prog-max-hang').textContent = `${p.prs.hang}s`;

    const athleteLabel = document.getElementById('rank-athlete-name-label');
    if (athleteLabel) athleteLabel.textContent = `${p.name} (${p.age}yo)`;

    const xp = p.xp || 0;
    const currentRank = this.getCurrentRank();
    const nextRank = this.getNextRank();

    const progressBar = document.getElementById('rank-progress-bar');
    const curXpLabel = document.getElementById('rank-current-xp-label');
    const nextXpLabel = document.getElementById('rank-next-xp-label');

    curXpLabel.textContent = `Current: ${xp} XP (${currentRank.title})`;

    if (nextRank) {
      const prevXp = currentRank.minXp;
      const targetSpan = nextRank.minXp - prevXp;
      const progressInLevel = Math.max(0, Math.min(100, Math.round(((xp - prevXp) / targetSpan) * 100)));
      progressBar.style.width = `${progressInLevel}%`;
      nextXpLabel.textContent = `Next: ${nextRank.title} (${nextRank.minXp} XP)`;
    } else {
      progressBar.style.width = "100%";
      nextXpLabel.textContent = "MAX RANK REACHED!";
    }

    const rankContainer = document.getElementById('rank-steps-container');
    rankContainer.innerHTML = '';

    PROGRESSION_RANKS.forEach(r => {
      const isUnlocked = xp >= r.minXp;
      const isCurrent = r.level === currentRank.level;

      const step = document.createElement('div');
      step.className = `rank-step ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}`;
      step.innerHTML = `
        <div class="rank-badge-icon">${r.badge}</div>
        <div class="rank-step-info">
          <div class="rank-step-name">
            Level ${r.level}: ${r.title}
            ${isCurrent ? '<span class="badge badge-green">ACTIVE RANK</span>' : ''}
          </div>
          <div class="rank-step-desc">${r.desc}</div>
        </div>
        <div class="rank-xp-req">${r.minXp} XP</div>
      `;
      rankContainer.appendChild(step);
    });

    // Populate current PR input placeholders
    document.getElementById('input-pr-pullups').placeholder = `Current: ${p.prs.pullups}`;
    document.getElementById('input-pr-plank').placeholder = `Current: ${p.prs.plank}s`;
    document.getElementById('input-pr-hang').placeholder = `Current: ${p.prs.hang}s`;
  }

  // ========================================================
  // INTERACTIVE ANATOMICAL MUSCLE MAP
  // ========================================================
  highlightMuscleAndFilter(muscleKey) {
    const paths = document.querySelectorAll('.muscle-path');
    paths.forEach(p => p.classList.remove('highlighted'));

    if (muscleKey) {
      const matchingPaths = document.querySelectorAll(`.muscle-path[data-muscle="${muscleKey}"]`);
      matchingPaths.forEach(p => p.classList.add('highlighted'));
      this.renderAnatomyExerciseList(muscleKey);
    } else {
      this.renderAnatomyExerciseList(null);
    }
  }

  renderAnatomyExerciseList(filterMuscle = null) {
    const container = document.getElementById('anatomy-exercise-list');
    if (!container) return;
    container.innerHTML = '';

    const titleElem = document.getElementById('anatomy-filter-title');
    const allExercises = Object.values(EXERCISES_DATABASE);
    let filtered = allExercises;

    if (filterMuscle) {
      titleElem.textContent = `Exercises Targeting: ${filterMuscle.replace('_', ' ').toUpperCase()}`;
      filtered = allExercises.filter(ex => {
        return ex.targetMuscles.highlight && ex.targetMuscles.highlight.includes(filterMuscle);
      });
    } else {
      titleElem.textContent = `All Calisthenics Exercises (${allExercises.length})`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `<div style="color: var(--text-secondary); padding: 20px;">No specific exercises found for this muscle in this plan.</div>`;
      return;
    }

    filtered.forEach((ex, idx) => {
      const card = document.createElement('div');
      card.className = 'exercise-card';
      card.innerHTML = `
        <div class="exercise-card-header">
          <div class="exercise-title-group">
            <div class="exercise-number">${idx + 1}</div>
            <div>
              <div class="exercise-name">${ex.name}</div>
              <div class="exercise-prescribed">${ex.defaultReps} • ${ex.equipment}</div>
            </div>
          </div>
          <span class="badge badge-green">${ex.difficulty}</span>
        </div>

        <div class="muscles-box">
          <div class="muscle-tags-row">
            ${ex.targetMuscles.primary.map(m => `<span class="muscle-tag primary">${m}</span>`).join('')}
            ${ex.targetMuscles.secondary.map(m => `<span class="muscle-tag secondary">${m}</span>`).join('')}
          </div>
        </div>

        <div class="exercise-breakdown-grid">
          <div class="breakdown-box">
            <div class="breakdown-title why">Why Do It</div>
            <div class="breakdown-body">${ex.why}</div>
          </div>
          <div class="breakdown-box">
            <div class="breakdown-title how">Key Technique</div>
            <div class="breakdown-body">
              <ol class="steps-list">
                ${ex.how.slice(0, 3).map(s => `<li>${s}</li>`).join('')}
              </ol>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.titanApp = new TitanCoreApp();
});
