// delega todos os cliques dentro da sidebar
document.querySelector('.sidebar-left').addEventListener('click', e => {
    const item = e.target.closest('li.menu-item');
    if (!item) return;           // só nos itens de menu
    e.preventDefault();          // cancela o href="#"

    // pega o texto do botão (Jogar, Conta, Wiki, Config)
    const label = item.querySelector('.menu-text').textContent.trim();
    console.log('[delegate] clicou em', label);

    // navegação simples
    switch(label) {
        case 'Jogar':
            // aqui você já pode chamar window.windowControls.launchGame() ou algo assim
            break;
        case 'Conta':
            window.windowControls.navigate('account.html');
            break;
        case 'Wiki':
            window.windowControls.navigate('wiki.html');
            break;
        case 'Configurações':
            window.windowControls.navigate('settings.html');
            break;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.wiki-tabs');
    const contentContainer = document.getElementById('tab-contents');

    const tabContentMap = {
        monstros: 'Lista de Monstros',
        quests: 'Detalhes das Quests',
        receitas: 'Como criar poções, itens…',
        drops: 'Quais monstros dropam o quê…',
        comandos: 'Comandos de chat, macros…'
    };

    let tabCounter = 1;

    function showTab(id) {
        document.querySelectorAll('.wiki-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.wiki-content').forEach(c => c.style.display = 'none');
        const tab = document.querySelector(`.wiki-tab[data-tab="${id}"]`);
        const content = document.getElementById(id);
        if (tab && content) {
            tab.classList.add('active');
            content.style.display = 'block';
        }
    }

    function createTab(id, title, closable = false) {
        const tab = document.createElement('div');
        tab.className = 'wiki-tab';
        tab.dataset.tab = id;
        tab.innerHTML = `<span class="tab-title">${title}</span>`;

        if (closable) {
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-tab';
            closeBtn.textContent = '×';
            closeBtn.title = 'Fechar aba';
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                document.getElementById(id)?.remove();
                tab.remove();

                const remainingTabs = document.querySelectorAll('.wiki-tab:not(.add-tab)');
                if (remainingTabs.length > 0) {
                    const last = remainingTabs[remainingTabs.length - 1];
                    showTab(last.dataset.tab);
                }
            };
            tab.appendChild(closeBtn);
        }

        // Sempre insere antes do botão "+"
        tabsContainer.insertBefore(tab, document.getElementById('add-tab-btn'));
        return tab;
    }

    function createContent(id, title, contentText) {
        const content = document.createElement('div');
        content.className = 'wiki-content';
        content.id = id;
        content.style.display = 'none';
        content.innerHTML = `<h3>${title}</h3><p>${contentText}</p>`;
        contentContainer.appendChild(content);
        return content;
    }

    // Cria aba principal antes do botão +
    createTab('principal', 'Wiki');
    createContent('principal', 'Selecione uma categoria', 'Use o menu lateral à direita para escolher uma seção da Wiki.');
    showTab('principal');

    // Botão "+"
    const addTabButton = document.createElement('div');
    addTabButton.className = 'wiki-tab add-tab';
    addTabButton.id = 'add-tab-btn';
    addTabButton.textContent = '+';
    addTabButton.title = 'Nova aba';
    tabsContainer.appendChild(addTabButton);

    // Clique nas abas
    tabsContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.wiki-tab');
        if (!tab || tab.classList.contains('add-tab')) return;
        showTab(tab.dataset.tab);
    });

    // Clique no "+"
    addTabButton.addEventListener('click', () => {
        const newId = `aba-${tabCounter++}`;
        const title = `Aba ${tabCounter}`;
        createTab(newId, title, true);
        createContent(newId, title, 'Conteúdo novo...');
        showTab(newId);
    });

    // Clique nas categorias da lateral
    document.querySelectorAll('.wiki-cats .menu-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            document.querySelectorAll('.wiki-cats .menu-item').forEach(i => i.classList.remove('active'));
            link.parentElement.classList.add('active');

            const categoria = link.dataset.category;
            const title = link.textContent.trim();
            const content = tabContentMap[categoria] || `Conteúdo de ${categoria}`;

            const principal = document.getElementById('principal');
            principal.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
            showTab('principal');
        });
    });
});



