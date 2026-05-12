import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

import "../../styles/ModulePages.css";
import "../../styles/dashboard.css";

function formatPrice(value) {
  return `$${Number(value || 0).toLocaleString("es-CL", {
    maximumFractionDigits: 0,
  })}`;
}

function formatDate(value) {
  if (!value) return "Sin fecha";

  return new Date(value).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(value) {
  if (!value) return "Sin hora";

  return new Date(value).toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDateKey(value) {
  if (!value) return "";
  return new Date(value).toISOString().split("T")[0];
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("smartlogix_user"));
  } catch {
    return null;
  }
}

function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = getCurrentUser();

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    const [ordersRes, productsRes, shipmentsRes, refundsRes, clientsRes, usersRes] =
      await Promise.all([
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
        supabase.from("products").select("*"),
        supabase.from("shipping_quotes").select("*").order("created_at", { ascending: false }),
        supabase.from("refunds").select("*").order("created_at", { ascending: false }),
        supabase.from("clients").select("*"),
        supabase.from("admin_users").select("*"),
      ]);

    setOrders(ordersRes.data || []);
    setProducts(productsRes.data || []);
    setShipments(shipmentsRes.data || []);
    setRefunds(refundsRes.data || []);
    setClients(clientsRes.data || []);
    setUsers(usersRes.data || []);

    setLoading(false);
  }

  const todayKey = getDateKey(new Date());

  const approvedOrders = orders.filter((order) => order.status === "Aprobado");
  const pendingOrders = orders.filter((order) => order.status === "Pendiente");
  const rejectedOrders = orders.filter((order) => order.status === "Rechazado");

  const todayApprovedOrders = approvedOrders.filter(
    (order) => getDateKey(order.created_at) === todayKey
  );

  const todayRefunds = refunds.filter(
    (refund) => getDateKey(refund.created_at) === todayKey
  );

  const dailyIncome = todayApprovedOrders.reduce(
    (sum, order) => sum + Number(order.total_amount || 0),
    0
  );

  const dailyRefundAmount = todayRefunds.reduce(
    (sum, refund) => sum + Number(refund.refund_amount || 0),
    0
  );

  const dailyCash = dailyIncome - dailyRefundAmount;

  const totalSales = approvedOrders.reduce(
    (sum, order) => sum + Number(order.total_amount || 0),
    0
  );

  const activeShipments = shipments.filter(
    (shipment) =>
      shipment.status === "Preparando envío" ||
      shipment.status === "En tránsito"
  );

  const pendingRefunds = refunds.filter((refund) => refund.status === "Pendiente");

  const criticalProducts = products.filter(
    (product) => product.status === "Stock Bajo" || product.status === "Agotado"
  );

  const activeUsers = users.filter((user) => user.status === "Activo");

  const dailySales = useMemo(() => {
    const salesByDay = {};

    approvedOrders.forEach((order) => {
      const key = new Date(order.created_at).toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "2-digit",
      });

      salesByDay[key] = (salesByDay[key] || 0) + Number(order.total_amount || 0);
    });

    return Object.entries(salesByDay)
      .map(([day, amount]) => ({ day, amount }))
      .slice(-10);
  }, [approvedOrders]);

  const maxSales = Math.max(...dailySales.map((item) => item.amount), 1);

  const chartWidth = 760;
  const chartHeight = 250;
  const paddingX = 42;
  const paddingTop = 28;
  const paddingBottom = 42;

  const chartPoints = dailySales
    .map((item, index) => {
      const usableWidth = chartWidth - paddingX * 2;
      const usableHeight = chartHeight - paddingTop - paddingBottom;

      const x =
        dailySales.length === 1
          ? chartWidth / 2
          : paddingX + (index * usableWidth) / (dailySales.length - 1);

      const y =
        paddingTop + usableHeight - (item.amount / maxSales) * usableHeight;

      return `${x},${y}`;
    })
    .join(" ");

  const topProducts = useMemo(() => {
    const map = {};

    approvedOrders.forEach((order) => {
      const product = products.find((item) => item.id === order.product_id);
      const name = product?.name || "Producto no registrado";

      if (!map[name]) {
        map[name] = {
          name,
          quantity: 0,
          total: 0,
        };
      }

      map[name].quantity += Number(order.quantity || 1);
      map[name].total += Number(order.total_amount || 0);
    });

    return Object.values(map)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [approvedOrders, products]);

  const recentOrders = orders.slice(0, 5);

  const recentFinancialMovements = [
    ...approvedOrders.slice(0, 5).map((order) => ({
      id: `sale-${order.id}`,
      type: "Ingreso",
      source: "Venta aprobada",
      amount: Number(order.total_amount || 0),
      date: order.created_at,
    })),
    ...refunds.slice(0, 5).map((refund) => ({
      id: `refund-${refund.id}`,
      type: "Egreso",
      source: "Reembolso",
      amount: Number(refund.refund_amount || 0),
      date: refund.created_at,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  const recentActivity = [
    ...approvedOrders.slice(0, 4).map((order) => ({
      id: `activity-order-${order.id}`,
      icon: "✅",
      title: "Pedido aprobado",
      description: order.order_code || `Pedido ${order.id}`,
      date: order.updated_at || order.created_at,
    })),
    ...shipments.slice(0, 4).map((shipment) => ({
      id: `activity-shipment-${shipment.id}`,
      icon: "🚚",
      title: "Movimiento logístico",
      description: shipment.status || "Envío registrado",
      date: shipment.created_at,
    })),
    ...refunds.slice(0, 4).map((refund) => ({
      id: `activity-refund-${refund.id}`,
      icon: "↩️",
      title: "Reembolso registrado",
      description: refund.customer_name || "Cliente no registrado",
      date: refund.created_at,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  if (loading) {
    return (
      <section className="module-page">
        <div className="placeholder-card">
          <div className="placeholder-icon">⏳</div>
          <h2>Cargando Dashboard...</h2>
          <p>Obteniendo información operacional desde Supabase.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="module-page dashboard-page">
      <div className="dashboard-hero">
        <div>
          <span>PANEL OPERACIONAL</span>
          <h1>Dashboard SmartLogix</h1>
          <p>
              Resumen en tiempo real de ventas, pedidos, inventario, envíos,
              reembolsos y caja diaria dentro de SmartLogix.
          </p>
        </div>

        <div className="dashboard-hero-status">
          <strong>Sistema operativo</strong>
          <span>{formatDate(new Date())}</span>
          <p>{activeUsers.length} usuarios activos</p>
        </div>
      </div>

      <div className="dashboard-kpi-grid">
        <article className="dashboard-kpi-card positive">
          <span>Ventas del día</span>
          <strong>{formatPrice(dailyIncome)}</strong>
          <p>Pedidos aprobados hoy.</p>
        </article>

        <article className="dashboard-kpi-card warning">
          <span>Pedidos pendientes</span>
          <strong>{pendingOrders.length}</strong>
          <p>Requieren revisión administrativa.</p>
        </article>

        <article className="dashboard-kpi-card neutral">
          <span>Envíos activos</span>
          <strong>{activeShipments.length}</strong>
          <p>Preparando o en tránsito.</p>
        </article>

        <article className="dashboard-kpi-card negative">
          <span>Reembolsos pendientes</span>
          <strong>{pendingRefunds.length}</strong>
          <p>Solicitudes por procesar.</p>
        </article>

        <article
          className={`dashboard-kpi-card ${
            dailyCash >= 0 ? "positive" : "negative"
          }`}
        >
          <span>Caja diaria</span>
          <strong>{formatPrice(dailyCash)}</strong>
          <p>Ingresos menos reembolsos.</p>
        </article>
      </div>

      <div className="dashboard-main-grid">
        <article className="dashboard-panel dashboard-chart-panel">
          <div className="dashboard-panel-header">
            <div>
              <span>VENTAS</span>
              <h2>Ventas diarias del mes</h2>
              <p>Últimos registros de ingresos aprobados.</p>
            </div>

            <strong>{formatPrice(totalSales)}</strong>
          </div>

          <svg
            className="dashboard-line-chart"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            <line x1="42" y1="210" x2="720" y2="210" />

            <polyline points={chartPoints} />

            {dailySales.map((item, index) => {
              const usableWidth = chartWidth - paddingX * 2;
              const usableHeight = chartHeight - paddingTop - paddingBottom;

              const x =
                dailySales.length === 1
                  ? chartWidth / 2
                  : paddingX + (index * usableWidth) / (dailySales.length - 1);

              const y =
                paddingTop +
                usableHeight -
                (item.amount / maxSales) * usableHeight;

              return (
                <g key={item.day}>
                  <circle cx={x} cy={y} r="5" />
                  <text x={x} y="238" textAnchor="middle">
                    {item.day}
                  </text>
                </g>
              );
            })}
          </svg>
        </article>

        <article className="dashboard-panel dashboard-alert-panel">
          <div className="dashboard-panel-header compact">
            <div>
              <span>ALERTAS</span>
              <h2>Estado del sistema</h2>
            </div>
          </div>

          <div className="dashboard-alert-list">
            <div className="alert-item warning">
              <strong>Stock crítico</strong>
              <span>{criticalProducts.length} productos requieren revisión</span>
            </div>

            <div className="alert-item negative">
              <strong>Reembolsos</strong>
              <span>{pendingRefunds.length} pendientes</span>
            </div>

            <div className="alert-item neutral">
              <strong>Integraciones</strong>
              <span>Correo SMTP en configuración parcial</span>
            </div>

            <div className="alert-item positive">
              <strong>Base de datos</strong>
              <span>Supabase conectado</span>
            </div>
          </div>
        </article>
      </div>

      <div className="dashboard-secondary-grid">
        <article className="dashboard-panel">
          <div className="dashboard-panel-header compact">
            <div>
              <span>PEDIDOS</span>
              <h2>Últimos pedidos</h2>
            </div>
          </div>

          <div className="dashboard-mini-list">
            {recentOrders.map((order) => (
              <div className="dashboard-mini-item" key={order.id}>
                <div>
                  <strong>{order.order_code || `PED-${order.id}`}</strong>
                  <span>{formatDate(order.created_at)}</span>
                </div>

                <span
                  className={`dashboard-status-badge ${
                    order.status === "Aprobado"
                      ? "positive"
                      : order.status === "Rechazado"
                      ? "negative"
                      : "warning"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-header compact">
            <div>
              <span>FINANZAS</span>
              <h2>Movimientos recientes</h2>
            </div>
          </div>

          <div className="dashboard-mini-list">
            {recentFinancialMovements.map((movement) => (
              <div className="dashboard-mini-item" key={movement.id}>
                <div>
                  <strong>{movement.source}</strong>
                  <span>{formatTime(movement.date)}</span>
                </div>

                <strong
                  className={
                    movement.type === "Ingreso"
                      ? "dashboard-income"
                      : "dashboard-expense"
                  }
                >
                  {movement.type === "Ingreso" ? "+" : "-"}
                  {formatPrice(movement.amount)}
                </strong>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-header compact">
            <div>
              <span>TOP VENTAS</span>
              <h2>Productos líderes</h2>
            </div>
          </div>

          <div className="dashboard-top-products">
            {topProducts.map((product, index) => (
              <div className="dashboard-top-product" key={product.name}>
                <span>#{index + 1}</span>

                <div>
                  <strong>{product.name}</strong>
                  <p>
                    {product.quantity} unidades · {formatPrice(product.total)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="dashboard-secondary-grid bottom">
        <article className="dashboard-panel dashboard-activity-panel">
          <div className="dashboard-panel-header compact">
            <div>
              <span>ACTIVIDAD</span>
              <h2>Actividad reciente</h2>
            </div>
          </div>

          <div className="dashboard-activity-list">
            {recentActivity.map((activity) => (
              <div className="dashboard-activity-item" key={activity.id}>
                <div className="activity-icon">{activity.icon}</div>

                <div>
                  <strong>{activity.title}</strong>
                  <p>{activity.description}</p>
                  <span>{formatDate(activity.date)} · {formatTime(activity.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-panel dashboard-modules-panel">
          <div className="dashboard-panel-header compact">
            <div>
              <span>MÓDULOS</span>
              <h2>Estado de módulos</h2>
            </div>
          </div>

          <div className="module-status-grid">
            <div className="module-status-item positive">Inventario operativo</div>
            <div className="module-status-item positive">Ventas operativo</div>
            <div className="module-status-item neutral">Logística normal</div>
            <div className="module-status-item warning">Correo parcial</div>
            <div className="module-status-item positive">Usuarios activo</div>
            <div className="module-status-item negative">
              {rejectedOrders.length} pedidos rechazados
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default DashboardPage;