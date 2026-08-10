import { beforeEach, describe, expect, it, vi } from "vitest";
import { sendMessage } from "../src/engine/chatEngine.js";
import * as geminiApi from "../src/services/geminiApi.js";
import { resetSessionUsage } from "../src/services/quotaSimulator.js";
import * as render from "../src/ui/render.js";


vi.mock("../src/services/geminiApi.js");
vi.mock("../src/ui/render.js");

const localStorageMock = {
  store: {},

  getItem(key) {
    return this.store[key] ?? null;
  },

  setItem(key, value) {
    this.store[key] = String(value);
  },

  removeItem(key) {
    delete this.store[key];
  },

  clear() {
    this.store = {};
  },
};

vi.stubGlobal("localStorage", localStorageMock);

describe("chatEngine — manejo de 429 y reintento", () => {
  beforeEach(() => {
  resetSessionUsage();
  vi.clearAllMocks();

  localStorageMock.clear();

  vi.useFakeTimers();
});

  it("reintenta una vez si la primera llamada da 429, y termina en éxito", async () => {
    const rateLimitError = new Error("Rate limit");
    rateLimitError.status = 429;
    rateLimitError.retryAfterSeconds = 3;

    geminiApi.fetchGeminiAPI
      .mockRejectedValueOnce(rateLimitError)          
      .mockResolvedValueOnce({                          
        candidates: [{ content: { parts: [{ text: "ok" }] } }],
        usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 5 },
      });

    const sendPromise = sendMessage("hola");
    await vi.advanceTimersByTimeAsync(3000); 
    await sendPromise;

    expect(geminiApi.fetchGeminiAPI).toHaveBeenCalledTimes(2);
    expect(render.showRetryState).toHaveBeenCalledWith(3);
  });

  it("si el reintento también falla, muestra el error final y no reintenta una tercera vez", async () => {
    const rateLimitError = new Error("Rate limit");
    rateLimitError.status = 429;
    rateLimitError.retryAfterSeconds = 1;

    geminiApi.fetchGeminiAPI
      .mockRejectedValueOnce(rateLimitError)
      .mockRejectedValueOnce(rateLimitError); 

    const sendPromise = sendMessage("este mensaje va a fallar dos veces");
    await vi.advanceTimersByTimeAsync(1000);
    await sendPromise;

    expect(geminiApi.fetchGeminiAPI).toHaveBeenCalledTimes(2); 
    expect(render.showError).toHaveBeenCalled();
  });

  it("si el error NO es 429, no reintenta en absoluto", async () => {
    const serverError = new Error("Server error");
    serverError.status = 500;

    geminiApi.fetchGeminiAPI.mockRejectedValueOnce(serverError);

    await sendMessage("otro mensaje");

    expect(geminiApi.fetchGeminiAPI).toHaveBeenCalledTimes(1); 
    expect(render.showError).toHaveBeenCalledWith("Error inesperado.");
  });
});