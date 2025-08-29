// Header & footer render, product cards, counters
function renderHeader(){
  const header = qs('#app-header');
  if(!header) return;
  const session = getSession();
  const wishlistCount = getWishlist().length;
  const cartCount = getCart().reduce((n,it)=>n+it.qty,0);

  header.innerHTML = `
    <div class="site-header">
      <div class="container navbar">
        <a href="index.html" class="brand">
          <div class="brand__logo" aria-hidden="true"></div>
          <div class="brand__name">Pequeños Sueños</div>
        </a>

        <nav class="nav-links">
          <a href="shop.html">Tienda</a>
          <a href="about.html">Nosotros</a>
          <a href="faq.html">FAQ</a>
          <a href="contact.html">Contacto</a>
        </nav>

        <div class="nav-right">
          <a class="icon-btn" href="wishlist.html" aria-label="Favoritos">
            ❤️
            <span class="icon-badge" id="wish-badge">${wishlistCount}</span>
          </a>
          <a class="icon-btn" href="cart.html" aria-label="Carrito">
            🛒
            <span class="icon-badge" id="cart-badge">${cartCount}</span>
          </a>
          ${
            session
            ? `<div class="icon-btn" title="${session.name}">👤</div>
               <button class="btn btn-text" id="logout-btn">Salir</button>`
            : `<a class="btn btn-secondary" href="login.html">Acceder</a>`
          }
        </div>
      </div>
    </div>
  `;

  const logoutBtn = qs('#logout-btn', header);
  if(logoutBtn){
    logoutBtn.addEventListener('click', ()=>{
      logout();
      location.href = 'index.html';
    });
  }
}

function renderFooter(){
  const footer = qs('#app-footer');
  if(!footer) return;
  footer.innerHTML = `
    <div class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h4>Pequeños Sueños</h4>
            <p class="muted">Merchandising tierno, seguro y cómodo para tu peque en cada etapa.</p>
          </div>
          <div class="footer-col">
            <h4>Tienda</h4>
            <div><a href="shop.html?category=Ropa">Ropa</a></div>
            <div><a href="shop.html?category=Accesorios">Accesorios</a></div>
            <div><a href="shop.html?category=Juguetes">Juguetes</a></div>
            <div><a href="shop.html?category=Hogar">Hogar</a></div>
          </div>
          <div class="footer-col">
            <h4>Ayuda</h4>
            <div><a href="faq.html">FAQ</a></div>
            <div><a href="contact.html">Contacto</a></div>
          </div>
          <div class="footer-col">
            <h4>Cuenta</h4>
            <div><a href="login.html">Acceder</a></div>
            <div><a href="register.html">Registrarme</a></div>
            <div><a href="wishlist.html">Favoritos</a></div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Pequeños Sueños</span>
          <span class="muted">Precios en Lempiras (HNL)</span>
        </div>
      </div>
    </div>
  `;
}

function updateBadges(){
  const wish = getWishlist().length;
  const cart = getCart().reduce((n,it)=>n+it.qty,0);
  const wb = qs('#wish-badge'); if(wb) wb.textContent = wish;
  const cb = qs('#cart-badge'); if(cb) cb.textContent = cart;
}

function buildProductCard(p){
  const card = document.createElement('article');
  card.className = 'product-card';
  const wishActive = getWishlist().includes(p.id);
  card.innerHTML = `
    <a class="product-card__media" href="product.html?id=${p.id}">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
    </a>
    <div class="product-card__body">
      <h3 class="product-card__title">${p.name}</h3>
      <div class="product-card__meta">
        <span class="product-card__price">${formatMoney(p.price)}</span>
        <span class="rating">★ ${p.rating.toFixed(1)}</span>
      </div>
      <p class="muted">${p.category} · ${p.age}</p>
    </div>
    <div class="product-card__actions">
      <button class="btn btn-primary add-btn">Añadir</button>
      <button class="wish-btn ${wishActive?'active':''}" title="Favorito">❤️</button>
    </div>
  `;

  qs('.add-btn', card).addEventListener('click', ()=>{
    addToCart({ id:p.id, variant:p.age, qty:1 });
    launchConfetti('#b4dcff'); // o el color pastel que quieras
  });
  qs('.wish-btn', card).addEventListener('click', (e)=>{
    e.preventDefault();
    toggleWishlist(p.id);
    e.currentTarget.classList.toggle('active');
    updateBadges();
    launchConfetti('#b4dcff'); // o el color pastel que quieras
  });

  return card;
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderHeader();
  renderFooter();
  updateBadges();
});

document.addEventListener('cart:updated', updateBadges);
document.addEventListener('wishlist:updated', updateBadges);
document.addEventListener('auth:updated', ()=>{ renderHeader(); updateBadges(); });