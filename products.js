// ===== СПІЛЬНІ ДАНІ ТОВАРІВ =====
const PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    cat: 'Смартфони',
    image: 'iphone.png',
    price: 42999,
    old: 47999,
    desc: 'Titanium design, A17 Pro chip, 48MP camera system. The most advanced iPhone ever.',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    cat: 'Смартфони',
    image: 'samsung.png',
    price: 34999,
    old: 38999,
    desc: 'Snapdragon 8 Gen 3, 50MP triple camera, 6.2" Dynamic AMOLED display.',
  },
  {
    id: 3,
    name: 'MacBook Air M3',
    cat: 'Ноутбуки',
    image: 'macbook.png',
    price: 54999,
    old: 59999,
    desc: 'Apple M3 chip, 13.6" Liquid Retina display, up to 18 hours battery life.',
  },
  {
    id: 4,
    name: 'ASUS ZenBook 14',
    cat: 'Ноутбуки',
    image: 'zenbook.png',
    price: 28999,
    old: 32000,
    desc: 'Intel Core Ultra 5, OLED display, compact and lightweight.',
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5',
    cat: 'Навушники',
    image: 'sony.png',
    price: 9999,
    old: 12999,
    desc: 'Industry-leading noise canceling, 30h battery, crystal clear hands-free calling.',
  },
  {
    id: 6,
    name: 'AirPods Pro 2',
    cat: 'Навушники',
    image: 'airpods.png',
    price: 7499,
    old: 8999,
    desc: 'Adaptive Transparency, Personalized Spatial Audio, USB-C charging.',
  },
  {
    id: 7,
    name: 'Apple Watch Series 9',
    cat: 'Годинники',
    image: 'watch.png',
    price: 13999,
    old: 15999,
    desc: 'S9 chip, Double Tap gesture, brighter always-on display.',
  },
  {
    id: 8,
    name: 'iPad Air M2',
    cat: 'Планшети',
    image: 'ipad.png',
    price: 24999,
    old: 27999,
    desc: 'M2 chip, 11" Liquid Retina display, Apple Pencil Pro support.',
  },
  {
    id: 9,
    name: 'PlayStation 5',
    cat: 'Ігри',
    image: 'ps5.png',
    price: 19999,
    old: 22999,
    desc: '4K gaming, ray tracing, DualSense haptic feedback. Next-gen starts here.',
  },
];

// ===== СПІЛЬНІ ФУНКЦІЇ КОШИКА (localStorage) =====
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('logika_cart')) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('logika_cart', JSON.stringify(cart));
}

function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function updateNavCartCount() {
  const el = document.getElementById('cartCount');
  if (el) el.textContent = getCartCount();
}