function renderSummary(){
  const sumItems = qs('#summary-items');
  if(!sumItems) return;
  const cart = getCart();
  sumItems.innerHTML = '';
  cart.forEach(it=>{
    const p = findProductById(it.id);
    if(p){
      const div = document.createElement('div');
      div.className = 'summary-row';
      div.innerHTML = `<span>${p.name} × ${it.qty}</span><strong>${formatMoney(p.price * it.qty)}</strong>`;
      sumItems.appendChild(div);
    }
  });
  const totals = cartTotal(window.PRODUCTS);
  qs('#sum-subtotal').textContent = formatMoney(totals.sub);
  qs('#sum-shipping').textContent = formatMoney(totals.ship);
  qs('#sum-total').textContent = formatMoney(totals.total);
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderSummary();

  const form = qs('#checkout-form');
  const hint = qs('#checkout-hint');
  const successPanel = qs('#order-success');

  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      // Validaciones simples
      if(!form.fullName.value.trim() || !isValidEmail(form.email.value) || !form.address.value.trim()){
        hint.textContent = 'Por favor, completa todos los campos requeridos correctamente.';
        hint.className = 'form-hint error';
        return;
      }
      // Simulación de pago
      const orderNo = uid('ORD');
      clearCart();
      form.hidden = true;
      qs('.order-summary').hidden = true;
      successPanel.hidden = false;
      qs('#order-number').textContent = orderNo;
    });
  }
});