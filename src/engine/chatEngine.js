
//? sendMessage (orquestador), historial, 

import { clearInput, clearStatus, disableSendButton, enableSendButton, renderMessages, showError, showRetryState, updateTokenUsage } from "../ui/render.js";
import { buildPayload, normalizeAIResponse } from "../tranform/chatPayload.js";
import { fetchGeminiAPI } from "../services/geminiApi.js";
import { DEFAULT_PERSONA_KEY, PERSONAS } from "../services/prompts.js";
import { getSessionUsage } from "../services/quotaSimulator.js";
import { navigateTo } from "../router/router.js";

const MAX_HISTORY = 12; //límite de mensajes que viajan en cada request


let contents = [];
let isLoading = false;
let currentInstruction = DEFAULT_PERSONA_KEY;

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

// Recorta el historial a los últimos MAX_HISTORY mensajes (user + model juntos).
// Se llama después de cada push, así el array nunca crece sin límite.
function trimHistory() {
  if (contents.length > MAX_HISTORY) {
    contents = contents.slice(-MAX_HISTORY);
  }

  saveConversation();
}

const HISTORY_STORAGE_PREFIX = "historial_"; function getHistoryStorageKey() { return `${HISTORY_STORAGE_PREFIX}${currentInstruction}`; } function saveHistory() { localStorage.setItem( getHistoryStorageKey(), JSON.stringify(contents.slice(-MAX_HISTORY)) ); } function loadHistory() { try { const savedHistory = localStorage.getItem(getHistoryStorageKey()); if (!savedHistory) { return []; } const parsedHistory = JSON.parse(savedHistory); if (!Array.isArray(parsedHistory)) { return []; } return parsedHistory.slice(-MAX_HISTORY); } catch (error) { console.error("Error al cargar el historial:", error); return []; } } export function deleteHistory() { localStorage.removeItem(getHistoryStorageKey()); contents = []; renderMessages(contents); clearStatus(); }

export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Traduce el motivo simulado de la cuota a un mensaje legible para el usuario
function errorMessageFor(quotaReason) {
  if (quotaReason === "TOKENS") {
    return "Se agotó la cuota simulada de tokens de esta sesión. Reiniciá la página para renovarla.";
  }
  return "No se pudo enviar. Intentá de nuevo.";
}

export async function sendMessage(userText) {
  if (isLoading) return;
  if (!userText.trim()) return

  const currentPersona = PERSONAS[currentInstruction]
  const systemInstruction = currentPersona.instruction

  isLoading = true;
  disableSendButton();
  clearStatus()
  clearInput()
  contents.push({ role: "user", parts: [{ text: userText }] });
  trimHistory()
  renderMessages(contents);

  const payload = buildPayload(contents, systemInstruction);

  try {
    const raw = await fetchGeminiAPI(payload);
    contents.push({ role: "model", parts: [{ text: normalizeAIResponse(raw) }] });
    trimHistory()
    renderMessages(contents);
    updateTokenUsage(getSessionUsage())
  } catch (err) {
    if (err.status === 429) {
      const secs = err.retryAfterSeconds ?? 5;
      showRetryState(secs);
      await wait(secs * 1000);
      try {
        const raw2 = await fetchGeminiAPI(payload);
        contents.push({ role: "model", parts: [{ text: normalizeAIResponse(raw2) }] });
        trimHistory()
        renderMessages(contents);
        clearStatus()
      } catch (retryErr) {
        contents.pop(); //sacamos el mensaje de usuario que falló
        showError(errorMessageFor(retryErr.quotaReason));
      }
    } else {
      showError("Error inesperado.");
      console.error(err);
    }
  } finally {
    isLoading = false;
    enableSendButton();
  }
}

export function setSystemInstruction(instruction) { if (!PERSONAS[instruction]) return; currentInstruction = instruction; contents = loadHistory(); renderMessages(contents); clearStatus(); }

const debouncedSend = debounce(sendMessage, 300)
export function initCharacterSelection() {
    const titles = document.querySelectorAll(".personaje-card__title");

    titles.forEach(title => {
        title.addEventListener("click", () => {

            const personaje = title.dataset.personaje;

            console.log("PERSONAJE ELEGIDO:", personaje);

            localStorage.setItem(
                "personajeSeleccionado",
                personaje
            );

            navigateTo("/chat");
        });
    });
}
/**
 * Conecta el motor a los elementos del DOM que renderChat() ya insertó
 * dentro de #app. Se llama una vez, después de setear el innerHTML.
 */
export function initChatEngine() {


  contents = [];

const personajeSeleccionado =
    localStorage.getItem("personajeSeleccionado") || DEFAULT_PERSONA_KEY;

currentInstruction = personajeSeleccionado;

contents = loadHistory();

  const sendButton = document.getElementById("send-btn");
  const inputEl = document.getElementById("chat-input");
  const personaSelect = document.getElementById("persona-select");
  

  if (!sendButton || !inputEl) return;
 
  sendButton.addEventListener("click", () => debouncedSend(inputEl.value));
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") debouncedSend(inputEl.value);
  });
 
  if (personaSelect) {
    personaSelect.value = personajeSeleccionado;

    personaSelect.addEventListener("change", (e) => {
        setSystemInstruction(e.target.value);

        localStorage.setItem(
            "personajeSeleccionado",
            e.target.value
        );
    });

}


  renderMessages(contents);
  updateTokenUsage(getSessionUsage());

}

 
export { PERSONAS };