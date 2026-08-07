export function renderInicio() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <h1>¡Podras elegir con quien mantener una conversacion!</h1>
    <p>Bienvenido a nuestra aplicación de Chat Dinamico para que puedas interactuar con tu personaje favorito</p>
    <div class="card">
    <h2 class="card__name">Yamila Platero</h2>
    <p class="card__role">Futura desarrolladora de Frontend</p>
    <p class="card__bio">
      Apasionada por crear interfaces accesibles y responsivas. 
      Especializada en CSS moderno y JavaScript.
    </p>
    <div class="card__stats">
      <div class="stat">
        <span class="stat__value">127</span>
        <span class="stat__label">Proyectos</span>
      </div>
      <div class="stat">
        <span class="stat__value">2.4k</span>
        <span class="stat__label">Seguidores</span>
      </div>
      <div class="stat">
        <span class="stat__value">89</span>
        <span class="stat__label">Siguiendo</span>
      </div>
    </div>
    <p><a href="/nosotros" class="nosotros__link">Conoce a nuestro equipo</a></p>
  `;
}