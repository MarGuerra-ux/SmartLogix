import { describe, it, expect } from "vitest";

import {
    getCarrierRanking,
    getRecommendedCarrier
} from "../../src/services/carrierDecisionService";

describe("CarrierDecisionService", () => {

    it("Debe devolver un ranking con transportistas", () => {

        const ranking = getCarrierRanking();

        expect(ranking.length).toBeGreaterThan(0);

    });

    it("Todos los transportistas deben tener un nombre", () => {

        getCarrierRanking().forEach(carrier => {

            expect(carrier.carrier).toBeTruthy();

        });

    });

    it("Los puntajes deben estar entre 0 y 10", () => {

        getCarrierRanking().forEach(carrier => {

            expect(carrier.score).toBeGreaterThanOrEqual(0);

            expect(carrier.score).toBeLessThanOrEqual(10);

        });

    });

    it("Ningún costo promedio puede ser negativo", () => {

        getCarrierRanking().forEach(carrier => {

            expect(carrier.avgCost).toBeGreaterThan(0);

        });

    });

    it("El transportista recomendado debe ser el primero del ranking", () => {

        const ranking = getCarrierRanking();

        const recommended = getRecommendedCarrier();

        expect(recommended).toEqual(ranking[0]);

    });

});