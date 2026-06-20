import {
  getCarrierSimulation
} from "../../services/carrierAnalyticsService";

import "../../styles/CarrierSimulationCard.css";

export default function CarrierSimulationCard() {

  const simulation =
    getCarrierSimulation();

  return (

    <div className="simulation-card">

      <h2>
        💰 Simulación de Impacto
      </h2>

      <div className="simulation-block">

        <span>
          Actual
        </span>

        <strong>
          {simulation.currentCarrier}
        </strong>

      </div>

      <div className="simulation-block">

        <span>
          Recomendado
        </span>

        <strong>
          {simulation.suggestedCarrier}
        </strong>

      </div>

      <div className="simulation-metrics">

        <div>
          <strong>
            +$
            {simulation.monthlySavings.toLocaleString()}
          </strong>

          <span>
            Ahorro Mensual
          </span>
        </div>

        <div>
          <strong>
            -
            {simulation.incidentReduction}%
          </strong>

          <span>
            Incidencias
          </span>
        </div>

        <div>
          <strong>
            -
            {simulation.deliveryImprovement}
            días
          </strong>

          <span>
            Tiempo Entrega
          </span>
        </div>

      </div>

    </div>

  );
}