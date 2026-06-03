const loader = document.getElementById('loader');
const itemsContainer = document.getElementById('items');

fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
  .then(response => response.json())
  .then(data => {
    loader.classList.remove('loader_active');
    
    const currencies = data.response.Valute;
    
    for (const code in currencies) {
      const currency = currencies[code];
      
      const itemElement = document.createElement('div');
      itemElement.className = 'item';
      
      const codeElement = document.createElement('div');
      codeElement.className = 'item__code';
      codeElement.textContent = currency.CharCode;
      
      const valueElement = document.createElement('div');
      valueElement.className = 'item__value';
      valueElement.textContent = currency.Value;
      
      const currencyElement = document.createElement('div');
      currencyElement.className = 'item__currency';
      currencyElement.textContent = 'руб.';
      
      itemElement.appendChild(codeElement);
      itemElement.appendChild(valueElement);
      itemElement.appendChild(currencyElement);
      
      itemsContainer.appendChild(itemElement);
    }
  })
  .catch(error => {
    console.error('Ошибка загрузки курса валют:', error);
    loader.classList.remove('loader_active');
  });