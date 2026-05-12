import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboardService";

import "../../styles/dashboard.css";
import "../../styles/ModulePages.css";

function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      const data = await getDashboardData();
      setDashboard(data);
    }

    loadDashboard();
  }, []);

  if (!dashboard) {
    return (
      <p className="loading-text">
        Cargando métricas...
      </p>
    );
  }

  return (
    <section className="dashboard-page">
      <div className="module-page-header">
        <span className="module-page-kicker">
          PANEL OPERACIONAL
        </span>

        <h1 className="module-page-title">
          Dashboard
        </h1>

        <p className="module-page-description">
          Indicadores principales de ventas, pedidos, inventario y envíos
          dentro del ecosistema SmartLogix.
        </p>
      </div>

      <div className="kpi-grid">
        <article className="kpi-card">
          <span>🧾 Pedidos del día</span>

          <strong>{dashboard.ordersToday}</strong>
        </article>

        <article className="kpi-card">
          <span>⏳ Pedidos pendientes</span>

          <strong>{dashboard.pendingOrders}</strong>
        </article>

        <article className="kpi-card">
          <span>✅ Pedidos completados</span>

          <strong>{dashboard.completedOrders}</strong>
        </article>

        <article className="kpi-card">
          <span>🚚 Envíos en tránsito</span>

          <strong>{dashboard.inTransitShipments}</strong>
        </article>

        <article className="kpi-card money">
          <span>💰 Ventas totales</span>

          <strong>
            ${dashboard.totalSales.toLocaleString("es-CL")}
          </strong>
        </article>

        <article className="kpi-card money">
          <span>🏦 Caja diaria</span>

          <strong>
            ${dashboard.dailyCash.toLocaleString("es-CL")}
          </strong>
        </article>
      </div>

      <div className="dashboard-content">
        <article className="top-sales-card">
          <div className="section-title">
            <h3>
              🏆 Top 5 productos más vendidos
            </h3>

            <p>
              Productos con mayor movimiento dentro de la plataforma.
            </p>
          </div>

          <div className="top-sales-list">
            {dashboard.topSales.map((product, index) => (
              <div
                className="top-sales-item"
                key={product.name}
              >
                <div className="ranking-number">
                  {index + 1}
                </div>

                <div className="product-info">
                  <strong>{product.name}</strong>

                  <span>
                    {product.quantity} unidades vendidas
                  </span>
                </div>

                <div className="product-total">
                  ${product.total.toLocaleString("es-CL")}
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export default DashboardPage;