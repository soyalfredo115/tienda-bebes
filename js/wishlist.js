function renderWishlist(){
  const grid = qs('#wishlist-grid'); const empty = qs('#wishlist-empty');
  if(!grid) return;
  const ids = getWishlist();
  grid.innerHTML = '';

  if(ids.length===0){
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  ids.forEach(id=>{
    const p = findProductById(id);
    if(p) grid.appendChild(buildProductCard(p));
  });
}

document.addEventListener('DOMContentLoaded', renderWishlist);
document.addEventListener('wishlist:updated', renderWishlist);