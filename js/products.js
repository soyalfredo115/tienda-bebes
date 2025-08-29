// Catálogo de ejemplo (puedes reemplazar imágenes por las tuyas)
window.PRODUCTS = [
  { id:'p1', name:'Body algodón nube', category:'Ropa', age:'0-3m', price:299, rating:4.8, img:'https://via.placeholder.com/600x400?text=Body+Nube', images:[], tags:['algodón','suave'] },
  { id:'p2', name:'Conjunto menta', category:'Ropa', age:'3-6m', price:520, rating:4.6, img:'https://via.placeholder.com/600x400?text=Conjunto+Menta', images:[], tags:['menta','combo'] },
  { id:'p3', name:'Gorrito celeste', category:'Accesorios', age:'0-3m', price:180, rating:4.5, img:'https://via.placeholder.com/600x400?text=Gorrito+Celeste', images:[], tags:['accesorio'] },
  { id:'p4', name:'Manta suave', category:'Hogar', age:'6-12m', price:450, rating:4.9, img:'https://via.placeholder.com/600x400?text=Manta+Suave', images:[], tags:['hogar'] },
  { id:'p5', name:'Sonajero madera', category:'Juguetes', age:'3-6m', price:250, rating:4.4, img:'https://via.placeholder.com/600x400?text=Sonajero', images:[], tags:['eco'] },
  { id:'p6', name:'Pijama estrellas', category:'Ropa', age:'1-2a', price:590, rating:4.7, img:'https://via.placeholder.com/600x400?text=Pijama+Estrellas', images:[], tags:['pijama'] },
  { id:'p7', name:'Set baberos', category:'Accesorios', age:'6-12m', price:220, rating:4.3, img:'https://via.placeholder.com/600x400?text=Baberos', images:[], tags:['baberos'] },
  { id:'p8', name:'Luz quitamiedos', category:'Hogar', age:'1-2a', price:650, rating:4.6, img:'https://via.placeholder.com/600x400?text=Luz+Quitamiedos', images:[], tags:['luz'] },
  { id:'p9', name:'Camiseta arcoíris', category:'Ropa', age:'3-4a', price:340, rating:4.2, img:'https://via.placeholder.com/600x400?text=Camiseta+Arcoiris', images:[], tags:['color'] },
  { id:'p10', name:'Mochila mini', category:'Accesorios', age:'3-4a', price:720, rating:4.5, img:'https://via.placeholder.com/600x400?text=Mochila+Mini', images:[], tags:['mochila'] },
  { id:'p11', name:'Set bloques pastel', category:'Juguetes', age:'3-4a', price:690, rating:4.8, img:'https://via.placeholder.com/600x400?text=Bloques+Pastel', images:[], tags:['bloques'] },
  { id:'p12', name:'Sudadera menta', category:'Ropa', age:'5-7a', price:780, rating:4.4, img:'https://via.placeholder.com/600x400?text=Sudadera+Menta', images:[], tags:['sudadera'] },
  { id:'p13', name:'Set calcetines', category:'Accesorios', age:'1-2a', price:160, rating:4.1, img:'https://via.placeholder.com/600x400?text=Calcetines', images:[], tags:['pack'] },
  { id:'p14', name:'Peluche conejito', category:'Juguetes', age:'0-3m', price:410, rating:4.9, img:'https://via.placeholder.com/600x400?text=Peluche+Conejito', images:[], tags:['peluche'] },
  { id:'p15', name:'Sábanas cuna', category:'Hogar', age:'0-3m', price:540, rating:4.7, img:'https://via.placeholder.com/600x400?text=Sabanas+Cuna', images:[], tags:['cuna'] },
  { id:'p16', name:'Vestido cielo', category:'Ropa', age:'5-7a', price:850, rating:4.6, img:'https://via.placeholder.com/600x400?text=Vestido+Cielo', images:[], tags:['vestido'] }
];

// Asegura mini galería
window.PRODUCTS.forEach(p=>{
  if(!p.images || p.images.length===0){
    p.images = [
      p.img,
      'https://via.placeholder.com/600x400?text=Detalle+1',
      'https://via.placeholder.com/600x400?text=Detalle+2',
      'https://via.placeholder.com/600x400?text=Detalle+3'
    ];
  }
});

function findProductById(id){ return window.PRODUCTS.find(p=>p.id===id); }

function searchAndFilter({q='',category='',age='',min='',max='',sort='relevance'}){
  q = q.trim().toLowerCase();
  let res = window.PRODUCTS.filter(p=>{
    const inQ = !q || [p.name,...(p.tags||[])].join(' ').toLowerCase().includes(q);
    const inCat = !category || p.category===category;
    const inAge = !age || p.age===age;
    const inMin = !min || p.price >= Number(min);
    const inMax = !max || p.price <= Number(max);
    return inQ && inCat && inAge && inMin && inMax;
  });
  switch(sort){
    case 'price-asc': res.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': res.sort((a,b)=>b.price-a.price); break;
    case 'name-asc': res.sort((a,b)=>a.name.localeCompare(b.name)); break;
    case 'name-desc': res.sort((a,b)=>b.name.localeCompare(a.name)); break;
    default: res.sort((a,b)=>b.rating-a.rating);
  }
  return res;
}