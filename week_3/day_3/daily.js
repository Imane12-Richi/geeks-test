// Replace with your own API key from https://www.exchangerate-api.com/
const API_KEY = 'YOUR-API-KEY';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

// DOM elements
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const switchBtn = document.getElementById('switch-btn');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');

// Hide all dynamic sections
function hideAll() {
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    loadingDiv.classList.add('hidden');
}

// Show loading
function showLoading() {
    loadingDiv.classList.remove('hidden');
}

// Show error message
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Show result
function showResult(from, to, amount, converted, rate) {
    resultDiv.innerHTML = `
        ${amount} ${from} = <strong>${converted.toFixed(2)} ${to}</strong><br>
        <small>(1 ${from} = ${rate.toFixed(4)} ${to})</small>
    `;
    resultDiv.classList.remove('hidden');
}

// Fetch supported currencies and populate dropdowns
async function loadCurrencies() {
    hideAll();
    showLoading();

    try {
        const response = await fetch(`${BASE_URL}/${API_KEY}/codes`);
        if (!response.ok) throw new Error('Failed to fetch currencies');
        const data = await response.json();

        if (data.result === 'success') {
            const currencies = data.supported_codes; // [['USD', 'United States Dollar'], ...]
            populateSelects(currencies);
        } else {
            throw new Error('API error: ' + data['error-type']);
        }
    } catch (err) {
        showError('Error loading currencies. Please refresh.');
        console.error(err);
    } finally {
        loadingDiv.classList.add('hidden');
    }
}

// Fill both selects with options
function populateSelects(currencies) {
    // Clear existing options
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    currencies.forEach(([code, name]) => {
        const optionFrom = document.createElement('option');
        optionFrom.value = code;
        optionFrom.textContent = `${code} – ${name}`;
        fromSelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = code;
        optionTo.textContent = `${code} – ${name}`;
        toSelect.appendChild(optionTo);
    });

    // Set default selections: EUR -> USD
    fromSelect.value = 'EUR';
    toSelect.value = 'USD';
}

// Perform conversion
async function convertCurrency() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = parseFloat(amountInput.value);

    if (!from || !to || isNaN(amount) || amount <= 0) {
        showError('Please enter a valid amount and select currencies.');
        return;
    }

    hideAll();
    showLoading();

    try {
        // Use pair conversion with amount
        const response = await fetch(`${BASE_URL}/${API_KEY}/pair/${from}/${to}/${amount}`);
        if (!response.ok) throw new Error('Conversion failed');
        const data = await response.json();

        if (data.result === 'success') {
            const converted = data.conversion_result;
            const rate = data.conversion_rate;
            showResult(from, to, amount, converted, rate);
        } else {
            throw new Error('API error: ' + data['error-type']);
        }
    } catch (err) {
        showError('Conversion error. Please try again.');
        console.error(err);
    } finally {
        loadingDiv.classList.add('hidden');
    }
}

// Switch the two currencies
function switchCurrencies() {
    const fromVal = fromSelect.value;
    const toVal = toSelect.value;
    fromSelect.value = toVal;
    toSelect.value = fromVal;
    // Immediately convert if a result is already shown
    if (!resultDiv.classList.contains('hidden') || !errorDiv.classList.contains('hidden')) {
        convertCurrency();
    }
}

// Event listeners
convertBtn.addEventListener('click', convertCurrency);
switchBtn.addEventListener('click', switchCurrencies);

// Load currencies on page load
window.addEventListener('load', loadCurrencies);