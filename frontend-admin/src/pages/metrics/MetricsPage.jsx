import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

import "../../styles/ModulePages.css";
import "../../styles/MetricsPage.css";

function formatPrice(value) {
  return `$${Number(value || 0).toLocaleString("es-CL", {
    maximumFractionDigits: 0,
  })}`;
}

function MetricsPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  async function loadMetrics() {
    setLoading(true);

    const [ordersRes, productsRes, shipmentsRes, refundsRes] =
      await Promise.all([
        supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: true }),

        supabase.from("products").select("*"),

        supabase.from("shipping_quotes").select("*"),

        supabase.from("refunds").select("*"),
      ]);

    setOrders(ordersRes.data || []);
    setProducts(productsRes.data || []);
    setShipments(shipmentsRes.data || []);
    setRefunds(refundsRes.data || []);

    setLoading(false);
  }

  const approvedOrders = useMemo(
    () => orders.filter((o) => o.status === "Aprobado"),
    [orders]
  );

  const rejectedOrders = useMemo(
    () => orders.filter((o) => o.status === "Rechazado"),
    [orders]
  );

  const totalSales = approvedOrders.reduce(
    (sum, order) => sum + Number(order.total_amount || 0),
    0
  );

  const averageTicket =
    approvedOrders.length > 0
      ? totalSales / approvedOrders.length
      : 0;

  const criticalProducts = products.filter(
    (p) =>
      p.status === "Stock Bajo" ||
      p.status === "Agotado"
  );

  const activeShipments = shipments.filter(
    (s) =>
      s.status === "Preparando envío" ||
      s.status === "En tránsito"
  );

  const pendingRefunds = refunds.filter(
    (r) => r.status === "Pendiente"
  );

  const approvalRate =
    orders.length > 0
      ? Math.round(
          (approvedOrders.length / orders.length) * 100
        )
      : 0;

  const dailySales = useMemo(() => {
    const salesByDay = {};

    approvedOrders.forEach((order) => {
      const date = new Date(order.created_at);

      const key = date.toLocaleDateString("es-CL", {
        day: "numeric",
        month: "numeric",
      });

      salesByDay[key] =
        (salesByDay[key] || 0) +
        Number(order.total_amount || 0);
    });

    return Object.entries(salesByDay).map(
      ([day, amount]) => ({
        day,
        amount,
      })
    );
  }, [approvedOrders]);

  const maxSales = Math.max(
    ...dailySales.map((item) => item.amount),
    1
  );

  const chartWidth = 760;
  const chartHeight = 260;

  const paddingX = 40;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartPoints = dailySales
    .map((item, index) => {
      const usableWidth =
        chartWidth - paddingX * 2;

      const usableHeight =
        chartHeight -
        paddingTop -
        paddingBottom;

      const x =
        dailySales.length === 1
          ? chartWidth / 2
          : paddingX +
            (index * usableWidth) /
              (dailySales.length - 1);

      const y =
        paddingTop +
        usableHeight -
        (item.amount / maxSales) *
          usableHeight;

      return `${x},${y}`;
    })
    .join(" ");

  const projectedNextMonth = useMemo(() => {
    if (dailySales.length === 0) return 0;

    const averageDaily =
      totalSales / dailySales.length;

    return averageDaily * 30 * 1.12;
  }, [dailySales, totalSales]);

  const topProducts = useMemo(() => {
    const map = {};

    approvedOrders.forEach((order) => {
      const product = products.find(
        (p) => p.id === order.product_id
      );

      const name =
        product?.name ||
        "Producto sin nombre";

      if (!map[name]) {
        map[name] = {
          name,
          quantity: 0,
          total: 0,
        };
      }

      map[name].quantity += Number(
        order.quantity || 1
      );

      map[name].total += Number(
        order.total_amount || 0
      );
    });

    return Object.values(map)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  }, [approvedOrders, products]);

  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">
          MÓDULO ANALÍTICO
        </span>

        <h1 className="module-page-title">
          Métricas
        </h1>

        <p className="module-page-description">
          Indicadores clave de rendimiento
          operativo: ventas, pedidos,
          stock, logística y reembolsos.
        </p>
      </div>

      {loading ? (
        <div className="placeholder-card">
          <div className="placeholder-icon">
            ⏳
          </div>

          <h2>Cargando métricas...</h2>

          <p>
            Obteniendo información desde
            Supabase.
          </p>
        </div>
      ) : (
        <>
          {/* KPI GRID */}

          <div className="analytics-kpi-grid">
            <article className="analytics-kpi-card positive">
              <span>Ventas totales</span>

              <strong>
                {formatPrice(totalSales)}
              </strong>

              <p>
                Ingresos por pedidos
                aprobados.
              </p>
            </article>

            <article className="analytics-kpi-card positive">
              <span>
                Pedidos aprobados
              </span>

              <strong>
                {approvedOrders.length}
              </strong>

              <p>
                {approvalRate}% de
                aprobación general.
              </p>
            </article>

            <article className="analytics-kpi-card neutral">
              <span>
                Ticket promedio
              </span>

              <strong>
                {formatPrice(
                  averageTicket
                )}
              </strong>

              <p>
                Ingreso promedio por
                pedido.
              </p>
            </article>

            <article className="analytics-kpi-card warning">
              <span>
                Stock crítico
              </span>

              <strong>
                {criticalProducts.length}
              </strong>

              <p>
                Productos bajos o
                agotados.
              </p>
            </article>
          </div>

          {/* MAIN GRID */}

          <div className="analytics-main-grid">
            {/* GRAFICO */}

            <article className="analytics-panel sales-chart-panel">
              <div className="analytics-panel-header">
                <div>
                  <span>VENTAS</span>

                  <h2>
                    Ventas diarias del
                    mes
                  </h2>

                  <p>
                    Evolución diaria de
                    pedidos aprobados.
                  </p>
                </div>

                <strong>
                  {formatPrice(
                    totalSales
                  )}
                </strong>
              </div>

              <svg
                className="daily-sales-chart"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              >
                <line
                  x1="40"
                  y1="220"
                  x2="730"
                  y2="220"
                />

                <polyline
                  points={chartPoints}
                />

                {dailySales.map(
                  (item, index) => {
                    const usableWidth =
                      chartWidth -
                      paddingX * 2;

                    const usableHeight =
                      chartHeight -
                      paddingTop -
                      paddingBottom;

                    const x =
                      dailySales.length ===
                      1
                        ? chartWidth / 2
                        : paddingX +
                          (index *
                            usableWidth) /
                            (dailySales.length -
                              1);

                    const y =
                      paddingTop +
                      usableHeight -
                      (item.amount /
                        maxSales) *
                        usableHeight;

                    return (
                      <g key={item.day}>
                        <circle
                          cx={x}
                          cy={y}
                          r="5"
                        />

                        <text
                          x={x}
                          y="245"
                          textAnchor="middle"
                        >
                          {item.day}
                        </text>
                      </g>
                    );
                  }
                )}
              </svg>
            </article>

            {/* PROYECCION */}

            <article className="analytics-panel projection-panel">
              <span>
                PROYECCIÓN
              </span>

              <h2>
                Próximo mes
              </h2>

              <strong>
                {formatPrice(
                  projectedNextMonth
                )}
              </strong>

              <p>
                Estimación basada en el
                promedio diario actual
                con crecimiento
                proyectado del 12%.
              </p>

              <div className="projection-badge positive">
                ↑ Crecimiento estimado
              </div>
            </article>
          </div>

          {/* SECONDARY GRID */}

          <div className="analytics-secondary-grid">
            {/* TOP PRODUCTS */}

            <article className="analytics-panel">
              <div className="analytics-panel-header">
                <div>
                  <span>RANKING</span>

                  <h2>
                    Productos más
                    vendidos
                  </h2>
                </div>
              </div>

              <div className="analytics-ranking-list">
                {topProducts.map(
                  (product, index) => (
                    <div
                      className="analytics-ranking-item"
                      key={product.name}
                    >
                      <span>
                        #{index + 1}
                      </span>

                      <div>
                        <strong>
                          {product.name}
                        </strong>

                        <p>
                          {
                            product.quantity
                          }{" "}
                          unidades ·{" "}
                          {formatPrice(
                            product.total
                          )}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </article>

            {/* ESTADO */}

            <article className="analytics-panel">
              <div className="analytics-panel-header">
                <div>
                  <span>
                    OPERACIÓN
                  </span>

                  <h2>
                    Estado operacional
                  </h2>
                </div>
              </div>

              <div className="analytics-status-list">
                <div>
                  <span>
                    Envíos activos
                  </span>

                  <strong className="positive-text">
                    {
                      activeShipments.length
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Reembolsos
                    pendientes
                  </span>

                  <strong className="negative-text">
                    {
                      pendingRefunds.length
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Pedidos rechazados
                  </span>

                  <strong className="negative-text">
                    {
                      rejectedOrders.length
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Productos críticos
                  </span>

                  <strong className="warning-text">
                    {
                      criticalProducts.length
                    }
                  </strong>
                </div>
              </div>
            </article>

            {/* RESUMEN */}

            <article className="analytics-panel summary-panel">
              <span>RESUMEN</span>

              <h2>
                Lectura ejecutiva
              </h2>

              <p>
                SmartLogix presenta un
                comportamiento comercial
                positivo, con ventas en
                crecimiento, pedidos
                aprobados y control
                operacional sobre
                stock, envíos y
                reembolsos.
              </p>
            </article>
          </div>
        </>
      )}
    </section>
  );
}

export default MetricsPage;