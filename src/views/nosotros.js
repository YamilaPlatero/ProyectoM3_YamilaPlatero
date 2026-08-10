import { navigateTo } from "../router/router.js";

export function renderNosotros() {
  const app = document.querySelector('#app');
  app.innerHTML = `

  <section>
    <h1>Sobre Nosotros</h1>
    <p>Vamos en busca de experiencias nuevas</p>
    <p>Queremos que tengas una conversacion con tu personaje favorito</p>
    <p><a href="/inicio" class="nosotros__link">Conoce a nuestros personajes</a></p>
  </section>
  `;

}