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

          <h2>
            🗺️ Ubicación del Envío
          </h2>

          <button
            className="modal-close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="mock-map-container">

          <div className="mock-map">

            <div className="mock-marker">
              📍
            </div>

            <span>
              Mapa Mock
            </span>

          </div>

        </div>

        <div className="map-info">

          <p>
            Courier:
            <strong>
              {" "}
              {shipment.carrier}
            </strong>
          </p>

          <p>
            Tracking:
            <strong>
              {" "}
              {shipment.trackingNumber}
            </strong>
          </p>

          <p>
            Destino:
            <strong>
              {" "}
              {shipment.commune}
            </strong>
          </p>

        </div>

        <div className="future-map-note">

          <strong>
            Próxima Integración:
          </strong>

          Google Maps API +
          seguimiento en tiempo real.

        </div>

        {/*
        FUTURA IMPLEMENTACIÓN

        <GoogleMap
          center={{
            lat: shipment.latitude,
            lng: shipment.longitude
          }}
          zoom={14}
        />

        */}

      </div>

    </div>
  );
}