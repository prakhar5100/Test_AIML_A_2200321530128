const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

async function loadCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencyDropdown = document.getElementById("toCurrency");
        
        Object.keys(data.rates).forEach(currency => {
            const option = document.createElement("option");
            option.value = currency;
            option.textContent = `${currency}`;
            currencyDropdown.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching currency data:", error);
    }
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        
        document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error("Error converting currency:", error);
        document.getElementById("result").textContent = "Error in conversion.";
    }
}

window.onload = loadCurrencies;
