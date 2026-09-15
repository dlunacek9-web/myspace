document.addEventListener('DOMContentLoaded', () => {
  // 1. Add to Friends Button Interaction
  const addFriendBtn = document.getElementById('add-friend-btn');
  if (addFriendBtn) {
    addFriendBtn.addEventListener('click', () => {
      if (!addFriendBtn.classList.contains('pending')) {
        addFriendBtn.classList.add('pending');
        addFriendBtn.innerHTML = '<span class="icon">⏳</span> Žádost o přátelství čeká';
      } else {
        addFriendBtn.classList.remove('pending');
        addFriendBtn.innerHTML = '<span class="icon">➕</span> Přidat do přátel';
      }
    });
  }

  // Add to Favorites Button Interaction
  const addFavoriteBtn = document.getElementById('add-favorite-btn');
  if (addFavoriteBtn) {
    addFavoriteBtn.addEventListener('click', () => {
      if (!addFavoriteBtn.classList.contains('pending')) {
        addFavoriteBtn.classList.add('pending');
        addFavoriteBtn.innerHTML = '<span class="icon">⭐</span> Přidáno do oblíbených';
      } else {
        addFavoriteBtn.classList.remove('pending');
        addFavoriteBtn.innerHTML = '<span class="icon">⭐</span> Přidat do oblíbených';
      }
    });
  }

  // 2. View All Comments Toggle
  const toggleCommentsBtn = document.getElementById('toggle-comments-btn');
  const hiddenComments = document.querySelectorAll('.hidden-comment');
  const displayedCountEl = document.getElementById('displayed-comments-count');

  let isExpanded = false;

  if (toggleCommentsBtn) {
    toggleCommentsBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;

      hiddenComments.forEach((comment) => {
        comment.style.display = isExpanded ? 'flex' : 'none';
      });

      if (isExpanded) {
        toggleCommentsBtn.textContent = 'Skrýt zbývající komentáře';
        if (displayedCountEl) displayedCountEl.textContent = '6';
      } else {
        toggleCommentsBtn.textContent = 'Zobrazit všechny komentáře (6)';
        if (displayedCountEl) displayedCountEl.textContent = '3';
      }
    });
  }

  // 4. Dollar Particle Trail on Mouse Move
  let lastParticleTime = 0;
  const particleThrottleMs = 35; // Spawn frequency throttle

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastParticleTime < particleThrottleMs) return;
    lastParticleTime = now;

    createDollarParticle(e.clientX, e.clientY);
  });

  function createDollarParticle(x, y) {
    const particle = document.createElement('span');
    particle.className = 'dollar-particle';
    particle.textContent = '$';

    // Randomize initial slight offset and float direction
    const offsetX = (Math.random() - 0.5) * 16;
    const offsetY = (Math.random() - 0.5) * 16;
    const driftX = (Math.random() - 0.5) * 30;
    const driftY = -15 - Math.random() * 25; // Drift upwards

    particle.style.left = `${x + offsetX}px`;
    particle.style.top = `${y + offsetY}px`;
    particle.style.setProperty('--drift-x', `${driftX}px`);
    particle.style.setProperty('--drift-y', `${driftY}px`);

    // Randomize slight size variation
    const scale = 0.7 + Math.random() * 0.5;
    particle.style.fontSize = `${11 * scale}px`;

    document.body.appendChild(particle);

    // Remove element after burning animation finishes
    particle.addEventListener('animationend', () => {
      particle.remove();
    });

    // Fallback cleanup
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, 1000);
  }

  // 3. Simulated Music Player Controls
  const playPauseBtn = document.getElementById('play-pause-btn');
  const progressBar = document.getElementById('progress-bar');
  let isPlaying = false;
  let progressInterval = null;
  let progressWidth = 70;

  if (playPauseBtn && progressBar) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;

      if (isPlaying) {
        playPauseBtn.textContent = '⏸ PAUZA';
        playPauseBtn.style.backgroundColor = '#d97706';
        playPauseBtn.style.borderColor = '#fbbf24';

        progressInterval = setInterval(() => {
          progressWidth += 0.5;
          if (progressWidth > 100) progressWidth = 0;
          progressBar.style.width = `${progressWidth}%`;
        }, 300);
      } else {
        playPauseBtn.textContent = '▶ HRÁT';
        playPauseBtn.style.backgroundColor = '#059669';
        playPauseBtn.style.borderColor = '#10b981';
        if (progressInterval) {
          clearInterval(progressInterval);
        }
      }
    });
  }
});
