document.addEventListener('DOMContentLoaded', function() {
    const baseCurrency = document.getElementById('baseCurrency');
    const targetCurrency = document.getElementById('targetCurrency');
    
   
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                let option = document.createElement('option');
                option.value = currency;
                option.text = currency;
                baseCurrency.add(option);

                option = document.createElement('option');
                option.value = currency;
                option.text = currency;
                targetCurrency.add(option);
            });
        });
});

function convertCurrency() {
    const baseCurrency = document.getElementById('baseCurrency').value;
    const targetCurrency = document.getElementById('targetCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const resultDiv = document.getElementById('result');

    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerText = "Please enter a valid amount.";
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[targetCurrency];
            if (!rate) {
                resultDiv.innerText = `Unable to get the exchange rate for ${targetCurrency}.`;
                return;
            }
            const convertedAmount = (amount * rate).toFixed(2);
            resultDiv.innerText = `${amount} ${baseCurrency} = ${convertedAmount} ${targetCurrency}`;
        })
        .catch(error => {
            resultDiv.innerText = "Error fetching exchange rates. Please try again later.";
            console.error("Error fetching exchange rates:", error);
        });
}
