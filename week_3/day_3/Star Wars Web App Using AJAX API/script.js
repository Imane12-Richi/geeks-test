const characterInfo = document.getElementById('character-info');
const findButton = document.getElementById('find-button');

function getRandomCharacterId() {
    return Math.floor(Math.random() * 83) + 1;
}

function displayLoading() {
    characterInfo.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner"></i>
            <div class="loading-text">Loading...</div>
        </div>
    `;
}

function displayError() {
    characterInfo.innerHTML = `
        <div class="error-message">Oh No! That person isn't available.</div>
    `;
}

async function fetchCharacterData(characterId) {
    try {
        const response = await fetch(`https://www.swapi.tech/api/people/${characterId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch character data');
        }
        
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching character:', error);
        throw error;
    }
}

async function fetchHomeworldData(homeworldUrl) {
    try {
        const response = await fetch(homeworldUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch homeworld data');
        }
        
        const data = await response.json();
        return data.result.properties.name;
    } catch (error) {
        console.error('Error fetching homeworld:', error);
        return 'unknown';
    }
}

async function displayCharacterInfo(characterData, homeworldName) {
    characterInfo.innerHTML = `
        <div class="character-info">
            <div class="character-name">${characterData.properties.name}</div>
            <div class="character-detail">Height: ${characterData.properties.height}</div>
            <div class="character-detail">Gender: ${characterData.properties.gender}</div>
            <div class="character-detail">Birth Year: ${characterData.properties.birth_year}</div>
            <div class="character-detail">Home World: ${homeworldName}</div>
        </div>
    `;
}

async function findRandomCharacter() {
    findButton.disabled = true;
    
    displayLoading();
    
    try {
        const characterId = getRandomCharacterId();
        
        const characterData = await fetchCharacterData(characterId);
        
        const homeworldName = await fetchHomeworldData(characterData.properties.homeworld);
        
        await displayCharacterInfo(characterData, homeworldName);
    } catch (error) {
        displayError();
    } finally {
        findButton.disabled = false;
    }
}

findButton.addEventListener('click', findRandomCharacter);

window.addEventListener('load', findRandomCharacter);