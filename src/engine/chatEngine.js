
//? sendMessage (orquestador), historial

import {
  clearInput,
  clearStatus,
  disableSendButton,
  enableSendButton,
  renderMessages,
  showError,
  showRetryState,
  updateTokenUsage
} from "../ui/render.js";

import {
  buildPayload,
  normalizeAIResponse
} from "../tranform/chatPayload.js";

import { fetchGeminiAPI } from "../services/geminiApi.js";

import {
  DEFAULT_PERSONA_KEY,
  PERSONAS
} from "../services/prompts.js";

import { getSessionUsage } from "../services/quotaSimulator.js";
import { navigateTo } from "../router/router.js";


const MAX_HISTORY = 12;

const HISTORY_STORAGE_PREFIX = "chatHistory_";

let contents = [];
let isLoading = false;
let currentInstruction = DEFAULT_PERSONA_KEY;


// -----------------------------
// LOCAL STORAGE
// -----------------------------

function getHistoryKey() {
  return `${HISTORY_STORAGE_PREFIX}${currentInstruction}`;
}


function saveHistory() {
  const history = contents.slice(-MAX_HISTORY);

  localStorage.setItem(
    getHistoryKey(),
    JSON.stringify(history)
  );

  console.log(
    "Historial guardado:",
    getHistoryKey(),
    history
  );
}


function loadHistory() {
  try {

    const saved =
      localStorage.getItem(
        getHistoryKey()
      );

    if (!saved) {
      console.log(
        "No hay historial para:",
        getHistoryKey()
      );

      return [];
    }

    const history =
      JSON.parse(saved);

    if (!Array.isArray(history)) {
      return [];
    }

    const limitedHistory =
      history.slice(-MAX_HISTORY);

    console.log(
      "Historial cargado:",
      getHistoryKey(),
      limitedHistory
    );

    return limitedHistory;

  } catch (error) {

    console.error(
      "Error cargando historial:",
      error
    );

    return [];
  }
}

export function deleteHistory() {
  const confirmed = confirm(
    "¿Querés borrar esta conversación?"
  );

  if (!confirmed) return;

  localStorage.removeItem(getHistoryKey());

  contents = [];

  renderMessages(contents);
  clearStatus();

  console.log(
    "Historial eliminado:",
    getHistoryKey()
  );
}


// -----------------------------
// UTILIDADES
// -----------------------------

function wait(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}


function trimHistory() {

  if (contents.length > MAX_HISTORY) {

    contents =
      contents.slice(-MAX_HISTORY);

  }

}


// -----------------------------
// DEBOUNCE
// -----------------------------

export function debounce(fn, delay) {

  let timer = null;

  return function (...args) {

    clearTimeout(timer);

    timer = setTimeout(
      () => fn.apply(this, args),
      delay
    );

  };
}


// -----------------------------
// ERRORES
// -----------------------------

function errorMessageFor(quotaReason) {

  if (quotaReason === "TOKENS") {

    return "Se agotó la cuota simulada de tokens de esta sesión. Reiniciá la página para renovarla.";

  }

  return "No se pudo enviar. Intentá de nuevo.";

}
function getCurrentCharacter() { return PERSONAS[currentInstruction]?.label ?? "IA"; }

// -----------------------------
// SEND MESSAGE
// -----------------------------

export async function sendMessage(userText) {

  if (isLoading) return;

  if (!userText.trim()) return;


  const currentPersona =
    PERSONAS[currentInstruction];

  const systemInstruction =
    currentPersona.instruction;


  isLoading = true;

  disableSendButton();

  clearStatus();

  clearInput();


  contents.push({
    role: "user",
    parts: [
      {
        text: userText
      }
    ]
  });


  trimHistory();

  saveHistory();

 renderMessages(contents, getCurrentCharacter());


  const payload =
    buildPayload(
      contents,
      systemInstruction
    );


  try {

    const raw =
      await fetchGeminiAPI(payload);


    const aiText =
      normalizeAIResponse(raw);


    contents.push({
      role: "model",
      parts: [
        {
          text: aiText
        }
      ]
    });


    trimHistory();

    saveHistory();

renderMessages(contents, getCurrentCharacter());

    updateTokenUsage(
      getSessionUsage()
    );


  } catch (err) {

    if (err.status === 429) {

      const secs =
        err.retryAfterSeconds ?? 5;

      showRetryState(secs);

      await wait(
        secs * 1000
      );


      try {

        const raw2 =
          await fetchGeminiAPI(payload);


        const aiText =
          normalizeAIResponse(raw2);


        contents.push({
          role: "model",
          parts: [
            {
              text: aiText
            }
          ]
        });


        trimHistory();

        saveHistory();

renderMessages(contents, getCurrentCharacter());
        clearStatus();


      } catch (retryErr) {

        contents.pop();

        saveHistory();

        showError(
          errorMessageFor(
            retryErr.quotaReason
          )
        );

      }


    } else {

      showError(
        "Error inesperado."
      );

      console.error(err);

    }

  } finally {

    isLoading = false;

    enableSendButton();

  }

}


// -----------------------------
// CAMBIAR PERSONAJE
// -----------------------------

export function setSystemInstruction(
  instruction
) {

  if (!PERSONAS[instruction]) return;


  currentInstruction =
    instruction;


  // Cargamos el historial
  // correspondiente al nuevo personaje

  contents =
    loadHistory();


renderMessages(contents, getCurrentCharacter());
  clearStatus();

}


// -----------------------------
// DEBOUNCE SEND
// -----------------------------

const debouncedSend =
  debounce(sendMessage, 300);


// -----------------------------
// SELECCIÓN DE PERSONAJE
// -----------------------------

export function initCharacterSelection() {

  const titles =
    document.querySelectorAll(
      ".personaje-card__title"
    );


  titles.forEach(title => {

    title.addEventListener(
      "click",
      () => {

        const personaje =
          title.dataset.personaje;


        console.log(
          "PERSONAJE ELEGIDO:",
          personaje
        );


        localStorage.setItem(
          "personajeSeleccionado",
          personaje
        );


        navigateTo("/chat");

      }
    );

  });

}


// -----------------------------
// INICIAR CHAT
// -----------------------------

export function initChatEngine() {

  const personajeSeleccionado =
    localStorage.getItem(
      "personajeSeleccionado"
    ) || DEFAULT_PERSONA_KEY;


  // Primero determinamos
  // qué personaje está activo

  currentInstruction =
    personajeSeleccionado;


  // Después cargamos
  // SU historial

  contents =
    loadHistory();


  const sendButton =
    document.getElementById(
      "send-btn"
    );

  const inputEl =
    document.getElementById(
      "chat-input"
    );

  const personaSelect =
    document.getElementById(
      "persona-select"
    );
const deleteChatButton =
  document.getElementById("delete-chat-btn");

if (deleteChatButton) {
  deleteChatButton.addEventListener(
    "click",
    deleteHistory
  );
}

if (deleteChatButton) {
  deleteChatButton.addEventListener(
    "click",
    deleteHistory
  );
}

  if (!sendButton || !inputEl) {
    return;
  }


  sendButton.addEventListener(
    "click",
    () => {

      debouncedSend(
        inputEl.value
      );

    }
  );


  inputEl.addEventListener(
    "keydown",
    (e) => {

      if (e.key === "Enter") {

        debouncedSend(
          inputEl.value
        );

      }

    }
  );


  if (personaSelect) {

    personaSelect.value =
      personajeSeleccionado;


    personaSelect.addEventListener(
      "change",
      (e) => {

        setSystemInstruction(
          e.target.value
        );


        localStorage.setItem(
          "personajeSeleccionado",
          e.target.value
        );

      }
    );

  }


renderMessages(contents, getCurrentCharacter());
  updateTokenUsage(
    getSessionUsage()
  );

}


export { PERSONAS };
