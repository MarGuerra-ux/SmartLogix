import {
  getTrackingShipments
} from "../../services/trackingService";

import GlobalMap from "../maps/GlobalMap";

import "../../styles/TrackingMapCard.css";

export default function TrackingMapCard() {

  const shipments =
    getTrackingShipments();

  const carriersOnline =
    shipments.filter(
      shipment =>
        shipment.status !== "Entregado"
    ).length;

  const deliveries =
    shipments.filter(
      shipment =>
        shipment.status === "Entregado"
    ).length;

  const incidents =
    shipments.filter(
      shipment =>
        shipment.status === "Incidencia"
    ).length;

  return (

    <div className="tracking-map-card">

      <div className="tracking-map-header">

        <div>

          <h2>
            🗺️ Mapa Operacional
          </h2>

          <p>
            Seguimiento logístico en tiempo real
          </p>

        </div>

        <div className="tracking-system-status">

          <span className="status-dot"></span>

          <span>
            Sistema Activo
          </span>

        </div>

      </div>

      <div className="tracking-map-toolbar">

        <div className="toolbar-item">

          <span className="toolbar-label">
            🚚 Transportistas
          </span>

          <strong>
            {carriersOnline}
          </strong>

        </div>

        <div className="toolbar-item">

          <span className="toolbar-label">
            📦 Entregados
          </span>

          <strong>
            {deliveries}
          </strong>

        </div>

        <div className="toolbar-item">

          <span className="toolbar-label">
            ⚠️ Incidencias
          </span>

          <strong>
            {incidents}
          </strong>

        </div>

        <div className="toolbar-item">

          <span className="toolbar-label">
            🛰 Última actualización
          </span>

          <strong>
            Hace unos segundos
          </strong>

        </div>

      </div>

      <div className="tracking-map-wrapper">

        <GlobalMap />

        <div className="tracking-map-overlay">

          <div className="overlay-title">

            SmartLogix Live

          </div>

          <div className="overlay-subtitle">

            Monitoreo de flota

          </div>

        </div>

      </div>

      <div className="tracking-map-legend">

        <div className="legend-item">

          <span className="legend-dot online"></span>

          Disponible

        </div>

        <div className="legend-item">

          <span className="legend-dot moving"></span>

          En Ruta

        </div>

        <div className="legend-item">

          <span className="legend-dot warning"></span>

          Incidencia

        </div>

      </div>

      <div className="tracking-map-locations">

        {

          shipments.map(

            shipment => (

              <div
                key={shipment.id}
                className="location-item"
              >

                <div className="location-top">

                  <strong>

                    {shipment.customer}

                  </strong>

                  <span className="location-status">

                    {shipment.status}

                  </span>

                </div>

                <span className="location-commune">

                  📍 {shipment.commune}

                </span>

                <small>

                  🚚 {shipment.carrier}

                </small>

              </div>

            )

          )

        }

      </div>

    </div>

  );

}