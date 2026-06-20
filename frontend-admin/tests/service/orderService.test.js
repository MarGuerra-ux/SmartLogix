import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/lib/supabase", () => ({

    supabase: {

        from: vi.fn()

    }

}));

import { supabase } from "../../src/lib/supabase";

import {

    getOrders,

    getOrderById,

    createOrder,

    updateOrderStatus,

    deleteOrder

} from "../../src/services/orderService";

describe("OrderService", () => {

    beforeEach(() => {

        vi.clearAllMocks();

    });

    it("Debe obtener todos los pedidos", async () => {

        supabase.from.mockReturnValue({

            select: () => ({

                order: async () => ({

                    data: [{ id: 1 }, { id: 2 }],

                    error: null

                })

            })

        });

        const result = await getOrders();

        expect(result.length).toBe(2);

    });

    it("Debe obtener un pedido por ID", async () => {

        supabase.from.mockReturnValue({

            select: () => ({

                eq: () => ({

                    single: async () => ({

                        data: { id: 1 },

                        error: null

                    })

                })

            })

        });

        const result = await getOrderById(1);

        expect(result.id).toBe(1);

    });

    it("Debe crear correctamente un pedido", async () => {

        supabase.from.mockReturnValue({

            insert: () => ({

                select: async () => ({

                    data: [{ id: 1 }],

                    error: null

                })

            })

        });

        const result = await createOrder({

            customer: "Marco"

        });

        expect(result.success).toBe(true);

    });

    it("Debe actualizar correctamente el estado de un pedido", async () => {

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

        const result = await updateOrderStatus(

            1,

            "Aprobado"

        );

        expect(result.success).toBe(true);

    });

    it("Debe eliminar correctamente un pedido", async () => {

        supabase.from.mockReturnValue({

            delete: () => ({

                eq: async () => ({

                    error: null

                })

            })

        });

        const result = await deleteOrder(1);

        expect(result.success).toBe(true);

    });

});