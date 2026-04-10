document.addEventListener('DOMContentLoaded', () => {
    
    const runawayBtn = document.getElementById('runaway-btn');
    runawayBtn.addEventListener('mouseover', () => {
        runawayBtn.style.position = 'absolute';
        runawayBtn.style.left = Math.random() * 80 + '%';
        runawayBtn.style.top = Math.random() * 80 + '%';
    });

    const modal = document.getElementById('captcha-modal');
    document.getElementById('start-demo-top').addEventListener('click', () => modal.style.display = 'flex');
    document.getElementById('fake-btn-1').addEventListener('click', () => modal.style.display = 'flex');

    function nextLevel(current, next) {
        document.getElementById(current).style.display = 'none';
        document.getElementById(next).style.display = 'block';
    }

    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', () => item.classList.toggle('selected'));
    });
    document.getElementById('lvl1-skip').addEventListener('click', () => nextLevel('level-1', 'level-2'));

    let lvl2Attempts = 0;
    document.getElementById('lvl2-btn').addEventListener('click', () => {
        const msg = document.getElementById('lvl2-msg');
        lvl2Attempts++;
        if (lvl2Attempts < 5) {
            let fakeNum = Math.floor(Math.random() * 10) + 1;
            const userVal = parseInt(document.getElementById('lvl2-input').value);
            if (fakeNum === userVal) fakeNum = fakeNum === 10 ? 1 : fakeNum + 1;
            msg.innerText = `Неверно. Я загадал ${fakeNum}.`;
        } else {
            msg.style.color = '#10b981';
            msg.innerText = 'Ладно. Это было число 7. Проходи.';
            const btn = document.getElementById('lvl2-btn');
            btn.innerText = 'Далее';
            btn.onclick = () => nextLevel('level-2', 'level-3');
        }
    });

    const slider = document.getElementById('lvl3-slider');
    const sliderValue = document.getElementById('lvl3-value');
    const lvl3Btn = document.getElementById('lvl3-btn');
    
    slider.addEventListener('keydown', function(e) {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    });

    slider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value).toFixed(1);
        sliderValue.innerText = `${val}%`;
        if (val === "47.3") {
            lvl3Btn.disabled = false;
            sliderValue.style.color = '#10b981';
        } else {
            lvl3Btn.disabled = true;
            sliderValue.style.color = 'white';
        }
    });
    lvl3Btn.addEventListener('click', () => nextLevel('level-3', 'level-4'));

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            if (this.innerText !== '') return;
            this.innerText = 'X';
            this.style.color = '#6366f1';
            
            setTimeout(() => {
                this.innerText = 'O';
                this.style.color = '#ef4444';
                document.getElementById('lvl4-msg').innerText = "Ход заблокирован. Вы не пройдете.";
            }, 50);
        });
    });

    document.getElementById('lvl4-title').addEventListener('click', function() {
        this.innerText = "Взлом успешен.";
        this.style.color = "#10b981";
        document.getElementById('lvl4-msg').innerText = "";
        document.getElementById('lvl4-btn').disabled = false;
    });
    document.getElementById('lvl4-btn').addEventListener('click', () => nextLevel('level-4', 'level-5'));

    const trickBtns = document.querySelectorAll('.trick-btn');
    trickBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.classList.add('red');
            setTimeout(() => btn.classList.remove('red'), 150);
        });
        btn.addEventListener('click', () => {
            if (btn.classList.contains('red')) {
                nextLevel('level-5', 'level-6');
                startLvl6();
            }
        });
    });

    let lvl6Timer;
    function startLvl6() {
        lvl6Timer = setTimeout(() => {
            document.getElementById('lvl6-fail').style.display = 'none';
            document.getElementById('lvl6-btn').style.display = 'inline-block';
        }, 5000);
    }
    document.getElementById('lvl6-fail').addEventListener('click', () => {
        clearTimeout(lvl6Timer);
        document.getElementById('level-6').style.display = 'none';
        document.getElementById('level-1').style.display = 'block';
    });
    document.getElementById('lvl6-btn').addEventListener('click', () => nextLevel('level-6', 'level-7'));

const lvl7Input = document.getElementById('lvl7-input');
    lvl7Input.addEventListener('input', (e) => {
        let val = e.target.value.toUpperCase();
        
        if (val === "ОТБ") {
            e.target.value = "БОТ";
            document.getElementById('lvl7-btn').disabled = false;
        } 
        else if (val === "БОТ") {
            e.target.value = "ОТБ";
            document.getElementById('lvl7-btn').disabled = true;
        }
    });
    document.getElementById('lvl7-btn').addEventListener('click', () => nextLevel('level-7', 'level-8'));
	
    const virusContainer = document.getElementById('virus-container');
    virusContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('virus')) {
            let v1 = document.createElement('div');
            v1.className = 'virus';
            let v2 = document.createElement('div');
            v2.className = 'virus';
            virusContainer.appendChild(v1);
            virusContainer.appendChild(v2);
        }
    });
    document.getElementById('lvl8-title').addEventListener('click', () => {
        document.getElementById('lvl8-btn').disabled = false;
        document.getElementById('lvl8-title').style.color = "#10b981";
        virusContainer.innerHTML = '';
    });
    document.getElementById('lvl8-btn').addEventListener('click', () => nextLevel('level-8', 'level-9'));

    const lvl9Box = document.getElementById('lvl9-box');
    lvl9Box.addEventListener('mouseover', () => {
        lvl9Box.style.left = (Math.random() * 80 + 10) + '%';
        lvl9Box.style.top = (Math.random() * 80 + 10) + 'px';
    });
    document.getElementById('fake-check').addEventListener('change', function() {
        if(this.checked) setTimeout(() => nextLevel('level-9', 'level-10'), 500);
    });

    document.getElementById('final-trigger').addEventListener('click', triggerFinale);

    function triggerFinale() {
        modal.style.display = 'none';
        document.body.classList.add('site-broken');
        
        let glitchInterval = setInterval(() => {
            let el = document.createElement('div');
            el.className = 'fake-captcha-item';
            el.innerText = Math.random().toString(36).substring(2, 15);
            el.style.left = Math.random() * 100 + 'vw';
            el.style.top = Math.random() * 100 + 'vh';
            el.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 3})`;
            document.body.appendChild(el);
        }, 50);

        setTimeout(() => {
            clearInterval(glitchInterval);
            document.body.className = 'finale-clean';
            const fScreen = document.getElementById('finale-screen');
            fScreen.style.display = 'flex';
        }, 3500);
    }
});