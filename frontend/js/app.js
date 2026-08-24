// ===== CONFIGURAÇÃO =====
const API_URL = 'http://localhost:8080/api/pokemon';
let offsetAtual = 0;
const LIMITE = 20;
let pokemonsCache = [];
let filtroTipoAtual = 'todos';

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    carregarPokemons();
    
    // Busca com Enter
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') buscarPokemon();
    });
});

// ===== FUNÇÕES PRINCIPAIS =====

async function carregarPokemons() {
    mostrarLoading(true);
    
    try {
        const response = await fetch(`${API_URL}?limit=${LIMITE}&offset=${offsetAtual}`);
        pokemonsCache = await response.json();
        
        renderizarGrid(pokemonsCache);
        atualizarPaginacao();
    } catch (error) {
        console.error('Erro ao carregar:', error);
        mostrarErro('Não foi possível carregar os Pokémons. Verifique se o backend está rodando.');
    } finally {
        mostrarLoading(false);
    }
}

function renderizarGrid(pokemons) {
    const grid = document.getElementById('pokemonGrid');
    grid.innerHTML = '';
    
    pokemons.forEach(pokemon => {
        const card = criarCard(pokemon);
        grid.appendChild(card);
    });
}

function criarCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.style.setProperty('--type-color', getCorTipo(pokemon.type));
    card.onclick = () => abrirModal(pokemon.id);
    
    card.innerHTML = `
        <div class="number">#${String(pokemon.id).padStart(3, '0')}</div>
        <img src="${pokemon.imageUrl}" alt="${pokemon.name}" loading="lazy">
        <div class="name">${pokemon.name}</div>
        <span class="type-badge" style="background: ${getCorTipo(pokemon.type)}">${pokemon.type}</span>
    `;
    
    return card;
}

async function buscarPokemon() {
    const termo = document.getElementById('searchInput').value.trim();
    if (!termo) {
        carregarPokemons();
        return;
    }
    
    mostrarLoading(true);
    
    try {
        // Tenta buscar por ID se for número, senão por nome
        const url = isNaN(termo) 
            ? `${API_URL}/search?name=${termo}`
            : `${API_URL}/${termo}`;
            
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Pokémon não encontrado');
        
        const pokemon = await response.json();
        abrirModal(pokemon.id);
        document.getElementById('searchInput').value = '';
    } catch (error) {
        mostrarErro('Pokémon não encontrado! Tente outro nome ou número.');
    } finally {
        mostrarLoading(false);
    }
}

async function abrirModal(id) {
    mostrarLoading(true);
    
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const pokemon = await response.json();
        
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <div class="modal-body">
                <img src="${pokemon.imageUrl}" alt="${pokemon.name}">
                <h2>#${String(pokemon.id).padStart(3, '0')} ${pokemon.name}</h2>
                
                <div class="types-list">
                    ${pokemon.types.map(t => `<span class="type-badge" style="background: ${getCorTipo(t)}">${t}</span>`).join('')}
                </div>
                
                <div class="info-grid">
                    <div class="info-item">
                        <label>Altura</label>
                        <span>${pokemon.height / 10} m</span>
                    </div>
                    <div class="info-item">
                        <label>Peso</label>
                        <span>${pokemon.weight / 10} kg</span>
                    </div>
                    <div class="info-item">
                        <label>Experiência Base</label>
                        <span>${pokemon.baseExperience}</span>
                    </div>
                    <div class="info-item">
                        <label>Habilidades</label>
                        <span>${pokemon.abilities.length}</span>
                    </div>
                </div>
                
                <div class="stats-list">
                    <h3 style="margin-bottom: 10px; color: #ffcb05;">Status</h3>
                    ${pokemon.stats.map(stat => `
                        <div class="stat-bar">
                            <label>${traduzirStat(stat.name)}</label>
                            <div class="bar">
                                <div class="bar-fill" style="width: ${Math.min(stat.value, 100)}%">${stat.value}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('modal').classList.remove('hidden');
    } catch (error) {
        mostrarErro('Erro ao carregar detalhes do Pokémon.');
    } finally {
        mostrarLoading(false);
    }
}

function fecharModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Fecha modal clicando fora
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') fecharModal();
});

function filtrarPorTipo(tipo) {
    filtroTipoAtual = tipo;
    
    // Atualiza botões ativos
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (tipo === 'todos') {
        renderizarGrid(pokemonsCache);
    } else {
        const filtrados = pokemonsCache.filter(p => 
            p.type.toLowerCase() === tipo.toLowerCase()
        );
        renderizarGrid(filtrados);
    }
}

// ===== PAGINAÇÃO =====
function proximaPagina() {
    offsetAtual += LIMITE;
    carregarPokemons();
}

function paginaAnterior() {
    if (offsetAtual >= LIMITE) {
        offsetAtual -= LIMITE;
        carregarPokemons();
    }
}

function atualizarPaginacao() {
    document.getElementById('paginaAtual').textContent = `Página ${Math.floor(offsetAtual / LIMITE) + 1}`;
    document.getElementById('btnAnterior').disabled = offsetAtual === 0;
}

// ===== UTILITÁRIOS =====

function getCorTipo(tipo) {
    const cores = {
        'fire': '#f08030',
        'water': '#6890f0',
        'grass': '#78c850',
        'electric': '#f8d030',
        'psychic': '#f85888',
        'ice': '#98d8d8',
        'dragon': '#7038f8',
        'dark': '#705848',
        'fairy': '#ee99ac',
        'normal': '#a8a878',
        'fighting': '#c03028',
        'flying': '#a890f0',
        'poison': '#a040a0',
        'ground': '#e0c068',
        'rock': '#b8a038',
        'bug': '#a8b820',
        'ghost': '#705898',
        'steel': '#b8b8d0'
    };
    return cores[tipo.toLowerCase()] || '#888';
}

function traduzirStat(stat) {
    const traducoes = {
        'hp': 'HP',
        'attack': 'Ataque',
        'defense': 'Defesa',
        'special-attack': 'Atq. Esp.',
        'special-defense': 'Def. Esp.',
        'speed': 'Velocidade'
    };
    return traducoes[stat.toLowerCase()] || stat;
}

function mostrarLoading(mostrar) {
    document.getElementById('loading').classList.toggle('hidden', !mostrar);
}

function mostrarErro(mensagem) {
    const grid = document.getElementById('pokemonGrid');
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #ff6b6b;">${mensagem}</div>`;
}