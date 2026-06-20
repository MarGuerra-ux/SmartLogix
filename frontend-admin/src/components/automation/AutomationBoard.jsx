
import { useEffect, useMemo, useState } from "react";

import {

    subscribe,

    unsubscribe,

    startSimulation,

    stopSimulation,

    isSimulationRunning,

    getDashboard,

    getWorkflow,

    getAllOperations

} from "../../services/operationsCenterService";

import WorkflowBoard from "./WorkflowBoard";

import KPICards from "./KPICards";





import "./AutomationBoard.css";

function AutomationBoard() {

    const [

        dashboard,

        setDashboard

    ] = useState(

        getDashboard()

    );

    const [

        workflow,

        setWorkflow

    ] = useState(

        getWorkflow()

    );

    const [

        operations,

        setOperations

    ] = useState(

        getAllOperations()

    );

    const [

        running,

        setRunning

    ] = useState(

        isSimulationRunning()

    );

    function refresh() {

        setDashboard(

            getDashboard()

        );

        setWorkflow(

            getWorkflow()

        );

        setOperations(

            getAllOperations()

        );

        setRunning(

            isSimulationRunning()

        );

    }

    useEffect(() => {

        subscribe(refresh);

        refresh();

        return () => {

            unsubscribe(refresh);

        };

    }, []);
        const moduleStats = useMemo(() => {

        const stats = {};

        workflow.forEach(step => {

            stats[step.key] = operations.filter(

                operation =>

                    operation.currentModule ===

                    step.key

            ).length;

        });

        return stats;

    }, [

        workflow,

        operations

    ]);

    function handleSimulation(){

        if(running){

            stopSimulation();

        }

        else{

            startSimulation(1200);

        }

        refresh();

    }

    return(

        <section className="automation-board">

            <KPICards

                dashboard={dashboard}

                moduleStats={moduleStats}

                running={running}

            />

            <WorkflowBoard

                workflow={workflow}

                traces={operations}

                running={running}

                onStartSimulation={

                    handleSimulation

                }

            />

                

        </section>  

    );

}

export default AutomationBoard;