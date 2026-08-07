const CHAT_ENDPOINT = "/api/chat"; // ruta relativa: mismo origen, Vercel la resuelve sola

export async function fetchGeminiAPI(payload) {
  let response;
  try {
    response = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (networkErr) {
    const err = new Error("Network error");
    err.status = 0;
    err.originalError = networkErr;
    throw err;
  }

  if (!response.ok) {
    let errorBody = null;
    try {
      errorBody = await response.json();
    } catch {
      // el cuerpo del error no era JSON válido
    }

    const errorMessage =
  typeof errorBody?.error === "string"
    ? errorBody.error
    : errorBody?.error?.message ?? `HTTP ${response.status}`;

const err = new Error(errorMessage);

    err.status = response.status;
    err.errorCode = errorBody?.error?.status ?? "UNKNOWN";
    if (response.status === 429) err.retryAfterSeconds = 5;
    throw err;
  }

  return response.json();
}