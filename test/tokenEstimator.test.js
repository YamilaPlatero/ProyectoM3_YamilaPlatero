import { describe, it, expect } from "vitest"; 
import { estimateTokens, estimateContentsTokens } from "../src/services/tokenEstimator.js"; 

describe("estimateTokens", () => {
    it("redondea hacia arriba (~4 caracteres por token)", () => { 
        expect(estimateTokens("hola")).toBe(1); 
        expect(estimateTokens("hola mundo")).toBe(3); 
    
    }); 
    
    it("devuelve 0 si el texto está vacío o es undefined", () => { 
        expect(estimateTokens("")).toBe(0); 
        expect(estimateTokens(undefined)).toBe(0);
     }); 
    
});

