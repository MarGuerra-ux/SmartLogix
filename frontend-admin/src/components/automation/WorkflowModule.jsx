import TraceCard from "./TraceCard";

import "./WorkflowModule.css";

function WorkflowModule({

    module,

    traces,

    onOpenLog

}){

    const percentage = Math.min(

        traces.length * 10,

        100

    );

    const visibleTraces =

        traces

            .slice(-4)

            .reverse();

    return(

        <article

            className="workflow-module"

            style={{

                borderTop:`6px solid ${module.color}`

            }}

        >

            <header className="module-header">

                <div className="module-icon">

                    {module.icon}

                </div>

                <h3>

                    {module.name}

                </h3>

                <small>

                    {module.service}

                </small>

            </header>

            <div className="module-stats">

                <span>

                    Expedientes

                </span>

                <strong>

                    {traces.length}

                </strong>

            </div>

            <div className="module-progress">

                <div

                    className="module-progress-fill"

                    style={{

                        width:`${percentage}%`,

                        background:module.color

                    }}

                />

            </div>

            <button

                className="module-log-button"

                onClick={onOpenLog}

            >

                📋 Ver Log

            </button>

            <div className="module-list">

                {

                    traces.length===0 && (

                        <div

                            className="module-empty"

                        >

                            Esperando expedientes...

                        </div>

                    )

                }

                {

                    visibleTraces.map(trace=>(

                        <TraceCard

                            key={

                                trace.ids.traceId

                            }

                            trace={trace}

                        />

                    ))

                }

                {

                    traces.length>4 && (

                        <div

                            className="module-more"

                        >

                            + {traces.length-4} expedientes más...

                        </div>

                    )

                }

            </div>

        </article>

    );

}

export default WorkflowModule;