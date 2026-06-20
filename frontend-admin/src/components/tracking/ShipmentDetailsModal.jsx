import { useState } from "react";

import ShipmentMapModal from "./ShipmentMapModal";

import "../../styles/ShipmentDetailsModal.css";

export default function ShipmentDetailsModal({
  shipment,
  onClose
}) {

  const [showMap, setShowMap] =
    useState(false);

  if (!shipment) return null;

  const currentStep =
    shipment.status === "Preparando entrega"
      ? 2
      : shipment.status === "En tránsito"
      ? 3
      : shipment.status === "En reparto"
      ? 4
      : 5;

  return (
    <>
      <div className="modal-overlay">

        <div className="shipment-details-modal">

          <div className="shipment-details-header">

            <div>

              <h2>
                📍 Seguimiento del Pedido
              </h2>

              <div className="shipment-badges">

                <span className="order-badge">
                  {shipment.orderNumber}
                </span>

                <span className="status-badge">
                  {shipment.status}
                </span>

              </div>

            </div>

            <button
              className="modal-close-btn"
              onClick={onClose}
            >
              ✕
            </button>

          </div>

          <div className="shipment-layout">

            <div className="shipment-left">

              <div className="info-card">

                <h3>
                  Información del Pedido
                </h3>

                <div className="info-grid">

                  <div>
                    <strong>Cliente</strong>
                    <p>{shipment.customer}</p>
                  </div>

                  <div>
                    <strong>Producto</strong>
                    <p>{shipment.product}</p>
                  </div>

                  <div>
                    <strong>Courier</strong>
                    <p>{shipment.carrier}</p>
                  </div>

                  <div>
                    <strong>Tracking</strong>
                    <p>{shipment.trackingNumber}</p>
                  </div>

                  <div>
                    <strong>Dirección</strong>
                    <p>{shipment.address}</p>
                  </div>

                  <div>
                    <strong>Comuna</strong>
                    <p>{shipment.commune}</p>
                  </div>

                </div>

              </div>

              <div className="timeline-card">

                <h3>
                  Estado del Envío
                </h3>

                <div className="shipment-timeline">

                  <div className={`timeline-step ${currentStep >= 1 ? "active" : ""}`}>
                    Pedido recibido
                  </div>

                  <div className={`timeline-step ${currentStep >= 2 ? "active" : ""}`}>
                    Preparando
                  </div>

                  <div className={`timeline-step ${currentStep >= 3 ? "active" : ""}`}>
                    En tránsito
                  </div>

                  <div className={`timeline-step ${currentStep >= 4 ? "active" : ""}`}>
                    En reparto
                  </div>

                  <div className={`timeline-step ${currentStep >= 5 ? "active" : ""}`}>
                    Entregado
                  </div>

                </div>

              </div>

            </div>

            <div className="shipment-right">

              <div className="map-preview">

                <h3>
                  Ubicación Actual
                </h3>

                <div className="map-placeholder">

                  <span>
                    📍
                  </span>

                  <strong>
                    {shipment.commune}
                  </strong>

                  <small>
                    Integración Google Maps
                  </small>

                </div>

                <button
                  className="btn-map"
                  onClick={() =>
                    setShowMap(true)
                  }
                >
                  🗺️ Abrir Mapa
                </button>

              </div>

              <div className="shipment-summary">

                <div>
                  <strong>
                    Última actualización
                  </strong>

                  <p>
                    {shipment.lastUpdate}
                  </p>

                </div>

                <div>
                  <strong>
                    Servicio
                  </strong>

                  <p>
                    {shipment.service}
                  </p>

                </div>

                <div>
                  <strong>
                    Entrega estimada
                  </strong>

                  <p>
                    {shipment.estimatedDelivery}
                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="shipment-actions">

            <button
              className="btn-close"
              onClick={onClose}
            >
              Cerrar
            </button>

          </div>

        </div>

      </div>

      {showMap && (

        <ShipmentMapModal
          shipment={shipment}
          onClose={() =>
            setShowMap(false)
          }
        />

      )}

    </>
  );
}