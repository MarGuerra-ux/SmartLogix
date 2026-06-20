import {
  getTrackingShipments
} from "../../services/trackingService";

import "../../styles/TrackingMapCard.css";

export default function TrackingMapCard() {

  const shipments =
    getTrackingShipments();

  return (

    <div className="tracking-map-card">

      <h2>
        🗺️ Mapa Operacional
      </h2>

      <div className="tracking-map-placeholder">

        <div className="map-center">

          <h3>
            Google Maps
            (Integración futura)
          </h3>

          <p>
            Visualización de
            tracking en tiempo real.
          </p>

        </div>

      </div>

      <div className="tracking-map-locations">

        {shipments.map((shipment) => (

          <div
            key={shipment.id}
            className="location-item"
          >

            <strong>
              {shipment.customer}
            </strong>

            <span>
              {shipment.commune}
            </span>

            <small>
              {shipment.status}
            </small>

          </div>

        ))}

      </div>

    </div>

  );
}