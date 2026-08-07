// Estimar apropiado de tokens

export function estimateTokens(text) {
     if (!text) return 0; 
     return Math.max(1, Math.ceil(text.length / 4)); }
     
// Estima el total de tokens que representa un array contents completo: 
// esto es lo que EFECTIVAMENTE viaja en cada request, historial incluido. 

export function estimateContentsTokens(contents) { 
    return contents.reduce((total, msg) => { 
        const text = msg.parts?.[0]?.text ?? ""; 
        return total + estimateTokens(text);
     }, 0);

    }