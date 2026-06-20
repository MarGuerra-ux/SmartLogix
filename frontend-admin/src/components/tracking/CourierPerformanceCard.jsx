import {
  getCourierPerformance
} from "../../services/trackingAnalyticsService";

import "../../styles/CourierPerformanceCard.css";

export default function CourierPerformanceCard() {

  const couriers =
    getCourierPerformance();

  return (

    <div className="courier-performance-card">

      <h2>
        🚚 Rendimiento de Couriers (SLA)
      </h2>

      <div className="courier-performance-list">

        {couriers.map((courier) => (

          <div
            key={courier.carrier}
            className="courier-performance-item"
          >

            <div className="courier-performance-header">

              <span>
                {courier.carrier}
              </span>

              <strong>
                {courier.sla}%
              </strong>

            </div>

            <div className="courier-bar">

              <div
                className="courier-bar-fill"
                style={{
                  width:
                    `${courier.sla}%`
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}