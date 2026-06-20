import { useEffect, useState } from "react";

import {
  getCarriers
} from "../../services/carrierService";

import {
  getShippingQuotes
} from "../../services/multicarrierService";

import CarrierPolicyCard from "../../components/carriers/CarrierPolicyCard";

import CarrierDecisionEngine from "../../components/carriers/CarrierDecisionEngine";

import SystemHealthCard from "../../components/carriers/SystemHealthCard";

import CarrierRankingCard from "../../components/carriers/CarrierRankingCard";

import CarrierSimulationCard from "../../components/carriers/CarrierSimulationCard";

import CarrierPredictionCard from "../../components/carriers/CarrierPredictionCard";

import "../../styles/CarriersPage.css";

export default function CarriersPage() {

  const [carriers] = useState(
    getCarriers()
  );

  const [quotes, setQuotes] =
    useState([]);

  useEffect(() => {
    loadQuotes();
  }, []);

  async function loadQuotes() {

    try {

      const data =
        await getShippingQuotes();

      setQuotes(data);

    } catch (error) {

      console.error(
        "Error cargando cotizaciones:",
        error
      );
    }
  }

  const totalShipments =
    carriers.reduce(
      (acc, carrier) =>
        acc + carrier.shipments,
      0
    );

  return (

    <div className="carriers-page">

      <div className="page-header">

        <h1>
          🚚 Transportistas
        </h1>

        <p>
          Gestión inteligente de
          transportistas y optimización
          logística.
        </p>

      </div>

      <div className="stats-grid">

        <div className="stat-card">

          <h3>
            Transportistas Activos
          </h3>

          <span>
            {carriers.length}
          </span>

        </div>

        <div className="stat-card">

          <h3>
            Envíos del Mes
          </h3>

          <span>
            {totalShipments}
          </span>

        </div>

        <div className="stat-card">

          <h3>
            Tasa de Éxito
          </h3>

          <span>
            98.2%
          </span>

        </div>

        <div className="stat-card">

          <h3>
            Tiempo Promedio
          </h3>

          <span>
            2.2 días
          </span>

        </div>

      </div>

      <SystemHealthCard />

      <div className="carrier-main-grid">

        <div className="carrier-left-column">

          <div className="integration-card">

            <h2>
              🔗 Integración Multicarrier
            </h2>

            <div className="integration-status">

              <span className="status-dot"></span>

              Conectado

            </div>

            <p>
              SmartLogix está preparado
              para operar con Starken,
              Chilexpress y Blue Express.
            </p>

          </div>

          <CarrierPolicyCard
            carriers={carriers}
          />

          <CarrierDecisionEngine />

        </div>

        <div className="carrier-right-column">

          <CarrierRankingCard />

          <CarrierSimulationCard />

          <CarrierPredictionCard />

        </div>

      </div>

      <div className="quotes-card">

        <h2>
          📊 Últimas Cotizaciones
        </h2>

        <table>

          <thead>

            <tr>
              <th>Courier</th>
              <th>Precio</th>
              <th>Días</th>
              <th>Servicio</th>
            </tr>

          </thead>

          <tbody>

            {quotes.map((quote) => (

              <tr key={quote.id}>

                <td>
                  {quote.carrier}
                </td>

                <td>
                  $
                  {quote.price.toLocaleString()}
                </td>

                <td>
                  {quote.estimatedDays}
                </td>

                <td>
                  {quote.service}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="carriers-table-card">

        <h2>
          🚛 Estado de Couriers
        </h2>

        <table>

          <thead>

            <tr>
              <th>Courier</th>
              <th>Estado</th>
              <th>Envíos</th>
              <th>Promedio</th>
              <th>% Éxito</th>
              <th>Tracking</th>
              <th>Etiquetas</th>
              <th>API</th>
            </tr>

          </thead>

          <tbody>

            {carriers.map((carrier) => (

              <tr key={carrier.id}>

                <td>
                  {carrier.name}
                </td>

                <td>
                  {carrier.status}
                </td>

                <td>
                  {carrier.shipments}
                </td>

                <td>
                  {carrier.avgDelivery}
                </td>

                <td>
                  {carrier.successRate}
                </td>

                <td>
                  {carrier.tracking
                    ? "✅"
                    : "❌"}
                </td>

                <td>
                  {carrier.labels
                    ? "✅"
                    : "❌"}
                </td>

                <td>
                  {carrier.apiConnected
                    ? "🟢"
                    : "🔴"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}