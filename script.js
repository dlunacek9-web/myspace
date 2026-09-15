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

  // ==========================================================================
  // 5. Short Form Feed (YouTube Shorts / Instagram Reels)
  // ==========================================================================

  /**
   * List of 15 YouTube Shorts links & details.
   * To update or replace videos, paste your 15 YouTube Shorts URLs or IDs in the `url` field below.
   */
  const YOUTUBE_SHORTS_DATA = [
    {
      url: 'https://www.youtube.com/shorts/dQw4w9WgXcQ',
      caption: 'Prodej mi tohle pero! 🖊️ Nikdy se nevzdávej v obchodu! #wolfofwallstreet #shorts',
      likes: 15400,
      isLiked: false,
      sound: 'Jordan Belfort - Stratton Oakmont Sales Pitch',
      comments: [
        { user: 'Donnie Azoff', text: 'Napiš svoje jméno na ubrousek! 😂' },
        { user: 'Brad Bodnick', text: 'Poptávka a nabídka, příteli!' },
        { user: 'Stratton Broker', text: 'Legendární scéna, zvedám telefon!' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/3JZ_D3ELwOQ',
      caption: 'JÁ ODSUD K***A NEODCHÁZÍM! 🎤🔥 Show nekončí! #wolfofwallstreet #motivation',
      likes: 28900,
      isLiked: false,
      sound: 'Wall Street Speech Anthem - Remastered',
      comments: [
        { user: 'Robbie Feinberg', text: 'HUSA KŮŽE POKAŽDÉ! 🚀' },
        { user: 'Alden Kupferberg', text: 'Nikdy neodcházíme!' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/L_LUpnjgPso',
      caption: 'Oběd s Markem Hannou v restauraci Windows on the World 🍸 #wallstreet #advice',
      likes: 9800,
      isLiked: false,
      sound: 'Mark Hanna - Humming & Chest Thump Theme',
      comments: [
        { user: 'Mark Hanna', text: 'Mm-mm-mm-hmmm! Udělej to dvakrát denně!' },
        { user: 'Jordan Belfort', text: 'Nejlepší rady pro začátečníka!' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/fJ9rUzIMcZQ',
      caption: 'Steve Madden IPO den! 👟 Miliony prodané během 3 minut! #stevemadden #ipo',
      likes: 12100,
      isLiked: false,
      sound: 'Steve Madden - Shoes & Stocks Beat',
      comments: [
        { user: 'Steve Madden', text: 'Díky za skvělý obchod Jordane!' },
        { user: 'Donnie Azoff', text: 'Bílé zuby a Steve Madden!' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/kJQP7kiw5Fk',
      caption: 'Bílý Ferrari Testarossa v akci 🏎️💨 #ferrari #luxury #wallstreet',
      likes: 34200,
      isLiked: false,
      sound: '90s Eurodance Party - Miami Vice Vibes',
      comments: [
        { user: 'Naomi Lapaglia', text: 'Jordane, jeď opatrně!' },
        { user: 'Donnie Azoff', text: 'Půjčíš mi klíče na víkend?' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/2Vv-BfVoq4g',
      caption: 'Pravidlo č. 1 na Wall Street: Udržuj klienty na kolotoči 🎡 #trading #stocks',
      likes: 7600,
      isLiked: false,
      sound: 'Wall Street Stock Ticker Beats',
      comments: [
        { user: 'Junior Broker', text: 'Zaznamenáno do zápisníku sir!' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/OPf0YbXqDm0',
      caption: 'Lemmon 714 Quaaludes vzpomínka 🍋 (Filmová parodie) #wolfofwallstreet #humor',
      likes: 41000,
      isLiked: false,
      sound: 'Cerebral Palsy Stage Sound Effect',
      comments: [
        { user: 'Donnie Azoff', text: 'To mělo zpoždění 15 let! 😅' },
        { user: 'Aunt Emma', text: 'Chlapci, buďte rozumní!' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/V-_O7nl0Ii0',
      caption: 'FBI navštěvuje jachtu Nadine v New Yorku 🚔🛥️ #fbi #agentdenham',
      likes: 18300,
      isLiked: false,
      sound: 'FBI Tension Drums - Soundtracks',
      comments: [
        { user: 'Agent Denham', text: 'Metro v New Yorku je v létě dost horké.' },
        { user: 'Jordan Belfort', text: 'Přejete si humra nebo šampaňské, agente?' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/e-ORhEE9VVg',
      caption: 'Peníze nevytváří jen lepší život, dělají z vás lepšího člověka! 💰 #money #mindset',
      likes: 22100,
      isLiked: false,
      sound: 'Stratton Oakmont Victory March',
      comments: [
        { user: 'Trader John', text: 'Pravdivější slova jsem neslyšel!' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/60ItHLz5WEA',
      caption: 'Švýcarský bankovní účet a Teta Emma 🇨🇭💼 #switzerland #geneva',
      likes: 11400,
      isLiked: false,
      sound: 'Swiss Alpine Chill Beats',
      comments: [
        { user: 'Aunt Emma', text: 'V Ženevě je vždy krásně!' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/ZbZSe6N_BXs',
      caption: 'Vrtulník v zahradě v Long Islandu 🚁 landing skills #helicopter #lifestyle',
      likes: 16700,
      isLiked: false,
      sound: 'Helicopter Rotor Bass Remix',
      comments: [
        { user: 'Kousavý Pes', text: 'Haf haf! Trávník zničen!' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/09R8_2nJtjg',
      caption: 'Pondělní ranní briefing ve Stratton Oakmont 📈 Zvedněte telefony!',
      likes: 25400,
      isLiked: false,
      sound: 'Stratton Oakmont - Dialing the Phone Beat',
      comments: [
        { user: 'Broker #1', text: 'Dnes prodám 10,000 akcií!' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/9bZkp7q19f0',
      caption: 'Párty na jachtě v Monaku 🍾🎉 #monaco #yachtlife',
      likes: 31000,
      isLiked: false,
      sound: 'Ca Plane Pour Moi - Plastic Bertrand',
      comments: [
        { user: 'Captain Ted', text: 'Kapitáne, vlny jsou vysoké!' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/J---aiyznGQ',
      caption: 'Šimpanz jako makléř na obchodním parketu 🐒📈 #90s #wallstreet',
      likes: 19800,
      isLiked: false,
      sound: 'Crazy Wall Street Office Party Track',
      comments: [
        { user: 'Donnie Azoff', text: 'Můj nejlepší kamarád!' }
      ]
    },
    {
      url: 'https://www.youtube.com/shorts/fJ9rUzIMcZQ',
      caption: 'Co je tvoje největší motivace? Být bohatý nebo chudý? 🔥 #jordanbelfort #speech',
      likes: 27500,
      isLiked: false,
      sound: 'The Wolf Motivation - Final Chapter',
      comments: [
        { user: 'Jordan Belfort', text: 'Vyberte si bohatství!' },
        { user: 'Fanoušek #100', text: 'Nejlepší profil na celém MySpace!' }
      ]
    }
  ];

  let currentReelIndex = 0;

  // DOM Elements for Reels Feed
  const reelIframe = document.getElementById('reel-iframe');
  const reelCaption = document.getElementById('reel-caption');
  const reelSoundName = document.getElementById('reel-sound-name');
  const reelLikesCount = document.getElementById('reel-likes-count');
  const reelCommentsCount = document.getElementById('reel-comments-count');
  const reelCurrentNum = document.getElementById('reel-current-num');
  const reelLikeBtn = document.getElementById('reel-like-btn');
  const reelCommentBtn = document.getElementById('reel-comment-btn');
  const reelShareBtn = document.getElementById('reel-share-btn');
  const reelUpBtn = document.getElementById('reel-up-btn');
  const reelDownBtn = document.getElementById('reel-down-btn');
  const reelToast = document.getElementById('reel-toast');
  const reelCommentsModal = document.getElementById('reel-comments-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalCommentsList = document.getElementById('modal-comments-list');
  const newReelCommentInput = document.getElementById('new-reel-comment-input');
  const sendReelCommentBtn = document.getElementById('send-reel-comment-btn');

  /**
   * Helper function to extract YouTube Video ID from standard YouTube Shorts URL, Watch URL, or short ID.
   */
  function extractYouTubeId(urlOrId) {
    if (!urlOrId) return 'dQw4w9WgXcQ'; // Fallback
    const str = urlOrId.trim();

    // Match Shorts URL: youtube.com/shorts/VIDEO_ID
    const shortsMatch = str.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

    // Match Standard Watch URL: youtube.com/watch?v=VIDEO_ID
    const watchMatch = str.match(/v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch && watchMatch[1]) return watchMatch[1];

    // Match Short URL: youtu.be/VIDEO_ID
    const shortUrlMatch = str.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortUrlMatch && shortUrlMatch[1]) return shortUrlMatch[1];

    // Match 11 char video ID direct
    if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
      return str;
    }

    return 'dQw4w9WgXcQ';
  }

  /**
   * Format number helper (e.g., 15400 -> "15.4k")
   */
  function formatNum(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  /**
   * Render active short video state in DOM
   */
  function renderReel(index) {
    if (!YOUTUBE_SHORTS_DATA || YOUTUBE_SHORTS_DATA.length === 0) return;

    // Wrap around index safely
    if (index < 0) index = YOUTUBE_SHORTS_DATA.length - 1;
    if (index >= YOUTUBE_SHORTS_DATA.length) index = 0;

    currentReelIndex = index;
    const item = YOUTUBE_SHORTS_DATA[currentReelIndex];

    const videoId = extractYouTubeId(item.url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`;

    if (reelIframe) {
      reelIframe.src = embedUrl;
    }

    if (reelCaption) reelCaption.textContent = item.caption;
    if (reelSoundName) reelSoundName.textContent = item.sound || 'Jordan Belfort - Wall Street Sound';
    if (reelLikesCount) reelLikesCount.textContent = formatNum(item.likes);
    if (reelCommentsCount) reelCommentsCount.textContent = formatNum(item.comments ? item.comments.length : 0);
    if (reelCurrentNum) reelCurrentNum.textContent = (currentReelIndex + 1).toString();

    // Toggle Like button visual active state
    if (reelLikeBtn) {
      if (item.isLiked) {
        reelLikeBtn.classList.add('liked');
      } else {
        reelLikeBtn.classList.remove('liked');
      }
    }
  }

  // Initial render of first Reel
  renderReel(0);

  // Up & Down Navigation Button Listeners
  if (reelUpBtn) {
    reelUpBtn.addEventListener('click', () => {
      renderReel(currentReelIndex - 1);
    });
  }

  if (reelDownBtn) {
    reelDownBtn.addEventListener('click', () => {
      renderReel(currentReelIndex + 1);
    });
  }

  // Like Button Click Handler
  if (reelLikeBtn) {
    reelLikeBtn.addEventListener('click', () => {
      const item = YOUTUBE_SHORTS_DATA[currentReelIndex];
      if (!item) return;

      item.isLiked = !item.isLiked;
      if (item.isLiked) {
        item.likes += 1;
      } else {
        item.likes -= 1;
      }

      renderReel(currentReelIndex);
    });
  }

  // Share Button Handler (Copy URL to clipboard & show Toast)
  if (reelShareBtn) {
    reelShareBtn.addEventListener('click', () => {
      const item = YOUTUBE_SHORTS_DATA[currentReelIndex];
      const videoUrl = item ? item.url : window.location.href;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(videoUrl).catch(() => {});
      }

      showToast('Odkaz na video byl zkopírován do schránky! 📋');
    });
  }

  function showToast(msg) {
    if (!reelToast) return;
    reelToast.textContent = msg;
    reelToast.classList.add('show');
    setTimeout(() => {
      reelToast.classList.remove('show');
    }, 2500);
  }

  // Comments Modal Render & Handlers
  function renderModalComments() {
    if (!modalCommentsList) return;
    const item = YOUTUBE_SHORTS_DATA[currentReelIndex];
    modalCommentsList.innerHTML = '';

    if (!item.comments || item.comments.length === 0) {
      modalCommentsList.innerHTML = '<div class="modal-comment-item"><span class="modal-comment-text">Zatím žádné komentáře. Budeš první!</span></div>';
      return;
    }

    item.comments.forEach(c => {
      const div = document.createElement('div');
      div.className = 'modal-comment-item';
      div.innerHTML = `
        <div class="modal-comment-user">${escapeHtml(c.user)}</div>
        <div class="modal-comment-text">${escapeHtml(c.text)}</div>
      `;
      modalCommentsList.appendChild(div);
    });

    modalCommentsList.scrollTop = modalCommentsList.scrollHeight;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  if (reelCommentBtn) {
    reelCommentBtn.addEventListener('click', () => {
      renderModalComments();
      if (reelCommentsModal) reelCommentsModal.classList.add('active');
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (reelCommentsModal) reelCommentsModal.classList.remove('active');
    });
  }

  if (reelCommentsModal) {
    reelCommentsModal.addEventListener('click', (e) => {
      if (e.target === reelCommentsModal) {
        reelCommentsModal.classList.remove('active');
      }
    });
  }

  function submitNewComment() {
    if (!newReelCommentInput) return;
    const text = newReelCommentInput.value.trim();
    if (!text) return;

    const item = YOUTUBE_SHORTS_DATA[currentReelIndex];
    if (!item.comments) item.comments = [];

    item.comments.push({
      user: 'Ty (MySpace Makléř)',
      text: text
    });

    newReelCommentInput.value = '';
    renderModalComments();
    if (reelCommentsCount) reelCommentsCount.textContent = formatNum(item.comments.length);
  }

  if (sendReelCommentBtn) {
    sendReelCommentBtn.addEventListener('click', submitNewComment);
  }

  if (newReelCommentInput) {
    newReelCommentInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        submitNewComment();
      }
    });
  }

  // Mouse wheel scrolling on reel frame to switch videos
  const reelStage = document.querySelector('.reel-stage');
  if (reelStage) {
    let wheelCooldown = false;
    reelStage.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (wheelCooldown) return;
      wheelCooldown = true;

      if (e.deltaY > 0) {
        renderReel(currentReelIndex + 1);
      } else if (e.deltaY < 0) {
        renderReel(currentReelIndex - 1);
      }

      setTimeout(() => {
        wheelCooldown = false;
      }, 500);
    }, { passive: false });
  }
});
