export function renderNotFound() {
  const app = document.querySelector('#app');
  app.innerHTML = `

    <h1>404 - Página no encontrada</h1>
    <p>La ruta ${window.location.pathname} no existe.</p>
    <p><a href="/inicio" class="nosotros__link" >Volver a inicio</a></p>
  `;
  
}