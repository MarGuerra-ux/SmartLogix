import { describe, it, expect } from "vitest";

import {

    getSystemHealth,

    getCarrierRanking,

    getCarrierPrediction,

    getCarrierSimulation,

    getCarrierTrends

} from "../../src/services/carrierAnalyticsService";

describe("CarrierAnalyticsService", () => {

    it("Debe devolver el estado de salud del sistema", () => {

        const result = getSystemHealth();

        expect(result).toBeDefined();

    });

    it("Debe devolver un ranking de transportistas", () => {

        const ranking = getCarrierRanking();

        expect(ranking).toBeDefined();

        expect(Array.isArray(ranking)).toBe(true);

        expect(ranking.length).toBeGreaterThan(0);

    });

    it("Debe devolver una predicción válida", () => {

        const prediction = getCarrierPrediction();

        expect(prediction).toBeDefined();

    });

    it("Debe devolver una simulación válida", () => {

        const simulation = getCarrierSimulation();

        expect(simulation).toBeDefined();

    });

    it("Debe devolver tendencias disponibles", () => {

        const trends = getCarrierTrends();

        expect(trends).toBeDefined();

    });

});