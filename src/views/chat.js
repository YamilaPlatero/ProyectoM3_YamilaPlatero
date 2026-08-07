import { initChatEngine } from "../engine/chatEngine.js";

export function renderChat() {
  console.log("RENDER CHAT EJECUTADO");


  const app = document.querySelector('#app');
  app.innerHTML = `
    <div class="chatApp">
      <header class="chatHeader">
        <h1 class="chatTitle">Chat</h1>
        <!-- AGREGADO id="persona-select" para que chatEngine detecte el cambio -->
        <select class="personaje" name="personaje" id="persona-select">
          <option value="mago" selected>Eldrin, el Mago Sabio</option>
          <option value="constructor">Don Cacho, el Constructor</option>
          <option value="chef">Luigi Corelli, el Chef</option>
        </select>
      </header>

      <!-- AGREGADO id="chat-messages" y limpiados los divs fijos -->
      <main class="chatMessages" id="chat-messages" aria-label="Mensajes">
        <!-- El JavaScript creará y pintará los mensajes coloridos aquí adentro automáticamente -->
      </main>

      <!-- Cambiado el form para que use el botón e input con sus IDs correspondientes -->
      <form class="chatComposer" onsubmit="event.preventDefault();">
        <input 
          class="chatInput" 
          id="chat-input"
          type="text" 
          placeholder="Escribe tu mensaje…"
          aria-label="Escribe tu mensaje"
        />
        <button class="chatSend" id="send-btn" type="button">Enviar</button>
      </form>
      
      <!-- Pequeño contenedor para errores o reintentos si falla la IA -->
      <div id="status"></div>
      <!-- Pequeño contenedor para ver el uso simulado de tokens -->
      <div id="token-usage" style="font-size: 0.8rem; padding: 0.5rem; color: gray;"></div>
    </div>
  `;


initChatEngine();

}