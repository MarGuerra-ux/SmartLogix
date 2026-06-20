import {

    describe,

    it,

    expect,

    beforeEach

} from "vitest";

import {

    restartSimulation,

    getAllOperations,

    getDashboard,

    nextTick

} from "../src/services/operationsCenterService";

describe("OperationsCenterService",()=>{

    beforeEach(()=>{

        restartSimulation(250);

    });

    it("Debe crear exactamente 250 operaciones",()=>{

        const operations=

            getAllOperations();

        expect(

            operations.length

        ).toBe(250);

    });

    it("El dashboard debe coincidir con la cantidad de operaciones",()=>{

        const dashboard=

            getDashboard();

        expect(

            dashboard.total

        ).toBe(250);

    });

    it("Ninguna operación debe ser nula",()=>{

        const operations=

            getAllOperations();

        operations.forEach(operation=>{

            expect(operation)

                .toBeDefined();

        });

    });

    it("Todas las operaciones deben tener TraceId",()=>{

        const operations=

            getAllOperations();

        operations.forEach(operation=>{

            expect(

                operation.ids.traceId

            ).toBeTruthy();

        });

    });

    it("Después de un Tick las operaciones siguen siendo 250",()=>{

        nextTick();

        const operations=

            getAllOperations();

        expect(

            operations.length

        ).toBe(250);

    });

});