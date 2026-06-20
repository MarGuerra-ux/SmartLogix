import { useState } from "react";

import {
  getTrackingShipments
} from "../../services/trackingService";

import ShipmentDetailsModal from "../../components/tracking/ShipmentDetailsModal";

import TrackingStatusModal from "../../components/tracking/TrackingStatusModal";

import TrackingMapCard from "../../components/tracking/TrackingMapCard";

import TrackingActivityCard from "../../components/tracking/TrackingActivityCard";

import TrackingAlertsCard from "../../components/tracking/TrackingAlertsCard";

import TrackingAnalyticsCard from "../../components/tracking/TrackingAnalyticsCard";

import CourierPerformanceCard from "../../components/tracking/CourierPerformanceCard";

import "../../styles/TrackingPage.css";

export default function TrackingPage() {

  const [shipments] = useState(
    getTrackingShipments()
  );

  const [
    selectedShipment,
    setSelectedShipment
  ] = useState(null);

  const [
    statusModal,
    setStatusModal
  ] = useState({
    open: false,
    title: "",
    shipments: []
  });

  const inTransitShipments =
    shipments.filter(
      (shipment) =>
        shipment.status ===
        "En tránsito"
    );

  const onDeliveryShipments =
    shipments.filter(
      (shipment) =>
        shipment.status ===
        "En reparto"
    );

  const deliveredShipments = [
    {
      id: "ENT-001",
      orderNumber: "PED-2026-00120",
      customer: "Ana Torres",
      carrier: "Chilexpress",
      status: "Entregado"
    },
    {
      id: "ENT-002",
      orderNumber: "PED-2026-00121",
      customer: "Pedro Salas",
      carrier: "Blue Express",
      status: "Entregado"
    }
  ];

  const incidentShipments = [
    {
      id: "INC-001",
      orderNumber: "PED-2026-00119",
      customer: "Luis González",
      carrier: "Starken",
      status: "Retraso"
    },
    {
      id: "INC-002",
      orderNumber: "PED-2026-00118",
      customer: "María Soto",
      carrier: "Chilexpress",
      status: "Dirección inválida"
    }
  ];

  function openStatusModal(
    title,
    filteredShipments
  ) {

    setStatusModal({
      open: true,
      title,
      shipments: filteredShipments
    });

  }

  const deliveredToday =
    deliveredShipments.length;

  const incidents =
    incidentShipments.length;

  return (
    <>
      <div className="tracking-page">

        <div className="tracking-header">

          <div>

            <span className="tracking-label">
              OPERACIONES
            </span>

            <h1>
              Seguimiento
            </h1>

            <p className="tracking-subtitle">
              Monitoreo y trazabilidad
              de envíos en tiempo real.
            </p>

          </div>

        </div>

        <div className="tracking-stats">

          <div
            className="tracking-stat-card"
            onClick={() =>
              openStatusModal(
                "🚚 Envíos en Tránsito",
                inTransitShipments
              )
            }
          >

            <div className="tracking-stat-icon">
              🚚
            </div>

            <div>

              <h2>
                {inTransitShipments.length}
              </h2>

              <p>
                En tránsito
              </p>

            </div>

          </div>

          <div
            className="tracking-stat-card"
            onClick={() =>
              openStatusModal(
                "📍 Envíos en Reparto",
                onDeliveryShipments
              )
            }
          >

            <div className="tracking-stat-icon">
              📍
            </div>

            <div>

              <h2>
                {onDeliveryShipments.length}
              </h2>

              <p>
                En reparto
              </p>

            </div>

          </div>

          <div
            className="tracking-stat-card"
            onClick={() =>
              openStatusModal(
                "✅ Entregados Hoy",
                deliveredShipments
              )
            }
          >

            <div className="tracking-stat-icon">
              ✅
            </div>

            <div>

              <h2>
                {deliveredToday}
              </h2>

              <p>
                Entregados hoy
              </p>

            </div>

          </div>

          <div
            className="tracking-stat-card"
            onClick={() =>
              openStatusModal(
                "⚠️ Incidencias",
                incidentShipments
              )
            }
          >

            <div className="tracking-stat-icon">
              ⚠️
            </div>

            <div>

              <h2>
                {incidents}
              </h2>

              <p>
                Incidencias
              </p>

            </div>

          </div>

        </div>

        {/* Dashboard Superior */}

        <div className="tracking-dashboard-grid">

          <TrackingMapCard />

          <TrackingActivityCard />

        </div>

        {/* Dashboard Analítico */}

        <div className="tracking-insights-grid">

          <TrackingAnalyticsCard />

          <CourierPerformanceCard />

        </div>

        {/* Tabla principal */}

        <div className="tracking-table-card">

          <div className="tracking-card-header">

            <h2>
              📦 Últimos Envíos
            </h2>

          </div>

          <table className="tracking-table">

            <thead>

              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Courier</th>
                <th>Estado</th>
                <th>Última actualización</th>
              </tr>

            </thead>

            <tbody>

              {shipments.map(
                (shipment) => (

                  <tr
                    key={shipment.id}
                    onClick={() =>
                      setSelectedShipment(
                        shipment
                      )
                    }
                  >

                    <td>
                      {shipment.orderNumber}
                    </td>

                    <td>
                      {shipment.customer}
                    </td>

                    <td>
                      {shipment.carrier}
                    </td>

                    <td>
                      {shipment.status}
                    </td>

                    <td>
                      {shipment.lastUpdate}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* Alertas */}

        <TrackingAlertsCard />

      </div>

      {selectedShipment && (

        <ShipmentDetailsModal
          shipment={selectedShipment}
          onClose={() =>
            setSelectedShipment(null)
          }
        />

      )}

      {statusModal.open && (

        <TrackingStatusModal
          title={statusModal.title}
          shipments={
            statusModal.shipments
          }
          onClose={() =>
            setStatusModal({
              open: false,
              title: "",
              shipments: []
            })
          }
          onSelectShipment={(
            shipment
          ) => {

            setStatusModal({
              open: false,
              title: "",
              shipments: []
            });

            setSelectedShipment(
              shipment
            );

          }}
        />

      )}

    </>
  );
}