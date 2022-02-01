const converted = document.getElementById('converted')
function convertCurrency(){
    var amount = parseFloat(document.getElementById('amount-input').value)
    var fromCurrency = document.getElementById('from-list').value.slice(0,3)
    var fromCurrencySymbol = document.getElementById('from-list').value.slice(-3,-1).replace(/[()]/g,'')
    var toCurrency = document.getElementById('to-list').value.slice(0,3)
    var toCurrencySymbol = document.getElementById('to-list').value.slice(-3, -1).replace(/[()]/g,'')

    fetch(`https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${fromCurrency}&to=${toCurrency}&amount=${amount}&language=en`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
            "x-rapidapi-key": "93954fd82dmsh255f82c392d1a04p196711jsna56c443a8743"
        }
    })
    .then(response => response.json())
    .then(response => {
        if(amount.toString() == 'NaN' || amount == 0){
            console.log("Error: Invalid entry.")
        } else {
            converted.innerHTML = `
            <h4 id="conv-from">${parseFloat(response.amount).toFixed(2)} ${response.base_currency_name.replace(/(^\w|\s\w)/g, m => m.toUpperCase())}s <span id="from-symbol">(${fromCurrencySymbol})</span> =</h4>
            <h2 id="conv-to">${parseFloat(response.rates[toCurrency].rate_for_amount).toFixed(2)} ${response.rates[toCurrency].currency_name.replace(/(^\w|\s\w)/g, m => m.toUpperCase())}s <span id="to-symbol">(${toCurrencySymbol})</span></h2>
            <h6>1 ${fromCurrency} = ${parseFloat(response.rates[toCurrency].rate).toFixed(2)} ${toCurrency}</h6>
            <button type="button" class="button2" id="btn" onclick="clearContent()">Clear</button>
            `
        }
    })
    .catch(err => {
        console.error(err);
    });
}

function clearContent(){
    converted.innerHTML = ""
}