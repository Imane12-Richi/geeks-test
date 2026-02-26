const API_KEY = '16726cef733585d4e67dadc7';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const switchBtn = document.getElementById('switchBtn');
const resultText = document.getElementById('resultText');
const resultBox = document.getElementById('result');

async function fetchSupportedCurrencies() {
    try {
        const response = await fetch(`${BASE_URL}/${API_KEY}/codes`);
        const data = await response.json();

        if (data.result === 'error') {
            throw new Error(data['error-type'] || 'Failed to fetch currencies');
        }

        return data.supported_codes;
    } catch (error) {
        console.error('Error fetching currencies:', error);
        throw error;
    }
}

function populateCurrencyDropdowns(currencies) {
    fromCurrencySelect.innerHTML = '';
    toCurrencySelect.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select currency...';
    fromCurrencySelect.appendChild(defaultOption.cloneNode(true));
    toCurrencySelect.appendChild(defaultOption.cloneNode(true));

    currencies.forEach(([code, name]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${code} — ${name}`;
        
        fromCurrencySelect.appendChild(option.cloneNode(true));
        toCurrencySelect.appendChild(option.cloneNode(true));
    });

    fromCurrencySelect.value = 'EUR';
    toCurrencySelect.value = 'USD';
}

async function convertCurrency() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = parseFloat(amountInput.value);

    if (!fromCurrency || !toCurrency) {
        resultText.textContent = 'Please select both currencies';
        resultText.className = 'error';
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        resultText.textContent = 'Please enter a valid amount';
        resultText.className = 'error';
        return;
    }

    convertBtn.disabled = true;
    convertBtn.textContent = 'Converting...';
    resultText.textContent = 'Converting...';
    resultText.className = '';

    try {
        const response = await fetch(
            `${BASE_URL}/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
        );
        const data = await response.json();

        if (data.result === 'error') {
            throw new Error(data['error-type'] || 'Conversion failed');
        }

        resultText.textContent = `${amount} ${fromCurrency} = ${data.conversion_result.toFixed(2)} ${toCurrency}`;
        resultText.className = 'success';
    } catch (error) {
        console.error('Error converting currency:', error);
        resultText.textContent = `Error: ${error.message}`;
        resultText.className = 'error';
    } finally {
        convertBtn.disabled = false;
        convertBtn.textContent = 'Convert';
    }
}

function switchCurrencies() {
    const fromValue = fromCurrencySelect.value;
    const toValue = toCurrencySelect.value;

    fromCurrencySelect.value = toValue;
    toCurrencySelect.value = fromValue;

    if (resultText.textContent.includes('=')) {
        convertCurrency();
    }
}

async function init() {
    try {
        resultText.textContent = 'Loading currencies...';
        const currencies = await fetchSupportedCurrencies();
        populateCurrencyDropdowns(currencies);
        resultText.textContent = 'Enter amount and click Convert';
        resultText.className = '';
    } catch (error) {
        resultText.textContent = `Error: ${error.message}`;
        resultText.className = 'error';
    }
}

convertBtn.addEventListener('click', convertCurrency);
switchBtn.addEventListener('click', switchCurrencies);

amountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convertCurrency();
    }
});

init();