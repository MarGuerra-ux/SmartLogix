import { useState } from "react";

import WorkflowModule from "./WorkflowModule";
import ModuleLogModal from "./ModuleLogModal";

import "./WorkflowBoard.css";

function WorkflowBoard({

    workflow,

    traces,

    running,

    onStartSimulation

}){

    const [

        selectedModule,

        setSelectedModule

    ] = useState(null);

    return(

        <section className="workflow-board">

            <div className="workflow-toolbar">

                <div>

                    <h2>

                        Centro de Operaciones

                    </h2>

                    <p>

                        Flujo visual de expedientes SmartLogix

                    </p>

                </div>

                <button

                    className={`simulation-btn ${

                        running

                        ? "running"

                        : ""

                    }`}

                    onClick={

                        onStartSimulation

                    }

                >

                    {

                        running

                        ? "⏸ Detener Simulación"

                        : "▶ Ejecutar Simulación"

                    }

                </button>

            </div>

            <div className="workflow-columns">

                {

                    workflow.map(module=>{

                        const moduleTraces =

                            traces.filter(

                                trace =>

                                    trace.shipment.currentModule ===

                                    module.key

                            );

                        return(

                            <WorkflowModule

                                key={module.key}

                                module={module}

                                traces={moduleTraces}

                                onOpenLog={()=>

                                    setSelectedModule({

                                        module,

                                        traces:moduleTraces

                                    })

                                }

                            />

                        );

                    })

                }

            </div>

            <ModuleLogModal

                open={

                    selectedModule!==null

                }

                onClose={()=>

                    setSelectedModule(null)

                }

                module={

                    selectedModule?.module

                }

                traces={

                    selectedModule?.traces || []

                }

            />

        </section>

    );

}

export default WorkflowBoard;