import "./ModuleLogModal.css";

function ModuleLogModal({

    open,

    onClose,

    module,

    traces

}){

    if(!open){

        return null;

    }

    return(

        <div className="modal-overlay">

            <div className="module-log-modal">

                <div className="module-log-header">

                    <div>

                        <h2>

                            {module.icon} {module.name}

                        </h2>

                        <p>

                            {traces.length} expedientes actualmente en este módulo

                        </p>

                    </div>

                    <button

                        className="close-button"

                        onClick={onClose}

                    >

                        ✕

                    </button>

                </div>

                <div className="module-log-body">

                    {

                        traces.length===0 && (

                            <div className="empty-log">

                                No existen expedientes en este módulo.

                            </div>

                        )

                    }

                    {

                        traces.map(trace=>(

                            <div

                                key={trace.ids.traceId}

                                className="log-row"

                            >

                                <div className="log-status">

                                    🟢

                                </div>

                                <div className="log-info">

                                    <strong>

                                        {trace.ids.traceId}

                                    </strong>

                                    <small>

                                        {trace.ids.orderId}

                                    </small>

                                    <small>

                                        {trace.ids.shipmentId}

                                    </small>

                                    <small>

                                        {trace.ids.trackingId}

                                    </small>

                                </div>

                                <div className="log-customer">

                                    <strong>

                                        {trace.customer.fullName}

                                    </strong>

                                    <span>

                                        {

                                            trace.products[0].name

                                        }

                                    </span>

                                </div>

                                <div className="log-actions">

                                    <button>

                                        Abrir

                                    </button>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default ModuleLogModal;