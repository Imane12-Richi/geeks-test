const API_KEY = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
const API_BASE = 'https://pokeapi.co/api/v2/pokemon/';

let currentId = 1;

const imageEl = document.getElementById('pokemon-image');
const nameEl = document.getElementById('pokemon-name');
const idEl = document.getElementById('pokemon-id');
const heightEl = document.getElementById('pokemon-height');
const weightEl = document.getElementById('pokemon-weight');
const typeEl = document.getElementById('pokemon-type');
const messageEl = document.getElementById('message');

const randomBtn = document.getElementById('random-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function setLoading(isLoading) {
  messageEl.textContent = isLoading ? 'Loading...' : '';
}

function showError() {
  messageEl.textContent = 'Oh no! That Pokemon isn’t available…';
}

function showPokemon(data) {
  currentId = data.id;
  imageEl.src = data.sprites.front_default || '';
  nameEl.textContent = data.name[0].toUpperCase() + data.name.slice(1);
  idEl.textContent = 'Pokemon n° ' + data.id;
  heightEl.textContent = 'Height: ' + data.height + 'cm';
  weightEl.textContent = 'Weight: ' + data.weight + 'gr';
  typeEl.textContent = 'Type: ' + data.types.map(t => t.type.name).join(', ');
}

async function fetchPokemon(idOrName) {
  try {
    setLoading(true);
    const response = await fetch(API_BASE + idOrName);
    if (!response.ok) throw new Error();
    const data = await response.json();
    showPokemon(data);
  } catch (e) {
    showError();
  } finally {
    setLoading(false);
  }
}

randomBtn.addEventListener('click', () => {
  const randomId = Math.floor(Math.random() * 898) + 1;
  fetchPokemon(randomId);
});

prevBtn.addEventListener('click', () => {
  if (currentId > 1) fetchPokemon(currentId - 1);
});

nextBtn.addEventListener('click', () => {
  fetchPokemon(currentId + 1);
});
