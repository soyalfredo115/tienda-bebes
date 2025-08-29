// LocalStorage wrappers
const K = {
  cart: 'ps_cart',
  wishlist: 'ps_wishlist',
  users: 'ps_users',
  session: 'ps_session',
  newsletter: 'ps_newsletter'
};

const readJSON = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; }
  catch { return fallback; }
};
const writeJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

// Newsletter
function saveNewsletterEmail(email){
  const list = readJSON(K.newsletter, []);
  if(!list.includes(email)){ list.push(email); writeJSON(K.newsletter, list); }
}

// Wishlist
function getWishlist(){ return readJSON(K.wishlist, []); }
function toggleWishlist(id){
  const w = getWishlist();
  const i = w.indexOf(id);
  if(i>-1){ w.splice(i,1); toast('Quitado de favoritos'); }
  else{ w.push(id); toast('Agregado a favoritos'); }
  writeJSON(K.wishlist, w);
  document.dispatchEvent(new CustomEvent('wishlist:updated'));
  return w;
}

// Cart
function getCart(){ return readJSON(K.cart, []); } // {id, qty, variant}
function setCart(c){ writeJSON(K.cart, c); document.dispatchEvent(new CustomEvent('cart:updated')); }
function addToCart(item){
  const cart = getCart();
  const idx = cart.findIndex(c => c.id===item.id && c.variant===item.variant);
  if(idx>-1){ cart[idx].qty = clamp(cart[idx].qty + item.qty, 1, 99); }
  else{ cart.push({...item, qty: clamp(item.qty,1,99)}); }
  setCart(cart);
  toast('Producto agregado al carrito');
}
function updateCart(id, variant, qty){
  const cart = getCart();
  const i = cart.findIndex(c => c.id===id && c.variant===variant);
  if(i>-1){
    if(qty<=0){ cart.splice(i,1); }
    else{ cart[i].qty = clamp(qty,1,99); }
    setCart(cart);
  }
}
function clearCart(){ setCart([]); }

// Cart totals
function cartSubtotal(products){
  const cart = getCart();
  return cart.reduce((sum, it)=>{
    const p = products.find(x=>x.id===it.id);
    return sum + (p ? p.price * it.qty : 0);
  },0);
}
function cartShipping(subtotal){
  if(subtotal===0) return 0;
  // Envío fijo base con promo por compras mayores
  return subtotal >= 1500 ? 0 : 150;
}
function cartTotal(products){
  const sub = cartSubtotal(products);
  return { sub, ship: cartShipping(sub), total: sub + cartShipping(sub) };
}

// Auth (simulada)
function getUsers(){ return readJSON(K.users, []); }
function setUsers(u){ writeJSON(K.users, u); }
function getSession(){ return readJSON(K.session, null); }
function setSession(user){ writeJSON(K.session, user); document.dispatchEvent(new CustomEvent('auth:updated')); }
function logout(){ localStorage.removeItem(K.session); document.dispatchEvent(new CustomEvent('auth:updated')); }

function registerUser({name,email,password}){
  const users = getUsers();
  if(users.some(u=>u.email===email)) return {ok:false,msg:'Este correo ya está registrado.'};
  const user = { id: uid('u'), name, email, password };
  users.push(user); setUsers(users); setSession({id:user.id,name:user.name,email:user.email});
  return {ok:true};
}
function loginUser({email,password}){
  const user = getUsers().find(u=>u.email===email && u.password===password);
  if(!user) return {ok:false,msg:'Correo o contraseña inválidos.'};
  setSession({id:user.id,name:user.name,email:user.email});
  return {ok:true};
}