import { describe, it, expect } from "vitest";

import {

    getTrackingStats,

    getRecentActivity,

    getCourierPerformance,

    getTrackingDistribution,

    getTrackingAlerts

} from "../../src/services/trackingAnalyticsService";

describe("TrackingAnalyticsService", () => {

    it("Debe generar estadísticas de seguimiento", () => {

        const stats = getTrackingStats();

        expect(stats).toBeDefined();

        expect(stats.inTransit).toBeGreaterThanOrEqual(0);

        expect(stats.onDelivery).toBeGreaterThanOrEqual(0);

    });

    it("Debe devolver actividad reciente", () => {

        const activity = getRecentActivity();

        expect(activity.length).toBeGreaterThan(0);

    });

    it("Todos los couriers deben tener SLA válido", () => {

        getCourierPerformance().forEach(carrier => {

            expect(carrier.sla).toBeGreaterThan(0);

            expect(carrier.sla).toBeLessThanOrEqual(100);

        });

    });

    it("La distribución debe contener todos los estados", () => {

        const distribution = getTrackingDistribution();

        expect(distribution.delivered).toBeDefined();

        expect(distribution.inTransit).toBeDefined();

        expect(distribution.onDelivery).toBeDefined();

        expect(distribution.preparing).toBeDefined();

    });

    it("Las alertas deben contener un mensaje", () => {

        getTrackingAlerts().forEach(alert => {

            expect(alert.message.length).toBeGreaterThan(10);

        });

    });

});