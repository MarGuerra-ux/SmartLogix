import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/lib/supabase", () => ({

    supabase: {

        from: vi.fn()

    }

}));

import { supabase } from "../../src/lib/supabase";

import {

    demoShippingOptions,

    getShipments,

    createDemoShipment,

    updateShipmentStatus,

    deleteShipment

} from "../../src/services/shippingService";

describe("ShippingService", () => {

    beforeEach(() => {

        vi.clearAllMocks();

    });

    it("Debe existir al menos una opción de envío", () => {

        expect(demoShippingOptions.length).toBeGreaterThan(0);

    });

    it("Debe obtener correctamente los envíos", async () => {

        supabase.from.mockReturnValue({

            select: () => ({

                order: async () => ({

                    data: [{ id: 1 }, { id: 2 }],

                    error: null

                })

            })

        });

        const result = await getShipments();

        expect(result.length).toBe(2);

    });

    it("Debe crear correctamente un envío", async () => {

        supabase.from.mockReturnValue({

            insert: () => ({

                select: async () => ({

                    data: [{ id: 1 }],

                    error: null

                })

            })

        });

        const result = await createDemoShipment();

        expect(result.success).toBe(true);

    });

    it("Debe actualizar correctamente el estado del envío", async () => {

        supabase.from.mockReturnValue({

            update: () => ({

                eq: () => ({

                    select: async () => ({

                        data: [{ id: 1 }],

                        error: null

                    })

                })

            })

        });

        const result = await updateShipmentStatus(

            1,

            "En tránsito"

        );

        expect(result.success).toBe(true);

    });

    it("Debe eliminar correctamente un envío", async () => {

        supabase.from.mockReturnValue({

            delete: () => ({

                eq: async () => ({

                    error: null

                })

            })

        });

        const result = await deleteShipment(1);

        expect(result.success).toBe(true);

    });

});