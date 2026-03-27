const body = document.body;
const themeBtn = document.getElementById('theme-toggle-btn');
const kidsModeBtn = document.getElementById('kids-mode-btn');
const vizToggleBtn = document.getElementById('viz-toggle-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const visualizerCanvas = document.getElementById('visualizer-canvas');
const canvasCtx = visualizerCanvas ? visualizerCanvas.getContext('2d') : null;
const mainApp = document.getElementById('main-app');
const playerView = document.getElementById('player-view');
const miniPlayer = document.getElementById('mini-player');
const audio = document.getElementById('main-audio');
const carouselPicks = document.getElementById('carousel-picks');
const carouselLatest = document.getElementById('carousel-latest');
const backBtn = document.getElementById('back-btn');
const expandBtn = document.getElementById('mp-expand-btn');

let currentSongIndex = -1;
let isKidsMode = localStorage.getItem('cawi-kids-mode') === 'true';
let isVizEnabled = localStorage.getItem('cawi-viz') === 'true';
let audioContext;
let analyser;
let source;
let vizInitialized = false;

if (localStorage.getItem('cawi-theme') === 'light') {
    body.classList.add('light-theme');
    if (themeBtn) themeBtn.innerText = "Switch to Dark Mode";
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        localStorage.setItem('cawi-theme', isLight ? 'light' : 'dark');
        themeBtn.innerText = isLight ? "Switch to Dark Mode" : "Switch to Light Mode";
    });
}

function updateKidsModeUI() {
    if (kidsModeBtn) {
        kidsModeBtn.innerText = isKidsMode ? "Turn Off" : "Turn On";
        kidsModeBtn.style.background = isKidsMode ? "rgba(108, 92, 231, 0.5)" : "";
    }
}
updateKidsModeUI();

if (kidsModeBtn) {
    kidsModeBtn.addEventListener('click', () => {
        isKidsMode = !isKidsMode;
        localStorage.setItem('cawi-kids-mode', isKidsMode);
        updateKidsModeUI();
        if (currentSongIndex !== -1) renderLyrics(songsData[currentSongIndex]);
    });
}

function updateVizUI() {
    if (vizToggleBtn) {
        vizToggleBtn.innerText = isVizEnabled ? "Turn Off" : "Turn On";
        vizToggleBtn.style.background = isVizEnabled ? "rgba(108, 92, 231, 0.5)" : "";
    }
    if (visualizerCanvas) {
        visualizerCanvas.style.display = isVizEnabled ? "block" : "none";
    }
}
updateVizUI();

if (vizToggleBtn) {
    vizToggleBtn.addEventListener('click', () => {
        isVizEnabled = !isVizEnabled;
        localStorage.setItem('cawi-viz', isVizEnabled);
        updateVizUI();
        if (isVizEnabled && !audio.paused) initVisualizer();
    });
}

if (settingsBtn) settingsBtn.addEventListener('click', () => settingsModal.style.display = 'flex');
if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', () => settingsModal.style.display = 'none');

function renderCards(container, songsArray) {
    if (!container || typeof songsArray === 'undefined') return;
    songsArray.forEach(song => {
        const card = document.createElement('div');
        card.className = 'song-card';
        const explicitHtml = song.explicit ? '<span class="explicit-badge">E</span>' : '';
        card.innerHTML = `
            <div class="cover">
                <img src="${song.cover}" alt="Cover" onerror="this.src='https://via.placeholder.com/200/2d3436/ffffff?text=No+Cover'">
                <div class="play-overlay"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
            </div>
            <h4>${song.title} ${explicitHtml}</h4>
            <p>${song.artist}</p>
        `;
        card.addEventListener('click', () => openPlayerView(song));
        container.appendChild(card);
    });
}

if (typeof songsData !== 'undefined') {
    renderCards(carouselPicks, songsData);
    const latestSongs = [...songsData].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    renderCards(carouselLatest, latestSongs);
}

function setupScroll(btnId, carouselId, direction) {
    const btn = document.getElementById(btnId);
    const car = document.getElementById(carouselId);
    if(btn && car) btn.addEventListener('click', () => car.scrollBy({ left: direction * 240, behavior: 'smooth' }));
}
setupScroll('scroll-right-1', 'carousel-picks', 1);
setupScroll('scroll-left-1', 'carousel-picks', -1);
setupScroll('scroll-right-2', 'carousel-latest', 1);
setupScroll('scroll-left-2', 'carousel-latest', -1);

gsap.set("#flying-logo", { top: "50%", left: "50%", xPercent: -50, yPercent: -50 });
gsap.set("#main-app", { opacity: 0, display: "block" });
gsap.set("#music-badge", { x: -20, opacity: 0 });

const tl = gsap.timeline();
tl.fromTo("#logo-text", { opacity: 0, scale: 0.9, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" });
tl.to("#music-badge", { x: 0, opacity: 1, duration: 1.2, ease: "expo.out" }, "-=0.5");
tl.to({}, { duration: 1 });
tl.to("#intro-bg", { opacity: 0, duration: 1, ease: "power2.inOut", onComplete: () => {
    const bg = document.getElementById('intro-bg');
    if (bg) bg.style.display = "none";
}}, "flight");
tl.to("#flying-logo", { top: "30px", left: "40px", xPercent: 0, yPercent: 0, scale: 0.35, transformOrigin: "left top", duration: 1.5, ease: "expo.inOut" }, "flight");
gsap.set("#flying-logo", { pointerEvents: "none", delay: 3 });
tl.to(".top-right-btn", { opacity: 1, pointerEvents: "auto", duration: 1 }, "-=0.8");
tl.to("#main-app", { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.8");
tl.fromTo(".welcome-section", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5");
tl.fromTo(".playlist-section", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out" }, "-=0.6");

function renderLyrics(song) {
    const lyricsBox = document.getElementById('pv-lyrics-box');
    if (!lyricsBox) return;
    lyricsBox.innerHTML = '';
    if (song.lyrics === false || !song.lyrics) {
        lyricsBox.innerHTML = '<div class="no-lyrics">No lyrics available.</div>';
    } else {
        song.lyrics.forEach((l, i) => {
            const p = document.createElement('p');
            p.className = 'lyric-line';
            p.id = `l-${i}`;
            p.innerText = (isKidsMode && l.kidsText) ? l.kidsText : l.text;
            lyricsBox.appendChild(p);
        });
    }
}

function openPlayerView(song) {
    const newIndex = songsData.findIndex(s => s.id === song.id);
    const isPlayerOpen = playerView.style.display === 'flex';

    const updateContent = () => {
        currentSongIndex = newIndex;
        audio.src = song.src;
        audio.volume = 0.5;
        try { audio.play(); } catch(e) {}

        document.getElementById('pv-cover').src = song.cover;
        const explicitHtml = song.explicit ? '<span class="explicit-badge">E</span>' : '';
        document.getElementById('pv-title').innerHTML = song.title + explicitHtml;
        document.getElementById('pv-artist').innerText = song.artist;
        
        const pvAlbum = document.getElementById('pv-album');
        if(pvAlbum) pvAlbum.innerText = song.album || "Unknown Album";
        const pvDate = document.getElementById('pv-date');
        if(pvDate) pvDate.innerText = song.releaseDate || "Unknown Date";

        const infoEl = document.getElementById('pv-artist-info');
        if (infoEl) infoEl.innerText = song.about || "No additional info.";
        
        const aboutAvatar = document.getElementById('pv-about-avatar');
        const aboutArtistName = document.getElementById('pv-about-artist-name');
        const aboutText = document.getElementById('pv-about-text');
        if (aboutAvatar) aboutAvatar.src = song.cover;
        if (aboutArtistName) aboutArtistName.innerText = song.artist;
        if (aboutText) aboutText.innerText = song.about || "Этот исполнитель пока не добавил описание к своему творчеству.";

        document.getElementById('mp-cover').src = song.cover;
        document.getElementById('mp-title').innerHTML = song.title + explicitHtml;
        document.getElementById('mp-artist').innerText = song.artist;

        const textAuthorEl = document.getElementById('pv-text-author');
        if (textAuthorEl) {
            if (song.textAuthor) {
                textAuthorEl.innerText = `Text authors: ${song.textAuthor}`;
                textAuthorEl.style.display = 'block';
            } else {
                textAuthorEl.style.display = 'none';
            }
        }

        renderLyrics(song);

        const nextSong = songsData[(currentSongIndex + 1) % songsData.length];
        if (nextSong) {
            const nxtCov = document.getElementById('pv-next-cover');
            const nxtTit = document.getElementById('pv-next-title');
            const nxtArt = document.getElementById('pv-next-artist');
            if(nxtCov) nxtCov.src = nextSong.cover;
            if(nxtTit) nxtTit.innerText = nextSong.title;
            if(nxtArt) nxtArt.innerText = nextSong.artist;
        }

        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: song.title,
                artist: song.artist,
                album: song.album || "CaWiWorld Music",
                artwork: [
                    { src: song.cover, sizes: '96x96', type: 'image/png' },
                    { src: song.cover, sizes: '512x512', type: 'image/png' }
                ]
            });
            navigator.mediaSession.setActionHandler('play', () => audio.play());
            navigator.mediaSession.setActionHandler('pause', () => audio.pause());
            navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
            navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
        }
    };

    if (isPlayerOpen) {
        gsap.to('#pv-content-area', { opacity: 0, duration: 0.3, onComplete: () => {
            updateContent();
            gsap.to('#pv-content-area', { opacity: 1, duration: 0.3 });
        }});
    } else {
        updateContent();
        if (miniPlayer) miniPlayer.classList.remove('active');
        gsap.to(mainApp, { scale: 0.9, opacity: 0, duration: 0.5, onComplete: () => {
            mainApp.style.display = 'none';
            playerView.style.display = 'flex';
            gsap.fromTo(playerView, { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 });
        }});
    }
}

if (backBtn) {
    backBtn.addEventListener('click', () => {
        gsap.to(playerView, { scale: 1.05, opacity: 0, duration: 0.4, onComplete: () => {
            playerView.style.display = 'none';
            mainApp.style.display = 'block';
            gsap.to(mainApp, { scale: 1, opacity: 1, duration: 0.5 });
            if (currentSongIndex !== -1 && miniPlayer) {
                miniPlayer.classList.add('active');
            }
        }});
    });
}

if (expandBtn) {
    expandBtn.addEventListener('click', () => {
        if (miniPlayer) miniPlayer.classList.remove('active');
        gsap.to(mainApp, { scale: 0.9, opacity: 0, duration: 0.5, onComplete: () => {
            mainApp.style.display = 'none';
            playerView.style.display = 'flex';
            gsap.fromTo(playerView, { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 });
        }});
    });
}

function formatTime(s) {
    if (isNaN(s)) return "00:00";
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    
    document.getElementById('pv-seeker').value = currentTime;
    document.getElementById('pv-seeker').max = duration;
    document.getElementById('pv-current-time').innerText = formatTime(currentTime);
    document.getElementById('pv-duration').innerText = formatTime(duration);

    document.getElementById('mp-seeker').value = currentTime;
    document.getElementById('mp-seeker').max = duration;
    document.getElementById('mp-current-time').innerText = formatTime(currentTime);
    document.getElementById('mp-duration').innerText = formatTime(duration);

    const song = songsData[currentSongIndex];
    if (song && song.lyrics) {
        let activeIdx = -1;
        for (let i = 0; i < song.lyrics.length; i++) {
            if (currentTime >= song.lyrics[i].time) activeIdx = i;
            else break;
        }
        if (activeIdx !== -1) {
            const activeEl = document.getElementById(`l-${activeIdx}`);
            if (activeEl && !activeEl.classList.contains('active')) {
                document.querySelectorAll('.lyric-line.active').forEach(el => el.classList.remove('active'));
                activeEl.classList.add('active');
                const box = document.getElementById('pv-lyrics-box');
                if (box) {
                    const scrollTarget = activeEl.offsetTop - (box.clientHeight / 2) + (activeEl.clientHeight / 2);
                    gsap.to(box, { scrollTop: scrollTarget, duration: 0.8, ease: "power2.out" });
                }
            }
        }
    }
});

document.getElementById('pv-seeker').addEventListener('input', (e) => audio.currentTime = e.target.value);
document.getElementById('mp-seeker').addEventListener('input', (e) => audio.currentTime = e.target.value);

function togglePlay() {
    if (audio.paused) audio.play();
    else audio.pause();
}

document.getElementById('pv-play-pause-btn').addEventListener('click', togglePlay);
document.getElementById('mp-play-pause-btn').addEventListener('click', togglePlay);

audio.addEventListener('play', () => {
    document.getElementById('pv-icon-play').style.display = 'none';
    document.getElementById('pv-icon-pause').style.display = 'block';
    document.getElementById('mp-icon-play').style.display = 'none';
    document.getElementById('mp-icon-pause').style.display = 'block';
    initVisualizer();
});

audio.addEventListener('pause', () => {
    document.getElementById('pv-icon-play').style.display = 'block';
    document.getElementById('pv-icon-pause').style.display = 'none';
    document.getElementById('mp-icon-play').style.display = 'block';
    document.getElementById('mp-icon-pause').style.display = 'none';
});

function nextTrack() {
    if (currentSongIndex === -1) return;
    openPlayerView(songsData[(currentSongIndex + 1) % songsData.length]);
}

function prevTrack() {
    if (currentSongIndex === -1) return;
    openPlayerView(songsData[(currentSongIndex - 1 + songsData.length) % songsData.length]);
}

document.getElementById('pv-nextBtn').addEventListener('click', nextTrack);
document.getElementById('pv-prevBtn').addEventListener('click', prevTrack);
document.getElementById('mp-nextBtn').addEventListener('click', nextTrack);
document.getElementById('mp-prevBtn').addEventListener('click', prevTrack);

const panelNext = document.getElementById('pv-next-track');
if (panelNext) panelNext.addEventListener('click', nextTrack);

audio.addEventListener('ended', nextTrack);

function initVisualizer() {
    if (!isVizEnabled || !visualizerCanvas) return;
    if (!vizInitialized) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 256;
        vizInitialized = true;
    }
    if (audioContext.state === 'suspended') audioContext.resume();
    drawVisualizer();
}

function drawVisualizer() {
    if (!isVizEnabled || audio.paused) return;
    requestAnimationFrame(drawVisualizer);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
    const barWidth = (visualizerCanvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2.5;
        canvasCtx.fillStyle = `rgb(${barHeight + 100}, 92, 231)`;
        canvasCtx.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 2;
    }
}