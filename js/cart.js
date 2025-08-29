function renderCart(){
  const cont = qs('#cart-container'); if(!cont) return;
  const cart = getCart();
  cont.innerHTML = '';

  if(cart.length===0){
    cont.innerHTML = `<div class="empty-state">Tu carrito está vacío.</div>`;
    qs('#go-checkout')?.setAttribute('aria-disabled','true');
    return;
  }

  cart.forEach(it=>{
    const p = findProductById(it.id);
    if(!p) return;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${p.img}" alt="${p.name}" width="80" height="80" style="object-fit:cover;border-radius:12px">
      <div>
        <div class="item-title">${p.name}</div>
        <div class="muted">${p.category} · ${it.variant}</div>
        <div class="muted">${formatMoney(p.price)}</div>
      </div>
      <div class="item-controls">
        <button class="page-btn dec">−</button>
        <input type="number" class="qty" min="1" value="${it.qty}" style="width:64px">
        <button class="page-btn inc">+</button>
        <button class="btn btn-text remove">Eliminar</button>
      </div>
    `;
        qs('.inc', row).addEventListener('click', ()=> updateCart(it.id, it.variant, it.qty+1));
    qs('.qty', row).addEventListener('change', (e)=>{
      updateCart(it.id, it.variant, parseInt(e.target.value, 10) || 1);
    });
    qs('.remove', row).addEventListener('click', ()=> updateCart(it.id, it.variant, 0));
    cont.appendChild(row);
  });

  // Totales
  const totals = cartTotal(window.PRODUCTS);
  const summary = document.createElement('div');
  summary.className = 'cart-summary card';
  summary.innerHTML = `
    <div class="summary-row"><span>Subtotal</span><strong>${formatMoney(totals.sub)}</strong></div>
    <div class="summary-row"><span>Envío</span><strong>${formatMoney(totals.ship)}</strong></div>
    <div class="summary-row total"><span>Total</span><strong>${formatMoney(totals.total)}</strong></div>
  `;
  cont.appendChild(summary);
}

document.addEventListener('DOMContentLoaded', renderCart);
document.addEventListener('cart:updated', renderCart);