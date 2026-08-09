export function renderNosotros() {
  const app = document.querySelector('#app');
  app.innerHTML = `
  <section>
    <h1>Sobre Nosotros</h1>
    <p>Vamos en busca de experiencias nuevas</p>
    <p>Queremos que tengas una conversacion con tu personaje favorito</p>
    <p><a href="/incio" class="nosotros__link">Ve por tu personaje</a></p>

  </section>
  `;
}