// Importar renders
import { renderInicio } from '../views/inicio.js';
import { renderChat } from '../views/chat.js';
import { renderNosotros } from '../views/nosotros.js';
import { renderNotFound } from '../views/notFound.js';

// Tabla de rutas
const routes = {
  '/inicio': renderInicio,
  '/chat': renderChat,
  '/nosotros': renderNosotros,
};


// Router: lee pathname y renderiza
export function router() {
  const path = window.location.pathname;
  

   if (path === "/") {
    history.replaceState({}, "", "/nosotros");
    return router();
  }

  const render = routes[path] || renderNotFound;
  render();
  updateActiveLink();
  
}

// Actualiza la clase 'active' en los enlaces de navegación
function updateActiveLink() {
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
    if (link.pathname === window.location.pathname) {
      link.classList.add('active');
    }
  });
}


export function navigateTo(path) {
  history.pushState(null, '', path);
  router(); // CRÍTICO: pushState NO dispara popstate
  window.scrollTo(0, 0);
}