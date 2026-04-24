const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x07070a, 0.015);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 40);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('canvas-container').appendChild(renderer.domElement);

const composer = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);
const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
composer.addPass(bloomPass);

const planeGeo = new THREE.PlaneGeometry(200, 200, 64, 64);
const pos = planeGeo.attributes.position;
for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i);
    const z = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 3 + Math.sin(x * 0.02) * 5;
    pos.setZ(i, z);
}
planeGeo.computeVertexNormals();
const planeMat = new THREE.MeshStandardMaterial({ 
    color: 0x48cae4, wireframe: true, transparent: true, opacity: 0.15 
});
const terrain = new THREE.Mesh(planeGeo, planeMat);
terrain.rotation.x = -Math.PI / 2;
terrain.position.y = -15;
scene.add(terrain);

const crystalGroup = new THREE.Group();
const coreMat = new THREE.MeshStandardMaterial({
    color: 0x9d4edd, emissive: 0x48cae4, emissiveIntensity: 0.2,
    roughness: 0.1, metalness: 0.9, flatShading: true
});

const coreGeo = new THREE.IcosahedronGeometry(8, 0); 
const core = new THREE.Mesh(coreGeo, coreMat);
crystalGroup.add(core);

for(let i=0; i<25; i++) {
    const shardGeo = new THREE.TetrahedronGeometry(Math.random() * 2 + 0.5);
    const shard = new THREE.Mesh(shardGeo, coreMat);
    shard.position.set((Math.random()-0.5)*35, (Math.random()-0.5)*35, (Math.random()-0.5)*35);
    shard.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
    crystalGroup.add(shard);
}
crystalGroup.scale.set(0.01, 0.01, 0.01);
scene.add(crystalGroup);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight1 = new THREE.PointLight(0xffffff, 1.5, 100);
pointLight1.position.set(20, 20, 20);
scene.add(pointLight1);

let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
const windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - windowHalfX);
    mouseY = (e.clientY - windowHalfY);
});

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    targetX = mouseX * 0.001; targetY = mouseY * 0.001;

    crystalGroup.rotation.y += 0.05 * (targetX - crystalGroup.rotation.y) + 0.002;
    crystalGroup.rotation.x += 0.05 * (targetY - crystalGroup.rotation.x) + 0.002;
    crystalGroup.position.y = Math.sin(elapsedTime) * 1.5;

    crystalGroup.children.forEach((child, i) => {
        if(i !== 0) {
            child.rotation.x += 0.01;
            child.rotation.y += 0.02;
        }
    });

    terrain.position.z = (elapsedTime * 5) % 20;

    composer.render();
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

let progress = 0;
const progressBar = document.querySelector('.progress-fill');
const preloader = document.getElementById('preloader');
const bentoCards = document.querySelectorAll('.bento-card');

gsap.registerPlugin(ScrollTrigger);

const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress > 100) progress = 100;
    
    progressBar.style.width = `${progress}%`;
    
    if (progress === 100) {
        clearInterval(loadInterval);
        
        gsap.to(preloader, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                preloader.style.display = 'none';
                document.body.classList.remove('loading');
                
                gsap.fromTo('.glass-header', 
                    { y: -50, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
                );
                
                gsap.to(crystalGroup.scale, { x: 1, y: 1, z: 1, duration: 2.5, ease: "elastic.out(1, 0.5)" });
            }
        });
    }
}, 120);

gsap.to(camera.position, {
    z: -10,
    y: -5,
    ease: "power1.inOut",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
    }
});

gsap.to(crystalGroup.rotation, {
    z: Math.PI, 
    ease: "none",
    scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 }
});

document.querySelectorAll('.text-content').forEach((block) => {
    gsap.to(block, {
        opacity: 1,
        y: -50,
        scrollTrigger: {
            trigger: block.parentElement,
            start: "top 60%",
            end: "top 30%",
            scrub: 1
        }
    });
});

const sfxHover = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
sfxHover.volume = 0.15;

const header = document.querySelector('.glass-header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100 && window.scrollY > lastScrollY) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});

const cursorEl = document.getElementById('cursor');
const followerEl = document.getElementById('cursor-follower');

gsap.set(cursorEl, { xPercent: -50, yPercent: -50 });
gsap.set(followerEl, { xPercent: -50, yPercent: -50 });

window.addEventListener('mousemove', (e) => {
    gsap.to(cursorEl, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
    gsap.to(followerEl, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power3.out" });
});

const interactives = document.querySelectorAll('a, .bento-card');

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        followerEl.classList.add('hover-active');
        
        sfxHover.currentTime = 0; 
        sfxHover.play().catch(() => {}); 
    });
    
    el.addEventListener('mouseleave', () => {
        followerEl.classList.remove('hover-active');
    });
});

gsap.to('.scroll-text', {
    opacity: 1,
    y: -50,
    
	Trigger: {
        trigger: '.scroll-text',
        start: "top 85%",
        end: "top 40%",
        scrub: 1
    }
});

document.querySelectorAll('.interact-window').forEach(el => {
    el.addEventListener('mouseenter', () => {
        followerEl.classList.add('hover-active');
        sfxHover.currentTime = 0; sfxHover.play().catch(() => {});
    });
    el.addEventListener('mouseleave', () => {
        followerEl.classList.remove('hover-active');
    });
});