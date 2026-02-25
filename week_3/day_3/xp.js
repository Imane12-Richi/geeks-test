

// DOM elements
const nameEl = document.getElementById('name');
const detailsEl = document.getElementById('details');
const infoDiv = document.getElementById('character-info');
const errorDiv = document.getElementById('error-message');
const loadingDiv = document.getElementById('loading');
const findBtn = document.getElementById('find-btn');

// Hide all dynamic sections
function hideAll() {
    infoDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    loadingDiv.classList.add('hidden');
}

// Display character data
function displayCharacter(data) {
    nameEl.textContent = data.name;
    detailsEl.innerHTML = `
        <span>Height:</span> ${data.height}<br>
        <span>Gender:</span> ${data.gender}<br>
        <span>Birth Year:</span> ${data.birth_year}<br>
        <span>Home World:</span> ${data.homeworld}
    `;
    infoDiv.classList.remove('hidden');
}

// Show error message
function showError() {
    errorDiv.classList.remove('hidden');
}

// Show loading spinner
function showLoading() {
    loadingDiv.classList.remove('hidden');
}

// Fetch home world name from URL
async function fetchHomeworld(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch homeworld');
    const data = await response.json();
    // The API returns { result: { properties: { name } } } for planets
    return data.result.properties.name;
}

// Main function to get a random character
async function fetchRandomCharacter() {
    hideAll();
    showLoading();

    const randomId = Math.floor(Math.random() * 83) + 1; // 1 to 83

    try {
        // Fetch character
        const personRes = await fetch(`https://www.swapi.tech/api/people/${randomId}`);
        if (!personRes.ok) {
            throw new Error('Character not found');
        }
        const personData = await personRes.json();
        const props = personData.result.properties;

        // Fetch home world
        const homeworldName = await fetchHomeworld(props.homeworld);

        // Combine and display
        displayCharacter({
            name: props.name,
            height: props.height,
            gender: props.gender,
            birth_year: props.birth_year,
            homeworld: homeworldName
        });
    } catch (error) {
        console.error(error);
        showError();
    } finally {
        loadingDiv.classList.add('hidden'); // hide spinner
    }
}

// Event listener
findBtn.addEventListener('click', fetchRandomCharacter);

// Optional: load a character when page opens
window.addEventListener('load', fetchRandomCharacter);