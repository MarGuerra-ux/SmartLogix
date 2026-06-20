import "./IncidentsPanel.css";

function IncidentsPanel({

    operations

}){

    const incidents=[];

    operations.forEach(trace=>{

        trace.incidents.forEach(

            incident=>{

                incidents.push({

                    traceId:

                        trace.ids.traceId,

                    customer:

                        trace.customer.fullName,

                    title:

                        incident.title,

                    severity:

                        incident.severity,

                    resolved:

                        incident.resolved

                });

            }

        );

    });

    return(

        <section className="incidents-panel">

            <div className="incidents-header">

                <h2>

                    ⚠️ Incidencias

                </h2>

            </div>

            <div className="incidents-body">

                {

                    incidents.length===0 && (

                        <div className="incidents-empty">

                            No existen incidencias activas.

                        </div>

                    )

                }

                {

                    incidents.map((item,index)=>(

                        <div

                            key={index}

                            className={`incident-card ${

                                item.severity.toLowerCase()

                            }`}

                        >

                            <div className="incident-top">

                                <strong>

                                    {item.traceId}

                                </strong>

                                <span>

                                    {

                                        item.resolved

                                        ? "✅"

                                        : "⚠️"

                                    }

                                </span>

                            </div>

                            <div className="incident-content">

                                <p>

                                    {item.title}

                                </p>

                                <small>

                                    {item.customer}

                                </small>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default IncidentsPanel;