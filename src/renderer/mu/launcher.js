const ID = 'mu';
const s  = document.getElementById('status');
const p  = document.getElementById('panel');

/* controles da janela */
document.querySelector('.win-btn.minimize')
    .addEventListener('click', () => window.windowControls.minimize());

document.querySelector('.win-btn.close')
    .addEventListener('click', () => window.windowControls.close());


document.querySelectorAll('nav button').forEach(btn => {
  btn.onclick = async () => {
    const act = btn.dataset.act;
    if (act === 'account')   openPanel('https://seu-site.com/registro');
    else if (act === 'wiki') openPanel('https://seu-site.com/wiki');
    else if (act === 'install') progress(await window.launcherAPI.install(ID));
    else if (act === 'update')  progress(await window.launcherAPI.update(ID));
    else if (act === 'launch')  progress(await window.launcherAPI.launch(ID));
  };
});

function openPanel (url) { p.src = url; p.hidden = false; }
function progress   (r)  { s.textContent = JSON.stringify(r); }
document.querySelector('.back').onclick = () => history.back();

// Noticias locais
const newsData = [
  {
    title: "Evento de XP em dobro neste fim de semana!",
    body: "Todos os monstros darão XP dobrado até domingo às 23h59. Aproveite para upar rápido!"
  },
  {
    title: "Novo sistema de evolução ativado",
    body: "Agora você pode evoluir suas armas através da forja sombria em Devias."
  }
];

const newsContainer = document.getElementById("news-container");

newsData.forEach(news => {
  const div = document.createElement("div");
  div.className = "news-card";
  div.innerHTML = `
    <div class="news-title">${news.title}</div>
    <div class="news-body">${news.body}</div>
  `;
  newsContainer.appendChild(div);
});

// Simula detecção de atualização
let needsUpdate = true;

const playBtn = document.getElementById("btn-play");
playBtn.textContent = needsUpdate ? "🔄 Atualizar" : "▶️ Jogar";
playBtn.onclick = () => {
  if (needsUpdate) {
    playBtn.textContent = "Atualizando...";
    window.launcherAPI.update("mu").then(() => {
      needsUpdate = false;
      playBtn.textContent = "▶️ Jogar";
    });
  } else {
    window.launcherAPI.launch("mu");
  }
};

// Notícias locais
const newsData = [
  {
    title: "Evento de XP em dobro!",
    body: "Aproveite o fim de semana para upar! XP x2 até domingo."
  },
  {
    title: "Nova dungeon liberada",
    body: "A caverna esquecida de Kanturu foi aberta aos bravos aventureiros."
  }
];

const newsContainer = document.getElementById("news-container");
newsData.forEach(news => {
  const div = document.createElement("div");
  div.className = "news-card";
  div.innerHTML = `
    <div class="news-title">${news.title}</div>
    <div class="news-body">${news.body}</div>
  `;
  newsContainer.appendChild(div);
});

const slides = document.querySelectorAll('.carousel img');
let idx = 0;
setInterval(() => {
  slides[idx].classList.remove('active');
  idx = (idx + 1) % slides.length;
  slides[idx].classList.add('active');
}, 5000);

const playFooter = document.getElementById("btn-play-footer");
const updateFooter = document.getElementById("btn-update-footer");
const progressBar = document.querySelector(".progress-bar");
let currentVersion = "1.0.1";
let needsUpdate = true;
// colapsar / expandir nav
const nav = document.querySelector('.grid-nav');
const navToggle = document.querySelector('.nav-toggle');
navToggle.onclick = () => nav.classList.toggle('expanded');

playFooter.onclick = () => {
  if (needsUpdate) {
    playFooter.hidden = true;
    updateFooter.hidden = false;
    let progress = 0;
    // simula download
    const interval = setInterval(() => {
      progress += 10;
      progressBar.style.width = progress + "%";
      if (progress >= 100) {
        clearInterval(interval);
        needsUpdate = false;
        updateFooter.hidden = true;
        playFooter.hidden = false;
        playFooter.querySelector("span").textContent = "▶️ Jogar";
        currentVersion = "1.0.2";
        document.querySelector(".version-info").textContent = "v" + currentVersion;
      }
    }, 300);
  } else {
    window.launcherAPI.launch("mu");
  }
};
const hero = document.querySelector('.grid-hero');
hero.addEventListener('mousemove', (e) => {
  const { width, height } = hero.getBoundingClientRect();
  const x = (e.offsetX/width - 0.5) * 10;
  const y = (e.offsetY/height - 0.5) * 10;
  hero.querySelector('img').style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
});
hero.addEventListener('mouseleave', () => {
  hero.querySelector('img').style.transform = 'scale(1.05) translate(0,0)';
});

let idx = 0;
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");
function show(i) {
  slides.forEach((s, j) => s.classList.toggle("active", i === j));
  dots.forEach((d, j) => d.classList.toggle("active", i === j));
  idx = i;
}
document.querySelector(".next").onclick = () =>
    show((idx + 1) % slides.length);
document.querySelector(".prev").onclick = () =>
    show((idx - 1 + slides.length) % slides.length);
dots.forEach((d, i) => (d.onclick = () => show(i)));
setInterval(() => show((idx + 1) % slides.length), 8000);