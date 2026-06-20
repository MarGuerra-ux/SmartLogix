import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/lib/supabase", () => ({

    supabase: {

        from: vi.fn()

    }

}));

import { supabase } from "../../src/lib/supabase";

import {

    getNotifications,

    createNotification,

    updateNotificationStatus

} from "../../src/services/notificationService";

describe("NotificationService", () => {

    beforeEach(() => {

        vi.clearAllMocks();

    });

    it("Debe obtener correctamente las notificaciones", async () => {

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

        const result = await getNotifications();

        expect(result.length).toBe(2);

    });

    it("Debe crear correctamente una notificación", async () => {

        supabase.from.mockReturnValue({

            insert: () => ({

                select: async () => ({

                    data: [{ id: 1 }],

                    error: null

                })

            })

        });

        const result = await createNotification({

            title: "Pedido"

        });

        expect(result.success).toBe(true);

    });

    it("Debe actualizar correctamente el estado", async () => {

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

        const result = await updateNotificationStatus(

            1,

            "Enviado"

        );

        expect(result.success).toBe(true);

    });

    it("Debe devolver arreglo vacío cuando Supabase falla", async () => {

        supabase.from.mockReturnValue({

            select: () => ({

                order: async () => ({

                    data: null,

                    error: {}

                })

            })

        });

        const result = await getNotifications();

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

        const result = await createNotification({

            title: "Error"

        });

        expect(result.success).toBe(false);

    });

});