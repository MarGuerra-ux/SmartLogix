import { describe, it, expect } from "vitest";

import {

    getAuditLogs,

    getAuditLog,

    registerAuditEvent,

    registerDocument,

    registerNotification

} from "../../src/services/auditLogService";

describe("AuditLogService", () => {

    it("Debe existir al menos un registro de auditoría", () => {

        const logs = getAuditLogs();

        expect(logs.length).toBeGreaterThan(0);

    });

    it("Debe encontrar correctamente un registro existente", () => {

        const logs = getAuditLogs();

        const first = logs[0];

        const result = getAuditLog(

            first.entityType,

            first.entityId

        );

        expect(result).toBeDefined();

    });

    it("Debe registrar correctamente un evento de auditoría", () => {

        const logs = getAuditLogs();

        const first = logs[0];

        const before = first.events.length;

        registerAuditEvent(

            first.entityType,

            first.entityId,

            {

                action: "QA TEST",

                user: "Vitest"

            }

        );

        expect(first.events.length).toBe(before + 1);

    });

    it("Debe registrar correctamente un documento", () => {

        const logs = getAuditLogs();

        const first = logs[0];

        registerDocument(

            first.entityType,

            first.entityId,

            "qa_document"

        );

        expect(

            first.documents.qa_document

        ).toBe(true);

    });

    it("Debe registrar correctamente una notificación", () => {

        const logs = getAuditLogs();

        const first = logs[0];

        registerNotification(

            first.entityType,

            first.entityId,

            "qa_notification"

        );

        expect(

            first.notifications.qa_notification

        ).toBe(true);

    });

});