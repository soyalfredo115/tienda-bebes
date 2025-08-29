function renderProductDetail(p){
  const cont = qs('#product-container');
  if(!cont || !p) return;

  cont.innerHTML = `
    <div class="product-gallery">
      <img class="product-main" id="main-img" src="${p.images[0]}" alt="${p.name}">
      <div class="product-thumbs">
        ${p.images.map((src,i)=>`<img src="${src}" alt="Vista ${i+1}" class="${i===0?'active':''}">`).join('')}
      </div>
    </div>

    <div class="product-info">
      <h1>${p.name}</h1>
      <div class="kv">
        <span class="badge">${p.category}</span>
        <span class="badge">${p.age}</span>
        <span class="badge rating">★ ${p.rating.toFixed(1)}</span>
      </div>
      <p class="price">${formatMoney(p.price)}</p>
      <p class="muted">Materiales hipoalergénicos y tintes seguros para peques.</p>

      <div>
        <p><strong>Selecciona edad/talla:</strong></p>
        <div class="variant-row" id="variant-row">
          <!-- Usamos age como variante por simplicidad -->
          ${['0-3m','3-6m','6-12m','1-2a','3-4a','5-7a'].map(v=>`
            <button class="variant ${v===p.age?'active':''}" data-v="${v}">${v}</button>
          `).join('')}
        </div>
      </div>

      <div class="qty-row" style="margin-top:10px">
        <label for="qty"><strong>Cantidad:</strong></label>
        <input type="number" id="qty" min="1" value="1" style="max-width:100px">
      </div>

      <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-primary" id="add-cart">Añadir al carrito</button>
        <button class="btn btn-secondary" id="buy-now">Comprar ahora</button>
        <button class="wish-btn" id="wish-btn">❤️ Favorito</button>
      </div>
    </div>
  `;

  // Thumbs
  const main = qs('#main-img', cont);
  qsa('.product-thumbs img', cont).forEach(img=>{
    img.addEventListener('click', ()=>{
      qsa('.product-thumbs img', cont).forEach(t=>t.classList.remove('active'));
      img.classList.add('active'); main.src = img.src;
    });
  });

  // Variant
  let variant = p.age;
  qsa('.variant', cont).forEach(b=>{
    b.addEventListener('click', ()=>{
      qsa('.variant', cont).forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      variant = b.dataset.v;
    });
  });

  // Wishlist state
  const wb = qs('#wish-btn', cont);
  if(getWishlist().includes(p.id)) wb.classList.add('active');
  wb.addEventListener('click', ()=>{
    toggleWishlist(p.id);
    wb.classList.toggle('active');
  });

  // Add to cart
  qs('#add-cart', cont).addEventListener('click', ()=>{
    const qty = parseInt(qs('#qty', cont).value || '1', 10);
    addToCart({ id:p.id, variant, qty });
  });

  // Buy now
  qs('#buy-now', cont).addEventListener('click', ()=>{
    const qty = parseInt(qs('#qty', cont).value || '1', 10);
    addToCart({ id:p.id, variant, qty });
    location.href = 'checkout.html';
  });

  // Related
  const related = window.PRODUCTS
    .filter(x=>x.category===p.category && x.id!==p.id)
    .slice(0,4);
  const relCont = qs('#related-products');
  if(relCont){ relCont.innerHTML = ''; related.forEach(r=>relCont.appendChild(buildProductCard(r))); }
}

document.addEventListener('DOMContentLoaded', ()=>{
  const id = getParam('id');
  const p = findProductById(id);
  const crumb = qs('#breadcrumb-product');
  if(crumb) crumb.textContent = p ? p.name : 'Producto';
  if(!p){ location.href = '404.html'; return; }
  renderProductDetail(p);
});