// ===== РЕНДЕР КОШИКА =====
function renderCartPage() {
  const cart = getCart();
  console.log('renderCartPage', cart);
  const empty = document.getElementById('cartEmpty');
  const content = document.getElementById('cartContent');

  updateNavCartCount();

  if (!cart.length) {
    empty.style.display = 'block';
    content.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  content.style.display = 'block';

  // Список товарів
  document.getElementById('cartPageItems').innerHTML = cart
    .map(i => `
      <div class="cart-page-item" id="item-${i.id}">
        <div class="cart-page-item-emoji">${i.display}</div>
        <div class="cart-page-item-info">
          <div class="cart-page-item-name">${i.name}</div>
          <div class="cart-page-item-unit">${i.price.toLocaleString('uk-UA')} ₴ / шт.</div>
        </div>
        <div class="cart-page-item-controls">
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${i.id}, -1)">−</button>
            <span class="qty-num">${i.qty}</span>
            <button class="qty-btn" onclick="changeQty(${i.id}, 1)">+</button>
          </div>
          <div class="cart-page-item-price">${(i.price * i.qty).toLocaleString('uk-UA')} ₴</div>
          <button class="remove-btn" onclick="removeItem(${i.id})">🗑</button>
        </div>
      </div>
    `)
    .join('');

  // Підсумок
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('summaryCount').textContent = count;
  document.getElementById('summarySubtotal').textContent = total.toLocaleString('uk-UA') + ' ₴';
  document.getElementById('summaryTotal').textContent = total.toLocaleString('uk-UA') + ' ₴';
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeItem(id);
    return;
  }
  saveCart(cart);
  renderCartPage();
}


function removeItem(id) {
  let cart = getCart();
  cart = cart.filter(x => x.id !== id);
  saveCart(cart);
  renderCartPage();
  showToast('Товар видалено з кошика');
}

// ===== ОЧИСТИТИ КОШИК =====
function clearCart() {
  if (!confirm('Очистити весь кошик?')) return;
  saveCart([]);
  renderCartPage();
}

// ===== ОФОРМИТИ ЗАМОВЛЕННЯ =====
function checkout() {
  alert("Дякуємо за замовлення! 🎉\nМенеджер зв'яжеться з вами найближчим часом.");
  saveCart([]);
  renderCartPage();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

renderCartPage();