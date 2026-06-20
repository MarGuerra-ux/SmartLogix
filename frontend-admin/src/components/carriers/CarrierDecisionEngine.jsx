import {
  getCarrierRanking,
  getRecommendedCarrier
} from "../../services/carrierDecisionService";

import {
  getCarrierSimulation,
  getCarrierPrediction
} from "../../services/carrierAnalyticsService";

import "../../styles/CarrierDecisionEngine.css";

export default function CarrierDecisionEngine() {

  const ranking =
    getCarrierRanking();

  const recommended =
    getRecommendedCarrier();

  const simulation =
    getCarrierSimulation();

  const prediction =
    getCarrierPrediction();

  return (
    <div className="decision-engine-card">

      <div className="decision-engine-header">

        <h2>
          🎯 Motor de Selección Inteligente
        </h2>

        <span className="decision-badge">
          Activo
        </span>

      </div>

      <p className="decision-description">
        SmartLogix analiza desempeño,
        SLA, incidencias, tiempos de
        entrega y costos para seleccionar
        automáticamente el courier más
        conveniente para cada pedido.
      </p>

      <div className="recommended-carrier">

        <h3>
          Courier Recomendado
        </h3>

        <span>
          ⭐ {recommended.carrier}
        </span>

      </div>

      <div className="decision-insights">

        <div className="decision-insight">

          <strong>
            {prediction.confidence}%
          </strong>

          <span>
            Confianza IA
          </span>

        </div>

        <div className="decision-insight">

          <strong>
            +$
            {simulation.monthlySavings.toLocaleString()}
          </strong>

          <span>
            Ahorro Estimado
          </span>

        </div>

        <div className="decision-insight">

          <strong>
            -{simulation.incidentReduction}%
          </strong>

          <span>
            Incidencias
          </span>

        </div>

      </div>

      <table className="decision-table">

        <thead>

          <tr>
            <th>Courier</th>
            <th>Score</th>
            <th>SLA</th>
            <th>Incidencias</th>
            <th>Costo Prom.</th>
          </tr>

        </thead>

        <tbody>

          {ranking.map((carrier) => (

            <tr key={carrier.carrier}>

              <td>
                {carrier.carrier}
              </td>

              <td>
                {carrier.score}
              </td>

              <td>
                {carrier.sla}%
              </td>

              <td>
                {carrier.incidents}
              </td>

              <td>
                $
                {carrier.avgCost.toLocaleString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}