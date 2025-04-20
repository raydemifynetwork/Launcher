(async () => {
  const list = await window.launcherAPI.listPlugins();
  const ul   = document.getElementById('game-list');

  list.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p.name;
    li.onclick = () => location.href = `./${p.id}/launcher.html`;
    ul.appendChild(li);
  });
})();
/* controles da janela */
document.querySelector('.win-btn.minimize')
    .addEventListener('click', () => window.windowControls.minimize());

document.querySelector('.win-btn.close')
    .addEventListener('click', () => window.windowControls.close());
