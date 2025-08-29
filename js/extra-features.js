document.addEventListener('DOMContentLoaded', ()=>{
  // ===== Live Search =====
  const searchInput = document.querySelector('#q');
  if(searchInput){
    const resultsBox = document.createElement('div');
    resultsBox.className = 'live-search-results';
    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(resultsBox);

    searchInput.addEventListener('input', ()=>{
      const term = searchInput.value.trim().toLowerCase();
      if(!term){ resultsBox.innerHTML=''; return; }
      const matches = PRODUCTS.filter(p=> p.name.toLowerCase().includes(term));
      resultsBox.innerHTML = matches.map(m=> `<a href="product.html?id=${m.id}">${m.name} - ${formatMoney(m.price)}</a>`).join('');
    });
  }

  // ===== Quick View =====
  document.body.addEventListener('click', (e)=>{
    if(e.target.classList.contains('quick-view-btn')){
      const id = e.target.dataset.id;
      const p = findProductById(id);
      if(p) openQuickView(p);
    }
  });

  function openQuickView(p){
    const overlay = document.createElement('div');
    overlay.className = 'quick-view-overlay';
    overlay.innerHTML = `
      <div class="quick-view">
        <span class="quick-view-close">&times;</span>
        <img src="${p.img}" alt="${p.name}">
        <h2>${p.name}</h2>
        <p>${formatMoney(p.price)}</p>
        <button class="btn btn-primary" id="qv-add">Añadir al carrito</button>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('.quick-view-close').addEventListener('click', ()=> overlay.remove());
    overlay.querySelector('#qv-add').addEventListener('click', ()=>{
      addToCart({ id:p.id, variant:p.age, qty:1 });
      overlay.remove();
    });
  }

  // ===== Mini Cart =====
  const cartIcon = document.querySelector('a[href="cart.html"]');
  if(cartIcon){
    const miniCart = document.createElement('div');
    miniCart.className = 'mini-cart';
    cartIcon.parentElement.style.position = 'relative';
    cartIcon.parentElement.appendChild(miniCart);

    cartIcon.addEventListener('mouseenter', renderMiniCart);
    cartIcon.parentElement.addEventListener('mouseleave', ()=> miniCart.style.display = 'none');

    function renderMiniCart(){
      const cart = getCart();
      miniCart.innerHTML = '';
      if(cart.length === 0){
        miniCart.innerHTML = '<div style="padding:10px">Carrito vacío</div>';
      } else {
        cart.forEach(it=>{
          const p = findProductById(it.id);
          if(p){
            miniCart.innerHTML += `
              <div class="mini-cart-item">
                <img src="${p.img}" alt="${p.name}">
                <div>${p.name} x${it.qty}</div>
              </div>
            `;
          }
        });
        miniCart.innerHTML += `<div class="mini-cart-footer"><a class="btn btn-primary" href="cart.html">Ver carrito</a></div>`;
      }
      miniCart.style.display = 'flex';
    }
  }

  // ===== Barra envío gratis =====
  const cartContainer = document.querySelector('#cart-container');
  if(cartContainer){
    const bar = document.createElement('div');
    bar.className = 'free-shipping-bar';
    cartContainer.parentElement.insertBefore(bar, cartContainer);
    updateBar();
    document.addEventListener('cart:updated', updateBar);
    function updateBar(){
      const subtotal = cartSubtotal(PRODUCTS);
      const needed = 1500 - subtotal;
      bar.textContent = needed > 0
        ? `Te faltan ${formatMoney(needed)} para envío gratis`
        : '¡Felicidades! Tienes envío gratis 🎉';
    }
  }
});