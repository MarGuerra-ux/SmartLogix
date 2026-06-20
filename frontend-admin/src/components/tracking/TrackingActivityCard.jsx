import {
  getRecentActivity
} from "../../services/trackingAnalyticsService";

import "../../styles/TrackingActivityCard.css";

export default function TrackingActivityCard() {

  const activities =
    getRecentActivity();

  return (

    <div className="tracking-activity-card">

      <h2>
        🔔 Actividad Reciente
      </h2>

      {activities.map(
        (activity) => (

          <div
            key={activity.id}
            className="activity-item"
          >

            <strong>
              {activity.orderNumber}
            </strong>

            <span>
              {activity.status}
            </span>

            <span>
              {activity.lastUpdate}
            </span>

          </div>

        )
      )}

    </div>

  );
}