function renderProductsGrid(list, page=1, perPage=9){
  const grid = qs('#products-grid'); const count = qs('#results-count');
  const empty = qs('#empty-state'); const pag = qs('#pagination');
  if(!grid) return;

  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  page = clamp(page, 1, pages);
  const start = (page-1)*perPage;
  const slice = list.slice(start, start+perPage);

  grid.innerHTML = '';
  slice.forEach(p => grid.appendChild(buildProductCard(p)));

  count.textContent = `${total} resultado${total!==1?'s':''}`;
  empty.hidden = total>0;

  // Pagination
  pag.innerHTML = '';
  if(pages>1){
    for(let i=1;i<=pages;i++){
      const b = document.createElement('button');
      b.className = 'page-btn' + (i===page?' active':'');
      b.textContent = i;
      b.addEventListener('click', ()=>{
        renderProductsGrid(list, i, perPage);
        window.scrollTo({ top: qs('.shop-layout').offsetTop - 20, behavior: 'smooth' });
      });
      pag.appendChild(b);
    }
  }
}

function syncFiltersFromURL(form){
  const url = new URLSearchParams(location.search);
  ['q','category','age','min','max','sort'].forEach(k=>{
    if(url.has(k) && form[k]) form[k].value = url.get(k);
  });
}

function applyFilters(form){
  const data = {
    q: form.q.value,
    category: form.category.value,
    age: form.age.value,
    min: form.min.value,
    max: form.max.value,
    sort: form.sort.value
  };
  const list = searchAndFilter(data);
  renderProductsGrid(list, 1);
}

document.addEventListener('DOMContentLoaded', ()=>{
  const form = qs('#filters-form'); if(!form) return;

  // If came with category param
  syncFiltersFromURL(form);
  applyFilters(form);

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    applyFilters(form);
  });

  qs('#clear-filters').addEventListener('click', ()=>{
    form.reset();
    applyFilters(form);
    history.replaceState({}, '', 'shop.html');
  });
});