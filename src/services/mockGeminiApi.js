//? mockFetchAI, simulación de latencia y 429
import { isSessionQuotaExceeded, recordUsage } from "./quotaSimulator.js";
import { estimateContentsTokens, estimateTokens } from "../services/tokenEstimator.js";

let callCount = 0;

function pickRandomPhrase(phrases) {
  const index = Math.floor(Math.random() * phrases.length);
  return phrases[index];
}

export async function mockFetchAI(payload, phrases) {
  callCount++;
  await new Promise(r => setTimeout(r, 800)); // simula latencia real de red

  // --- 429 "clásico": simula un pico de RPM/RPD, cada 5 llamadas --- // cada 5 llamadas → simula un 429
  if (callCount % 5 === 0) {                  
    const err = new Error("Rate limit");
    err.status = 429;
    err.errorCode = "RESOURCE_EXHAUSTED";
    err.retryAfterSeconds = 3;
    throw err;
  }

  // --- 429 por cuota de tokens de la sesión agotada ---
  if (isSessionQuotaExceeded()) {
    const err = new Error("Session token quota exceeded");
    err.status = 429;
    err.errorCode = "RESOURCE_EXHAUSTED";
    err.retryAfterSeconds = 5;
    err.quotaReason = "TOKENS";
    throw err;
  }

  const maxOutputTokens = payload?.generationConfig?.maxOutputTokens ?? 150;
  const lastUserMessage = payload?.contents.at(-1)?.parts?.[0]?.text ?? "";

  // El promptTokenCount real de la API incluye el system prompt + TODO el
  // historial que viaja en la request — no solo el último mensaje del usuario.
  const systemText = payload?.systemInstruction?.parts?.[0]?.text ?? "";
  const promptTokenCount = estimateContentsTokens(payload.contents) + estimateTokens(systemText);

  // 🔍 Log didáctico: historial nunca supera los 12 y cómo el conteo de tokens crece con cada turno hasta 
  // estabilizarse.
  console.log(
    `📊 Request #${callCount} — historial: ${payload.contents.length} mensajes, ~${promptTokenCount} tokens de entrada estimados`
  );

  let responseText =
    Array.isArray(phrases) && phrases.length > 0
      ? pickRandomPhrase(phrases)
      : `Respuesta mock a: "${lastUserMessage}"`;
  let candidatesTokenCount = estimateTokens(responseText);
  let finishReason = "STOP";
 
  // Simulamos el corte real de maxOutputTokens: si la respuesta "generada"
  // supera el techo pedido en generationConfig, se corta ahí mismo —
  // igual que pasaría con la API real.
  if (candidatesTokenCount > maxOutputTokens) {
    const maxChars = maxOutputTokens * 4; // ~4 caracteres por token, aprox.
    responseText = responseText.slice(0, maxChars).trim() + "…";
    candidatesTokenCount = maxOutputTokens;
    finishReason = "MAX_TOKENS";
  }
 
  recordUsage(promptTokenCount, candidatesTokenCount);

  return {
    candidates: [
      {
        content: {
          role: "model",
          parts: [{ text: responseText }]
        },
        finishReason
      }
    ],
    usageMetadata: { promptTokenCount, candidatesTokenCount }
  };
}