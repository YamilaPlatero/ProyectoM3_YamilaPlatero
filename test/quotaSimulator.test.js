import { describe, it, expect, beforeEach } from "vitest"; 
import {
     recordUsage, 
     isSessionQuotaExceeded, 
     resetSessionUsage, 
     getSessionUsage 
    } from "../src/services/quotaSimulator.js";

 describe("quotaSimulator", () => { 
    beforeEach(() => { 
        resetSessionUsage(); 
    }); 
    
    it("no excede la cuota recién iniciada", () => { 
        expect(isSessionQuotaExceeded()).toBe(false); 
    }); 
    
    it("marca la cuota como excedida al llegar al límite", () => { 
        recordUsage(2000, 2000); // suma exactamente 4000 
        expect(isSessionQuotaExceeded()).toBe(true);
     }); 
     
     it("acumula el uso entre múltiples llamadas", () => { 
        recordUsage(100, 50); recordUsage(200, 100); 
        const usage = getSessionUsage(); 
        expect(usage.totalTokens).toBe(450);
     }); 
    });




