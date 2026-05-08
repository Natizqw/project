
let activeTab = 'Всі';


function getCategories() {
  return ['Всі', ...new Set(PRODUCTS.map(p => p.cat))];
}


function renderTabs() {
  const el = document.getElementById('tabs');
  el.innerHTML = getCategories().map(c => `
    <button class="tab-btn${c === activeTab ? ' active' : ''}" onclick="setTab('${c}')">
      ${c}
    </button>
  `).join('');
}

function setTab(cat) {
  activeTab = cat;
  renderTabs();
  renderSections();

  const first = document.querySelector('.cat-section');
  if (first) first.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


function renderSections() {
  const el = document.getElementById('categorySections');

  const cats = activeTab === 'Всі'
    ? [...new Set(PRODUCTS.map(p => p.cat))]
    : [activeTab];

  el.innerHTML = cats.map(cat => {
    const items = PRODUCTS.filter(p => p.cat === cat);
    return `
      <div class="cat-section" id="cat-${cat}">
        <div class="cat-heading">
          <span class="cat-heading-line"></span>
          <span class="cat-heading-text">${cat}</span>
          <span class="cat-heading-line"></span>
        </div>
        <div class="grid">
          ${items.map(p => `
            <div class="card" onclick="openModal(${p.id})">
              <div class="card-img">${p.image ? `<img src="${p.image}" alt="${p.name}">` : p.emoji}</div>
              <div class="card-body">
                <span class="card-cat">${p.cat}</span>
                <div class="card-name">${p.name}</div>
                <div class="card-prices">
                  <span class="card-price">${p.price.toLocaleString('uk-UA')} ₴</span>
                  <span class="card-old">${p.old.toLocaleString('uk-UA')} ₴</span>
                </div>
                <button type="button" class="add-btn" onclick="event && event.stopPropagation(); addToCart(${p.id});">🛒 До кошика</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}


function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return console.error('Product not found for modal:', id);
  document.getElementById('mEmoji').innerHTML = p.image ? `<img src="${p.image}" alt="${p.name}">` : p.emoji;
  document.getElementById('mCat').textContent = p.cat;
  document.getElementById('mName').textContent = p.name;
  document.getElementById('mDesc').textContent = p.desc;
  document.getElementById('mPrice').textContent = p.price.toLocaleString('uk-UA') + ' ₴';
  document.getElementById('mAddBtn').onclick = () => { addToCart(p.id); closeModal(); };
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}


function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return console.error('Product not found for cart:', id);
  const cart = getCart();
  const item = cart.find(x => x.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id: p.id, name: p.name, display: p.image ? `<img src="${p.image}" alt="${p.name}">` : p.emoji, price: p.price, qty: 1 });
  }
  saveCart(cart);
  console.log('addToCart', id, cart);
  updateNavCartCount();
  showToast((p.image ? p.name : p.emoji + ' ' + p.name) + ' додано до кошика!');
}


function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}


updateNavCartCount();
renderTabs();
renderSections();