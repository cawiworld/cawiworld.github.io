const trigger = document.getElementById('click-trigger');
const introStage = document.getElementById('intro-stage');
const mainSite = document.getElementById('main-site');
const audio = document.getElementById('audio');
const lyricsBox = document.getElementById('lyrics-box');
const progressBar = document.getElementById('progress-bar');
const playerCard = document.querySelector('.music-player');

const playlist = [
    { 
        title: "виски с молоком", 
        artist: "снялцепи", 
        img: "1.png", 
        src: "1.mp3",
        lyrics: [
            { time: 0, text: "(музыка)" },
            { time: 1.4, text: "я лью пиздатый виски" },
            { time: 3.1, text: "с белым молокооом!" },
            { time: 5.6, text: "она не знает меня" },
            { time: 7.3, text: "что было потом (она не знает)" },
            { time: 9.7, text: "ей нужен большой дядя" },
            { time: 11.2, text: "с большим кошелькооом!" },
            { time: 13.7, text: "таблетки дали о се знать" },
            { time: 15.8, text: "только в одном (только в одном)" },
            { time: 17.8, text: "и я тупой" },
            { time: 18.9, text: "она думает я гандон" },
            { time: 21.9, text: "мол, потому-что я пью виски с молоком" },
            { time: 26.0, text: "весь преппарат в тебе" },
            { time: 27.5, text: "и ты лежишь под мостом" },
            { time: 30.0, text: "прости, малыш, я не хотел быть слабаком" },
            { time: 33.1, text: "щас буду говорить типа пьяный" },
            { time: 35.2, text: "бездельник, мои руки в карманы" },
            { time: 37.5, text: "слезы лечат только заны" },
            { time: 39.0, text: "смотри на мя, залижи мои раныы" },
            { time: 41.3, text: "щас буду говорить типа пьяный" },
            { time: 43.5, text: "бездельник, мои руки в карманы" },
            { time: 45.7, text: "слезы лечат только заны" },
            { time: 47.1, text: "смотри на мя, залижи мои раныы" },
            { time: 55.6, text: "смотри на мя, залижи мои раныы!" }
        ]
    },
    { 
        title: "пісня про ромашку", 
        artist: "хейтспіч", 
        img: "2.png", 
        src: "2.mp3",
        lyrics: [
            { time: 4.6, text: "Вітер в полі хитає квіти" },
            { time: 8.3, text: "Хто ці уйобки, що вчать мене жити?" },
            { time: 11.8, text: "Над полем в небі пролітає пташка" },
            { time: 15.3, text: "Мені скаже як жити тендітна ромашка" },
            { time: 18.8, text: "Ро-ма-шка!" },
            { time: 22.5, text: "Ро-ма-шка!" },
            { time: 33.1, text: "Розумні люди, все знають люди" },
            { time: 36.6, text: "Інтелігенти в курсі, що нам робити" },
            { time: 40.2, text: "В завалах копаються тільки дурні" },
            { time: 43.7, text: "З рушницями в полі вчорашні діти" },
            { time: 47.3, text: "Очі не хочуть, неначе осліплені" },
            { time: 50.8, text: "Буває заплакати навіть не вийде" },
            { time: 54.4, text: "Дослухайте, якщо вам не буде тяжко" },
            { time: 57.9, text: "Бо ви ж так просили — співаю про ромашку" },
            { time: 61.4, text: "Вітер в полі хитає квіти" },
            { time: 65.0, text: "Хто ці уйобки, що вчать мене жити?" },
            { time: 68.5, text: "Над полем в небі пролітає пташка" },
            { time: 72.0, text: "Мені скаже як жити тендітна ромашка" },
            { time: 75.5, text: "Хто ці люди, що вчать мене жити?" },
            { time: 79.1, text: "Що мені заспівати та про що говорити?" },
            { time: 82.6, text: "Пачка цигарок, пива півторашка" },
            { time: 86.1, text: "Вони всього лиш квіти, тендітні ромашки" },
            { time: 89.8, text: "Все ж ми йшли, скільки б не падали" },
            { time: 93.2, text: "Хто кричав про вірність, ті перши зрадили" },
            { time: 96.8, text: "Половина в дамки, половина в нулі" },
            { time: 100.3, text: "Хто грав в сміливих — перші втекли" },
            { time: 103.8, text: "Лиш широкий ковток наповнить діафрагму" },
            { time: 107.4, text: "Залізні груди" },
            { time: 110.9, text: "Як же я ненавиджу людство" },
            { time: 114.4, text: "І я так люблю вас люди" },
            { time: 118.0, text: "Вже не боюсь і чекаю моменту" },
            { time: 121.5, text: "Як стану літнім дощем" },
            { time: 125.0, text: "Стану вітром, що зриває шифер" },
            { time: 128.6, text: "Або граючим в пічці вогнем" },
            { time: 132.1, text: "Всередині нічого не зворушиться" },
            { time: 135.6, text: "Від телеекранної драми" },
            { time: 139.2, text: "Бо серце моє стало каменем" },
            { time: 142.7, text: "Руки мої стали ножами" },
            { time: 146.3, text: "Вітер в полі хитає квіти" },
            { time: 149.8, text: "Хто ці уйобки, що вчать мене жити?" },
            { time: 153.3, text: "Над полем в небі пролітає пташка" },
            { time: 156.9, text: "Мені скаже як жити тендітна ромашка" },
            { time: 160.4, text: "Хто ці люди, що вчать мене жити?" },
            { time: 163.9, text: "Що мені заспівати та про що говорити?" },
            { time: 167.4, text: "Пачка цигарок, пива півторашка" },
            { time: 171.0, text: "Вони всього лиш квіти, тендітні ромашки" }
        ]
    },
    { 
        title: "свалка", 
        artist: "темный принц", 
        img: "3.png", 
        src: "3.mp3",
        lyrics: [
            { time: 0, text: "(музыка)" },
            { time: 5.3, text: "громкий стук об твою дверь" },
            { time: 8.1, text: "и я ломаю руки в кровь" },
            { time: 11.6, text: "утром снова в ателье" },
            { time: 14.2, text: "мне сшили новое лицо" },
            { time: 17.7, text: "смотрю на то как ты спишь" },
            { time: 20.5, text: "и видишь самый сладкий сон" },
            { time: 23.7, text: "просто оставь меня на мусорной свалке" },
            { time: 28.9, text: "мне место среди" },
            { time: 32.4, text: "битых машиин" },
            { time: 34.7, text: "и, мертвых петель" },
            { time: 40.2, text: "вы-бро-шен-ный" },
            { time: 43.2, text: "(музыка)" },
            { time: 50.1, text: "громкий стук об твою дверь" },
            { time: 53.0, text: "и я ломаю руки в кровь" },
            { time: 56.4, text: "утром снова в ателье" },
            { time: 59.1, text: "мне сшили новое лицо" },
            { time: 62.5, text: "смотрю на то как ты спишь" },
            { time: 65.3, text: "и видишь самый сладкий сон" },
            { time: 68.6, text: "а я спресованный в коробку" },
            { time: 71.6, text: "буду вспоминать лицо..." }
        ]
    },
	{ 
        title: "распять", 
        artist: "greyrock, tewiq, madk1d", 
        img: "4.png", 
        src: "4.mp3",
        lyrics: [
            { time: 0.6, text: "ладони полны слёзок" },
            { time: 2.5, text: "но время не вернуть вспять" },
            { time: 5.0, text: "на деревянный крест" },
            { time: 6.4, text: "можешь распять меня раз пять" },
            { time: 9.0, text: "я снова своровал твои мысли их не понять" },
            { time: 13.2, text: "отомсти мне за все" },
            { time: 14.8, text: "обиды запиши в тетрадь" },
            { time: 17.3, text: "ладони полны крови будто терся об ножи" },
            { time: 21.5, text: "на деревянный крест можешь распять" },
            { time: 24.0, text: "пока я жив" },
            { time: 25.6, text: "я снова своровал твое сердце будто каджит" },
			{ time: 29.7, text: "отомсти мне за все" },
			{ time: 31.3, text: "обиды запиши в дневник" },
            { time: 33.8, text: "как ты попала в мои строки" },
            { time: 36.5, text: "в тиктоке огни" },
            { time: 38.0, text: "ты знаешь, о ком все строки" },
            { time: 40.3, text: "этот город один" },
            { time: 42.1, text: "и мы в нем все одиноки" },
            { time: 44.5, text: "давай возьмем грибы" },
            { time: 46.2, text: "из магазина эноки" },
            { time: 48.3, text: "ты знаешь, во мне петарды" },
            { time: 50.3, text: "ты знаешь, что во мне бомбы" },
            { time: 52.7, text: "я хотел бы увидеться" },
			{ time: 54.7, text: "к счастью, связаны руки" },
			{ time: 56.5, text: "ты знаешь этот майндсет" },
			{ time: 58.7, text: "ты знаешь все эти звуки" },
			{ time: 60.7, text: "ты знаешь почему больно" },
			{ time: 62.7, text: "меня заполонил холод" },
			{ time: 64.8, text: "в моих руках твое тело" },
			{ time: 66.8, text: "а значит ладони полны" },
			{ time: 69.4, text: "ладони полны слёзок" },
            { time: 71.3, text: "но время не вернуть вспять" },
            { time: 73.6, text: "на деревянный крест" },
            { time: 75.2, text: "можешь распять меня раз пять" },
            { time: 77.7, text: "я снова своровал твои мысли их не понять" },
            { time: 81.8, text: "отомсти мне за все" },
            { time: 83.6, text: "обиды запиши в тетрадь" },
            { time: 86.1, text: "ладони полны крови будто терся об ножи" },
            { time: 90.2, text: "на деревянный крест можешь распять" },
            { time: 92.8, text: "пока я жив" },
            { time: 94.3, text: "я снова своровал твое сердце будто каджит" },
			{ time: 98.4, text: "отомсти мне за все" },
			{ time: 101.1, text: "обиды запиши в дневник" }
        ]
    },
	{ 
        title: "Небо", 
        artist: "SadSvit", 
        img: "5.png", 
        src: "5.mp3",
        lyrics: [
            { time: 0, text: "Текст для этой песни еще не готов." }
        ]
    },
	{ 
        title: "дырки в штанах", 
        artist: "madk1d", 
        img: "6.png", 
        src: "6.mp3",
        lyrics: [
            { time: 0.3, text: "я тебя люблю" },
            { time: 1.5, text: "скажи мне да или нет" },
            { time: 3.1, text: "зомби в моей комнате" },
            { time: 4.6, text: "не выключает свет" },
            { time: 6.1, text: "сколько времени прошло" },
            { time: 7.7, text: "или сколько лет" },
            { time: 9.0, text: "(ха-ха, че поверили, бля?)" },
            { time: 11.4, text: "она знает почему у меня дырки в штанах" },
            { time: 14.1, text: "она попалась на 'сосала?'" },
            { time: 15.9, text: "и ответила да!" },
            { time: 17.1, text: "я так люблю тебя, поверь" },
            { time: 18.5, text: "но между нами хуйня" },
            { time: 20.3, text: "и я хз почему, но уже боюсь без тебя" },
            { time: 23.2, text: "она знает почему у меня дырки в штанах" },
            { time: 26.0, text: "она попалась на 'сосала?'" },
            { time: 27.7, text: "и ответила да!" },
            { time: 29.0, text: "я так люблю тебя, поверь" },
            { time: 30.5, text: "но между нами хуйня" },
            { time: 32.0, text: "и я хз почему, но уже боюсь без тебя" },
            { time: 35.1, text: "и я знаю то что раньше изменяла парням" },
            { time: 37.9, text: "твой топер дохуище выше" },
            { time: 39.5, text: "измеряла по дням" },
            { time: 40.8, text: "ты выглядишь так ахуительно" },
            { time: 42.7, text: "примерно на лям" },
            { time: 43.8, text: "мой бро везет все это в жопе" },
            { time: 45.5, text: "если не могу сам" },
            { time: 71.6, text: "буду вспоминать лицо..." }
        ]
    }
];
let currentTrack = 0;

gsap.set("#full-bio", { height: 0, opacity: 0 });
gsap.set("#full-archive", { height: 0, opacity: 0 });

trigger.addEventListener('click', () => {
    gsap.to(trigger, { opacity: 0, duration: 0.3, onComplete: () => trigger.style.display = 'none' });
    introStage.style.display = 'flex';
    
    audio.volume = 0;
    try { audio.play(); } catch(e) {}
    gsap.to(audio, { volume: 0.3, duration: 2 });
    loadLyrics(currentTrack);

    const container = document.getElementById('blocks-container');
    for(let i=0; i<45; i++) {
        const b = document.createElement('div');
        b.className = 'intro-block';
        Object.assign(b.style, { width: Math.random()*100+40+'px', height: Math.random()*100+40+'px', left: Math.random()*100+'%', top: Math.random()*100+'%', opacity: 0 });
        container.appendChild(b);
    }

    const tl = gsap.timeline();
    tl.to(".intro-block", { opacity: 0.15, scale: 1, duration: 1, stagger: { amount: 0.8 }, ease: "power2.out" });
    tl.from(".split-text", { y: 30, opacity: 0, duration: 1, stagger: 0.2 }, "-=0.8");
    
    tl.to(".intro-block", { scale: 5, opacity: 0, duration: 0.6, ease: "expo.in" }, 2.6);
    tl.to(introStage, { opacity: 0, duration: 0.2 }, 3.1);
    
    tl.set(introStage, { display: 'none' });
    tl.set(mainSite, { display: 'block' });
    tl.fromTo(mainSite, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    tl.fromTo(".glass", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }, "-=0.3");
});

let bioOpen = false;
document.getElementById('bio-toggle').addEventListener('click', function() {
    bioOpen = !bioOpen;
    if(bioOpen) {
        gsap.to("#full-bio", { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" });
        this.innerText = "Show Less";
    } else {
        gsap.to("#full-bio", { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
        this.innerText = "Expand Bio";
    }
});

let archiveOpen = false;
document.getElementById('archive-toggle').addEventListener('click', function() {
    archiveOpen = !archiveOpen;
    if(archiveOpen) {
        gsap.to("#full-archive", { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" });
        document.getElementById('archive-arrow').innerText = "▲";
    } else {
        gsap.to("#full-archive", { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
        document.getElementById('archive-arrow').innerText = "▼";
    }
});

function loadLyrics(idx) {
    lyricsBox.innerHTML = '';
    playlist[idx].lyrics.forEach((l, i) => {
        const p = document.createElement('p');
        p.className = 'lyric-line';
        p.id = `l-${i}`;
        p.innerText = l.text;
        lyricsBox.appendChild(p);
    });
}

function updateTrack(dir) {
    const layout = document.querySelector('.player-layout');
    gsap.to(layout, { x: dir === 'next' ? 20 : -20, opacity: 0, duration: 0.2, onComplete: () => {
        document.getElementById('track-img').src = playlist[currentTrack].img;
        document.getElementById('track-title').innerText = playlist[currentTrack].title;
        document.getElementById('track-artist').innerText = playlist[currentTrack].artist;
        audio.src = playlist[currentTrack].src;
        progressBar.value = 0;
        loadLyrics(currentTrack);
        
        if(iconPlay && iconPause) {
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
        }
        
        try { audio.play(); } catch(e) {}
        gsap.fromTo(layout, { x: dir === 'next' ? -20 : 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
    }});
}

document.getElementById('nextBtn').addEventListener('click', () => { 
    currentTrack = (currentTrack + 1) % playlist.length; 
    updateTrack('next'); 
});

document.getElementById('prevBtn').addEventListener('click', () => { 
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length; 
    updateTrack('prev'); 
});

audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    updateTrack('next');
});

audio.addEventListener('timeupdate', () => {
    if(!audio.duration) return;
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    
    const lines = playlist[currentTrack].lyrics;
    let activeIdx = -1;
    for(let i=0; i<lines.length; i++) {
        if(audio.currentTime >= lines[i].time) activeIdx = i;
        else break;
    }

    if(activeIdx !== -1) {
        const activeEl = document.getElementById(`l-${activeIdx}`);
        if(activeEl && !activeEl.classList.contains('active')) {
            document.querySelectorAll('.lyric-line').forEach(el => el.classList.remove('active'));
            activeEl.classList.add('active');
            
            const targetScroll = activeEl.offsetTop - lyricsBox.offsetTop - (lyricsBox.clientHeight / 2) + (activeEl.clientHeight / 2);
            gsap.to(lyricsBox, { scrollTop: targetScroll, duration: 0.8, ease: "power2.out" });
        }
    }
});

progressBar.addEventListener('input', (e) => {
    if(audio.duration) audio.currentTime = (e.target.value / 100) * audio.duration;
});
document.getElementById('volume-slider').addEventListener('input', (e) => audio.volume = e.target.value);


const playPauseBtn = document.getElementById('play-pause-btn');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');

if (playPauseBtn) {
    playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (audio.paused) audio.play();
        else audio.pause();
    });

    audio.addEventListener('play', () => {
        if(iconPlay && iconPause) {
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
        }
    });
    audio.addEventListener('pause', () => {
        if(iconPlay && iconPause) {
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
        }
    });
}

const fullscreenBtn = document.getElementById('fullscreen-btn');
const musicModal = document.getElementById('music-modal');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');

if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        musicModal.style.display = 'flex';
        gsap.to(musicModal, { opacity: 1, duration: 0.3 });
    });
}

modalCancel.addEventListener('click', () => {
    gsap.to(musicModal, { opacity: 0, duration: 0.3, onComplete: () => musicModal.style.display = 'none' });
});

modalConfirm.addEventListener('click', () => {
    // Перебрасываем пользователя на новую страницу
    window.location.href = "https://cawiworld.github.io/music";
});
    
    setTimeout(() => {
        const activeEl = document.querySelector('.lyric-line.active');
        if(activeEl) {
            const targetScroll = activeEl.offsetTop - lyricsBox.offsetTop - (lyricsBox.clientHeight / 2) + (activeEl.clientHeight / 2);
            lyricsBox.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
    }, 650);
}

if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
if (exitFsBtn) exitFsBtn.addEventListener('click', toggleFullscreen);

document.addEventListener('mousemove', (e) => {
    if (mainSite.style.display === 'block' && !document.body.classList.contains('fs-active')) {
        const x = (e.clientX - window.innerWidth/2) / 70;
        const y = (e.clientY - window.innerHeight/2) / 70;
        document.querySelectorAll('.glass').forEach(card => {
            const d = card.getAttribute('data-depth') || 0.1;
            gsap.to(card, { x: x * d * 15, y: y * d * 15, duration: 1.5, ease: "power2.out" });
        });
    }
});
