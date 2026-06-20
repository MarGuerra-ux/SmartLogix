import {
  getCarrierPrediction
} from "../../services/carrierAnalyticsService";

import "../../styles/CarrierPredictionCard.css";

export default function CarrierPredictionCard() {

  const prediction =
    getCarrierPrediction();

  return (

    <div className="prediction-card">

      <h2>
        🔮 Predicción 7 Días
      </h2>

      <div className="prediction-item">

        <span>
          Incidencias Esperadas
        </span>

        <strong>
          {prediction.expectedIncidents}
        </strong>

      </div>

      <div className="prediction-item">

        <span>
          Courier Más Estable
        </span>

        <strong>
          {prediction.stableCarrier}
        </strong>

      </div>

      <div className="prediction-item">

        <span>
          Courier con Riesgo
        </span>

        <strong>
          {prediction.riskCarrier}
        </strong>

      </div>

      <div className="prediction-item">

        <span>
          Confianza
        </span>

        <strong>
          {prediction.confidence}%
        </strong>

      </div>

    </div>

  );
}