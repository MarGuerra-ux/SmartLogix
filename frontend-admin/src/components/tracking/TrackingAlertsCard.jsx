import {
  getTrackingAlerts
} from "../../services/trackingAnalyticsService";

import "../../styles/TrackingAlertsCard.css";

export default function TrackingAlertsCard() {

  const alerts =
    getTrackingAlerts();

  return (

    <div className="tracking-alerts-card">

      <h2>
        ⚠️ Alertas Operacionales
      </h2>

      <div className="alerts-container">

        {alerts.map((alert) => (

          <div
            key={alert.id}
            className="alert-item"
          >

            {alert.message}

          </div>

        ))}

      </div>

    </div>

  );
}