import { initChatEngine } from "../engine/chatEngine.js";

export function renderChat() {
  console.log("RENDER CHAT EJECUTADO");


  const app = document.querySelector('#app');
  app.innerHTML = `

    <div class="chatApp">

      <header class="chatHeader">
        <h1 class="chatTitle">Chat</h1>

        <select class="personaje" name="personaje" id="persona-select">
          <option value="mago" selected>Eldrin, el Mago Sabio</option>
          <option value="constructor">Don Cacho, el Constructor</option>
          <option value="chef">Luigi Corelli, el Chef</option>
        </select>

      </header>

      <main class="chatMessages" id="chat-messages" aria-label="Mensajes">
      </main>

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

      <button class="deletebtn" id="delete-chat-btn" type="button">
            🗑️ Borrar conversación
      </button>
      
      <div id="status"></div>
      
      <div id="token-usage" style="font-size: 0.8rem; padding: 0.5rem; color: gray;"></div>
    </div>
  `;

initChatEngine();

}