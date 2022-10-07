const dropList = document.querySelectorAll(".drop-list select"),
getButton = document.querySelector("form button"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
exchangeIcon = document.querySelector(".drop-list .icon");
for(let i =0;i<dropList.length;i++) {
    for(currency_code in country_code) {
        // setting INR and USD as default for From and To respectively
        let selected;
        if(i==0){
            selected = currency_code == "INR" ? "selected" : "";
        }
        else if(i==1) {
            selected = currency_code == "USD" ? "selected" : "";

        }
        // creating option tag with passing currency
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend",optionTag);
    }
    dropList[i].addEventListener("change",event => {
        flagLoad(event.target);
    });
}

function flagLoad(element){
    for(code in country_code) {
        if(code == element.value) {
            let imgTag = element.parentElement.querySelector("img"); 
            imgTag.src = `https://flagcdn.com/48x36/${country_code[code].toLowerCase()}.png`;
        }
    }
}

exchangeIcon.addEventListener("click",()=>{
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    flagLoad(fromCurrency);
    flagLoad(toCurrency);
    getExchangeRate();

});

window.addEventListener("load",()=>{
    getExchangeRate();
});

getButton.addEventListener("click",(event)=>{
    event.preventDefault();
    getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    const exchangeRateText = document.querySelector(".exchange-rate");
    let amountValue = amount.value;
    if(amountValue=="" || amountValue=="0") {
        amountValue = 1;
        amount.value = "1";
    }
    exchangeRateText.textContent = "Getting Exchange Rate...";
    let url = `https://v6.exchangerate-api.com/v6/77ea01e13209e663a089a771/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountValue * exchangeRate).toFixed(3);
        console.log(totalExchangeRate);
        exchangeRateText.textContent = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(()=>{
        exchangeRateText.textContent = "Something went wrong";
    });
}
