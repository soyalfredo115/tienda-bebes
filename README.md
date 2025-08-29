# 🍼 Pequeños Sueños — Tienda Online de Merchandising Infantil

**Pequeños Sueños** es un front‑end completo, modular y totalmente funcional para una tienda online especializada en merchandising para bebés (0‑3m) y niños hasta 6‑7 años.  
Incluye navegación por catálogo, filtros, carrito persistente, favoritos, login/registro simulado, checkout, páginas informativas y toques “cute” con tonos pastel azul celeste y verde menta.

## ✨ Características

- **Diseño pastel “cute”** con patrones SVG y estilos agradables a la vista.
- **Estructura modular**: HTML, CSS y JS separados para fácil mantenimiento.
- **Tienda completa** con:
  - Catálogo filtrable y búsqueda avanzada
  - Ficha de producto con variantes
  - Carrito persistente (localStorage)
  - Lista de favoritos
  - Login/registro simulados
  - Checkout con validaciones
- **Extras UX**:
  - Vista rápida de producto
  - Mini‑carrito flotante
  - Búsqueda en vivo
  - Barra de “envío gratis” gamificada
  - Animaciones suaves y confeti pastel 🎉

## 📂 Estructura del Proyecto


/ (raíz) ├── index.html ├── shop.html ├── product.html ├── cart.html ├── checkout.html ├── wishlist.html ├── login.html ├── register.html ├── about.html ├── contact.html ├── faq.html ├── 404.html ├── css/ │   ├── base.css │   ├── layout.css │   ├── components.css │   ├── pages.css │   ├── animations.css │   └── extra-features.css ├── js/ │   ├── utils.js │   ├── storage.js │   ├── products.js │   ├── ui.js │   ├── shop.js │   ├── product-detail.js │   ├── cart.js │   ├── wishlist.js │   ├── auth.js │   ├── checkout.js │   └── extra-features.js └── assets/ └── img/ (imágenes y favicon)

## 🚀 Instalación y uso

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/soyalfredo115/tienda-bebes.git
   cd TU-REPO


- Abrir el proyecto
- Opción rápida: abrir index.html en tu navegador.
- Opción recomendada (para rutas correctas):
# Con Python 3
python -m http.server 5500
# Con Node (npm i -g serve)
serve . -p 5500
- Luego visita: http://localhost:5500
- Personalizar el catálogo
- Edita js/products.js con tus productos reales (nombre, precio, imágenes).
- Agregar tus imágenes
- Coloca tus imágenes en assets/img/ y actualiza las rutas en products.js o en HTML.
🛠 Tecnologías usadas- HTML5
- CSS3 (variables, responsive, flex, grid)
- JavaScript (ES6+, localStorage)
- Sin dependencias externas — todo es código nativo
🖼 Capturas de pantalla(Agrega aquí imágenes o GIFs de tu proyecto en funcionamiento)🤝 Contribuir- Haz un fork del repositorio.
- Crea tu rama de característica: git checkout -b feature/nueva-funcion
- Haz commit de tus cambios: git commit -m 'Agrego nueva función'
- Haz push a la rama: git push origin feature/nueva-funcion
- Crea un Pull Request.
📜 LicenciaEste proyecto está bajo la Licencia MIT.
Puedes usarlo, modificarlo y distribuirlo libremente.💡 AutorDesarrollado por Cesar con 💙 y atención a cada detalle para ofrecer una experiencia única y agradable.
