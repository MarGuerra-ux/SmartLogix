import "./LiveFeed.css";

function LiveFeed({

    operations

}){

    const events = operations

        .slice(0,12)

        .map(trace=>({

            id:trace.ids.traceId,

            time:new Date(

                trace.audit.updatedAt

            ).toLocaleTimeString(

                "es-CL",

                {

                    hour:"2-digit",

                    minute:"2-digit"

                }

            ),

            module:

                trace.workflow.currentStep,

            trace:

                trace.ids.traceId

        }));

    return(

        <section className="live-feed">

            <div className="feed-header">

                <h2>

                    🔴 Actividad en Tiempo Real

                </h2>

            </div>

            <div className="feed-body">

                {

                    events.map(event=>(

                        <div

                            key={event.id}

                            className="feed-item"

                        >

                            <span className="feed-time">

                                {event.time}

                            </span>

                            <div className="feed-info">

                                <strong>

                                    {event.trace}

                                </strong>

                                <small>

                                    {event.module}

                                </small>

                            </div>

                            <span className="feed-dot">

                                🟢

                            </span>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default LiveFeed;