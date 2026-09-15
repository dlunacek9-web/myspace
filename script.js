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
