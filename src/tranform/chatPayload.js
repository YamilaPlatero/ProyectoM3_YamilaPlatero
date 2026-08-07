const MODEL_NAME = "gemini-3.5-flash-lite"; 
const MAX_OUTPUT_TOKENS = 150 
const TEMPERATURE = 0.9 
const MAX_TURNS_HISTORY = 12 

export function buildPayload(contents, systemInstruction) { 
    return { 
        model: MODEL_NAME, 
        systemInstruction: { parts: [{ text: systemInstruction}] }, 
        generationConfig: { 
            temperature: TEMPERATURE, 
            maxOutputTokens: MAX_OUTPUT_TOKENS 
        }, 
        contents 
    };
 }

 export function normalizeAIResponse(raw) { 
    const firstCandidate = raw?.candidates?.[0]; 
    const parts = firstCandidate?.content?.parts; 
    if (!Array.isArray(parts)) 
        return ""; 
    return parts .filter(p => 
        typeof p?.text === "string") .map(p => 
            p.text) .join("") .trim(); 
        
        }