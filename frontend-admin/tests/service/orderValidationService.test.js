import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/lib/supabase", () => ({

    supabase: {

        from: vi.fn()

    }

}));

import { supabase } from "../../src/lib/supabase";

import { validateOrderStock } from "../../src/services/orderValidationService";

describe("OrderValidationService", () => {

    beforeEach(() => {

        vi.clearAllMocks();

    });

    it("Debe aprobar un pedido con stock suficiente", async () => {

        supabase.from.mockReturnValue({

            select: () => ({

                eq: () => ({

                    single: async () => ({

                        data: {

                            sku: "ABC123",

                            stock_units: 25

                        },

                        error: null

                    })

                })

            })

        });

        const result = await validateOrderStock({

            productSku: "ABC123",

            quantity: 10

        });

        expect(result.approved).toBe(true);

        expect(result.reason).toBe("Stock disponible");

    });

    it("Debe rechazar un pedido por stock insuficiente", async () => {

        supabase.from.mockReturnValue({

            select: () => ({

                eq: () => ({

                    single: async () => ({

                        data: {

                            sku: "ABC123",

                            stock_units: 2

                        },

                        error: null

                    })

                })

            })

        });

        const result = await validateOrderStock({

            productSku: "ABC123",

            quantity: 10

        });

        expect(result.approved).toBe(false);

        expect(result.reason).toBe("Stock insuficiente");

    });

    it("Debe rechazar un producto inexistente", async () => {

        supabase.from.mockReturnValue({

            select: () => ({

                eq: () => ({

                    single: async () => ({

                        data: null,

                        error: {}

                    })

                })

            })

        });

        const result = await validateOrderStock({

            productSku: "XYZ999",

            quantity: 1

        });

        expect(result.approved).toBe(false);

        expect(result.reason).toBe("Producto no encontrado");

    });

    it("Debe aceptar cuando el stock es exactamente igual a la cantidad", async () => {

        supabase.from.mockReturnValue({

            select: () => ({

                eq: () => ({

                    single: async () => ({

                        data: {

                            sku: "ABC123",

                            stock_units: 10

                        },

                        error: null

                    })

                })

            })

        });

        const result = await validateOrderStock({

            productSku: "ABC123",

            quantity: 10

        });

        expect(result.approved).toBe(true);

    });

    it("Nunca debe devolver un resultado nulo", async () => {

        supabase.from.mockReturnValue({

            select: () => ({

                eq: () => ({

                    single: async () => ({

                        data: {

                            sku: "ABC123",

                            stock_units: 30

                        },

                        error: null

                    })

                })

            })

        });

        const result = await validateOrderStock({

            productSku: "ABC123",

            quantity: 5

        });

        expect(result).toBeDefined();

    });

});