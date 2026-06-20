import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/lib/supabase", () => ({

    supabase: {

        from: vi.fn()

    }

}));

import { supabase } from "../../src/lib/supabase";

import {

    createRefund,

    createRefundFromShipment,

    getRefunds

} from "../../src/services/refundService";

describe("RefundService", () => {

    beforeEach(() => {

        vi.clearAllMocks();

    });

    it("Debe crear correctamente un reembolso", async () => {

        supabase.from.mockReturnValue({

            insert: () => ({

                select: async () => ({

                    data: [{ id: 1 }],

                    error: null

                })

            })

        });

        const result = await createRefund({

            amount: 5000

        });

        expect(result.success).toBe(true);

    });

    it("Debe crear correctamente un reembolso desde un envío", async () => {

        supabase.from.mockReturnValue({

            insert: () => ({

                select: async () => ({

                    data: [{ id: 1 }],

                    error: null

                })

            })

        });

        const result = await createRefundFromShipment({

            tracking_code: "TRK-001",

            customer_name: "Marco",

            product_name: "Notebook",

            price: 8000

        });

        expect(result.success).toBe(true);

    });

    it("Debe obtener correctamente los reembolsos", async () => {

        supabase.from.mockReturnValue({

            select: () => ({

                order: async () => ({

                    data: [

                        { id: 1 },

                        { id: 2 }

                    ],

                    error: null

                })

            })

        });

        const result = await getRefunds();

        expect(result.length).toBe(2);

    });

    it("Debe devolver arreglo vacío cuando ocurre un error", async () => {

        supabase.from.mockReturnValue({

            select: () => ({

                order: async () => ({

                    data: null,

                    error: {}

                })

            })

        });

        const result = await getRefunds();

        expect(result).toEqual([]);

    });

    it("Debe rechazar la creación cuando Supabase devuelve error", async () => {

        supabase.from.mockReturnValue({

            insert: () => ({

                select: async () => ({

                    data: null,

                    error: {}

                })

            })

        });

        const result = await createRefund({

            amount: 1000

        });

        expect(result.success).toBe(false);

    });

});