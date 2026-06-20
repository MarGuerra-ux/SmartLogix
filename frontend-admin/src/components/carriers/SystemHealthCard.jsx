import {
  getSystemHealth
} from "../../services/carrierAnalyticsService";

import "../../styles/SystemHealthCard.css";

export default function SystemHealthCard() {

  const health =
    getSystemHealth();

  return (

    <div className="system-health-card">

      <div className="health-header">

        <h2>
          🩺 Estado General
        </h2>

        <span className="health-status">
          🟢 {health.status}
        </span>

      </div>

      <div className="health-grid">

        <div className="health-item">
          <strong>
            {health.ordersToday}
          </strong>

          <span>
            Pedidos Hoy
          </span>
        </div>

        <div className="health-item">
          <strong>
            {health.activeShipments}
          </strong>

          <span>
            Envíos Activos
          </span>
        </div>

        <div className="health-item">
          <strong>
            {health.incidentsToday}
          </strong>

          <span>
            Incidencias
          </span>
        </div>

        <div className="health-item">
          <strong>
            {health.slaAverage}%
          </strong>

          <span>
            SLA Promedio
          </span>
        </div>

      </div>

    </div>

  );
}