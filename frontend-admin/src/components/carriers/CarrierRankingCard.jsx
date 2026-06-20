import {
  getCarrierRanking
} from "../../services/carrierAnalyticsService";

import "../../styles/CarrierRankingCard.css";

export default function CarrierRankingCard() {

  const ranking =
    getCarrierRanking();

  return (

    <div className="ranking-card">

      <h2>
        🏆 Ranking de Couriers
      </h2>

      {ranking.map(
        (carrier, index) => (

          <div
            key={carrier.carrier}
            className="ranking-item"
          >

            <div>

              <strong>
                {index === 0 && "🥇 "}
                {index === 1 && "🥈 "}
                {index === 2 && "🥉 "}

                {carrier.carrier}
              </strong>

              <p>
                SLA {carrier.sla}% ·
                {carrier.incidents} incidencias
              </p>

            </div>

            <div className="ranking-score">
              {carrier.score}
            </div>

          </div>

        )
      )}

    </div>

  );
}