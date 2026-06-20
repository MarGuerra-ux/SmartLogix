import { describe, it, expect } from "vitest";

import {
    getTrackingShipments
} from "../../src/services/trackingService";

describe("TrackingService", () => {

    it("Debe devolver al menos un envío", () => {

        const shipments = getTrackingShipments();

        expect(shipments.length).toBeGreaterThan(0);

    });

    it("Todos los envíos deben tener Tracking Number", () => {

        getTrackingShipments().forEach(shipment => {

            expect(shipment.trackingNumber).toBeTruthy();

        });

    });

    it("Todos los envíos deben tener transportista asignado", () => {

        getTrackingShipments().forEach(shipment => {

            expect(shipment.carrier).toBeTruthy();

        });

    });

    it("Ningún envío debe tener dirección vacía", () => {

        getTrackingShipments().forEach(shipment => {

            expect(shipment.address.trim().length).toBeGreaterThan(0);

        });

    });

    it("Todos los envíos deben tener fecha estimada de entrega", () => {

        getTrackingShipments().forEach(shipment => {

            expect(shipment.estimatedDelivery).toBeTruthy();

        });

    });

});