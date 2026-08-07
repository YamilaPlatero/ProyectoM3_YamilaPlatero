// simulacion de una cuota -- version free

const SESSION_TOKEN_LIMIT = 4000; 

let sessionPromptTokens = 0; // suma de entreda del usuario
let sessionCandidateTokens = 0; //respuestas que genera la ia
let requestCount = 0; //cuantas veces se llamo al mok


// modificar el estado, un efecto secuandario
export function recordUsage(promptTokenCount, candidatesTokenCount) { 
    sessionPromptTokens += promptTokenCount; 
    sessionCandidateTokens += candidatesTokenCount; 
    requestCount++; } 
    

// lee lo que hay en esas 3 variables    
export function getSessionUsage() { 
    const totalTokens = sessionPromptTokens + sessionCandidateTokens; 
    return { 
        requestCount, 
        promptTokens: sessionPromptTokens, 
        candidateTokens: sessionCandidateTokens, 
        totalTokens, 
        limit: SESSION_TOKEN_LIMIT, 
        remaining: Math.max(0, SESSION_TOKEN_LIMIT - totalTokens), 
    }; 
} 

// booleano, si nos pasamos de limite o no
export function isSessionQuotaExceeded() { 
    return sessionPromptTokens + sessionCandidateTokens >= SESSION_TOKEN_LIMIT; 
}


// lo vuelve todo a cero
export function resetSessionUsage() { 
    sessionPromptTokens = 0; 
    sessionCandidateTokens = 0; 
    requestCount = 0;
}