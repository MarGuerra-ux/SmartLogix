import {
  getTrackingDistribution
} from "../../services/trackingAnalyticsService";

import "../../styles/TrackingAnalyticsCard.css";

export default function TrackingAnalyticsCard() {

  const distribution =
    getTrackingDistribution();

  const total =
    distribution.delivered +
    distribution.inTransit +
    distribution.onDelivery +
    distribution.preparing;

  return (
    <div className="tracking-analytics-card">

      <h2>
        📊 Distribución por Estado
      </h2>

      <div className="distribution-total">

        <strong>
          {total}
        </strong>

        <span>
          Total envíos
        </span>

      </div>

      <div className="distribution-list">

        <div className="distribution-item">
          <span>🟢 Entregados</span>
          <strong>{distribution.delivered}</strong>
        </div>

        <div className="distribution-item">
          <span>🔵 En tránsito</span>
          <strong>{distribution.inTransit}</strong>
        </div>

        <div className="distribution-item">
          <span>🟣 En reparto</span>
          <strong>{distribution.onDelivery}</strong>
        </div>

        <div className="distribution-item">
          <span>🟠 Preparando</span>
          <strong>{distribution.preparing}</strong>
        </div>

      </div>

    </div>
  );
}