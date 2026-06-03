const products = document.querySelectorAll('.product');
const cartProductsContainer = document.querySelector('.cart__products');
const cart = document.querySelector('.cart');
const cartTitle = document.querySelector('.cart__title');
const STORAGE_KEY = 'cart-items';

// Хранилище товаров в корзине
let cartItems = {};

// обновления видимости корзины
const updateCartVisibility = () => {
  const cartItemsCount = Object.keys(cartItems).length;
  
  if (cartItemsCount === 0) {
    cart.style.display = 'none';
  } else {
    cart.style.display = 'block';
  }
};

// добавления/обновления товара в корзине
const addToCart = (productId, quantity, productImage) => {
  if (cartItems[productId]) {
    cartItems[productId] += quantity;
  } else {
    cartItems[productId] = quantity;
  }
  
  renderCart();
  saveToLocalStorage();
};

// удаления товара из корзины
const removeFromCart = (productId) => {
  delete cartItems[productId];
  renderCart();
  saveToLocalStorage();
};

// отрисовка корзины
const renderCart = () => {
  cartProductsContainer.innerHTML = '';
  
  for (const productId in cartItems) {
    const quantity = cartItems[productId];
    const product = document.querySelector(`.product[data-id="${productId}"]`);
    const productImageSrc = product.querySelector('.product__image').src;
    
    const cartProduct = document.createElement('div');
    cartProduct.className = 'cart__product';
    cartProduct.dataset.id = productId;
    
    const cartProductImage = document.createElement('img');
    cartProductImage.className = 'cart__product-image';
    cartProductImage.src = productImageSrc;
    
    const cartProductCount = document.createElement('div');
    cartProductCount.className = 'cart__product-count';
    cartProductCount.textContent = quantity;
    
    // удаление
    const removeButton = document.createElement('div');
    removeButton.className = 'cart__product-remove';
    removeButton.textContent = '×';
    removeButton.style.cssText = 'position: absolute; top: -10px; left: -10px; background: red; color: white; border-radius: 50%; width: 20px; height: 20px; text-align: center; line-height: 20px; cursor: pointer; font-weight: bold;';
    removeButton.addEventListener('click', () => {
      removeFromCart(productId);
    });
    
    cartProduct.appendChild(cartProductImage);
    cartProduct.appendChild(cartProductCount);
    cartProduct.appendChild(removeButton);
    cartProductsContainer.appendChild(cartProduct);
  }
  
  updateCartVisibility();
};

// Сохранение в локалсторе
const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
};

// Загрузка из локалстора
const loadFromLocalStorage = () => {
  const savedItems = localStorage.getItem(STORAGE_KEY);
  if (savedItems) {
    cartItems = JSON.parse(savedItems);
    renderCart();
  }
};

// запуск обработчиков для каждого товара
for (const product of products) {
  const quantityValueElement = product.querySelector('.product__quantity-value');
  const decControl = product.querySelector('.product__quantity-control_dec');
  const incControl = product.querySelector('.product__quantity-control_inc');
  const addButton = product.querySelector('.product__add');
  const productImage = product.querySelector('.product__image').src;
  const productId = product.dataset.id;
  
  // Уменьшение количества
  decControl.addEventListener('click', () => {
    let currentValue = parseInt(quantityValueElement.textContent);
    if (currentValue > 1) {
      currentValue--;
      quantityValueElement.textContent = currentValue;
    }
  });
  
  // Увеличение количества
  incControl.addEventListener('click', () => {
    let currentValue = parseInt(quantityValueElement.textContent);
    currentValue++;
    quantityValueElement.textContent = currentValue;
  });
  
  // Добавление в корзину
  addButton.addEventListener('click', () => {
    const quantity = parseInt(quantityValueElement.textContent);
    addToCart(productId, quantity, productImage);
  });
}

// Загрузка данных при старте
loadFromLocalStorage();

// Dblbvjcnm корзины
updateCartVisibility();