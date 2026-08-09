import { describe, expect, it } from "vitest";
import { buildPayload, normalizeAIResponse } from "../src/tranform/chatPayload.js";

describe("buildPayload", () => {
  it("arma el payload con la forma exacta que espera Gemini", () => {
    const contents = [{ role: "user", parts: [{ text: "hola" }] }];
    const instruction = "Sos un mentor técnico.";

    const payload = buildPayload(contents, instruction);

    expect(payload.systemInstruction).toEqual({ parts: [{ text: instruction }] });
    expect(payload.contents).toBe(contents);
    expect(payload.generationConfig).toHaveProperty("temperature");
    expect(payload.generationConfig).toHaveProperty("maxOutputTokens");
  });
});

describe("normalizeAIResponse", () => {
  it("extrae el texto cuando la respuesta es válida", () => {
    const raw = {
      candidates: [{ content: { parts: [{ text: "Respuesta de prueba" }] } }]
    };
    expect(normalizeAIResponse(raw)).toBe("Respuesta de prueba");
  });

  it("devuelve string vacío si candidates es undefined", () => {
    expect(normalizeAIResponse({})).toBe("");
  });

  it("devuelve string vacío si parts no es un array", () => {
    const raw = { candidates: [{ content: {} }] };
    expect(normalizeAIResponse(raw)).toBe("");
  });

  it("ignora bloques que no son de tipo texto", () => {
    const raw = {
      candidates: [{
        content: { parts: [{ text: "válido" }, { notText: "ignorame" }] }
      }]
    };
    expect(normalizeAIResponse(raw)).toBe("válido");
  });
});