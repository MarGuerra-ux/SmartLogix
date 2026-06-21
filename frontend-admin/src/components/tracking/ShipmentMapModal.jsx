import ShipmentMap from "../maps/ShipmentMap";

import "../../styles/ShipmentMapModal.css";

export default function ShipmentMapModal({

    shipment,

    onClose

}) {

    if (!shipment) return null;

    return (

        <div className="modal-overlay">

            <div className="shipment-map-modal">

                <div className="shipment-map-header">

                    <div>

                        <h2>

                            🛰 Seguimiento en Tiempo Real

                        </h2>

                        <p>

                            SmartLogix Tracking Center

                        </p>

                    </div>

                    <button

                        className="modal-close-btn"

                        onClick={onClose}

                    >

                        ✕

                    </button>

                </div>

                <div className="shipment-status-bar">

                    <div className="gps-status">

                        <span className="gps-dot"></span>

                        GPS Activo

                    </div>

                    <div>

                        Última actualización

                        <strong>

                            Hace unos segundos

                        </strong>

                    </div>

                </div>

                <ShipmentMap

                    shipment={shipment}

                />

                <div className="shipment-info-grid">

                    <div className="info-card">

                        <span>

                            🚚 Courier

                        </span>

                        <strong>

                            {shipment.carrier}

                        </strong>

                    </div>

                    <div className="info-card">

                        <span>

                            📦 Tracking

                        </span>

                        <strong>

                            {shipment.trackingNumber}

                        </strong>

                    </div>

                    <div className="info-card">

                        <span>

                            📍 Destino

                        </span>

                        <strong>

                            {shipment.commune}

                        </strong>

                    </div>

                    <div className="info-card">

                        <span>

                            🚛 Estado

                        </span>

                        <strong>

                            {shipment.status}

                        </strong>

                    </div>

                    <div className="info-card">

                        <span>

                            ⏱ ETA

                        </span>

                        <strong>

                            18 min

                        </strong>

                    </div>

                    <div className="info-card">

                        <span>

                            ⚡ Velocidad

                        </span>

                        <strong>

                            42 km/h

                        </strong>

                    </div>

                </div>

                <div className="shipment-timeline-mini">

                    <div className="timeline-node active">

                        Pedido

                    </div>

                    <div className="timeline-line"></div>

                    <div className="timeline-node active">

                        Centro Logístico

                    </div>

                    <div className="timeline-line"></div>

                    <div className="timeline-node active">

                        En Ruta

                    </div>

                    <div className="timeline-line"></div>

                    <div className="timeline-node">

                        Entregado

                    </div>

                </div>

            </div>

        </div>

    );

}