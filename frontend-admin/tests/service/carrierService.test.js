import { describe, it, expect, beforeEach, vi } from "vitest";

import {

    getCarriers,

    getRecentShipments,

    getAssignmentSettings,

    saveAssignmentSettings

} from "../../src/services/carrierService";

describe("CarrierService", () => {

    beforeEach(() => {

        localStorage.clear();

    });

    it("Debe devolver transportistas registrados", () => {

        const carriers = getCarriers();

        expect(carriers.length).toBeGreaterThan(0);

    });

    it("Todos los transportistas deben tener API conectada", () => {

        getCarriers().forEach(carrier => {

            expect(carrier.apiConnected).toBe(true);

        });

    });

    it("Debe devolver la configuración por defecto cuando no existe configuración", () => {

        const settings = getAssignmentSettings();

        expect(settings.assignmentMode).toBe("restricted");

    });

    it("Debe guardar correctamente la configuración", () => {

        const settings = {

            assignmentMode: "automatic",

            selectedCarrier: "Starken",

            enabledCarriers: [

                "Starken"

            ]

        };

        const saved = saveAssignmentSettings(settings);

        expect(saved).toBe(true);

    });

    it("Debe recuperar correctamente la configuración guardada", () => {

        const settings = {

            assignmentMode: "automatic",

            selectedCarrier: "Chilexpress",

            enabledCarriers: [

                "Chilexpress"

            ]

        };

        saveAssignmentSettings(settings);

        const loaded = getAssignmentSettings();

        expect(loaded).toEqual(settings);

    });

});