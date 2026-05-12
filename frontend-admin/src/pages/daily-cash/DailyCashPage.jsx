import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

import "../../styles/ModulePages.css";
import "../../styles/DailyCashPage.css";

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

function DailyCashPage() {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCashData();
  }, []);

  async function loadCashData() {
    setLoading(true);

    const [ordersRes, clientsRes, productsRes, refundsRes] =
      await Promise.all([
        supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false }),

        supabase.from("clients").select("*"),

        supabase.from("products").select("*"),

        supabase
          .from("refunds")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

    const loadedOrders = ordersRes.data || [];
    const loadedRefunds = refundsRes.data || [];

    setOrders(loadedOrders);
    setClients(clientsRes.data || []);
    setProducts(productsRes.data || []);
    setRefunds(loadedRefunds);

    const allDates = [
      ...loadedOrders.map((order) => order.created_at),
      ...loadedRefunds.map((refund) => refund.created_at),
    ].filter(Boolean);

    if (allDates.length > 0) {
      const latestDate = allDates
        .map((date) => new Date(date))
        .sort((a, b) => b - a)[0];

      setSelectedDate(latestDate.toISOString().split("T")[0]);
    }

    setLoading(false);
  }

  const salesMovements = useMemo(() => {
    return orders
      .filter((order) => order.status === "Aprobado")
      .map((order) => {
        const client = clients.find((c) => c.id === order.customer_id);
        const product = products.find((p) => p.id === order.product_id);

        return {
          id: `sale-${order.id}`,
          type: "Ingreso",
          source: "Venta",
          date: order.created_at,
          code: order.order_code || `PED-${order.id}`,
          customerName: client?.full_name || "Cliente no registrado",
          productName: product?.name || "Producto no registrado",
          amount: Number(order.total_amount || 0),
          status: order.payment_status || "Pagado",
        };
      });
  }, [orders, clients, products]);

  const refundMovements = useMemo(() => {
    return refunds.map((refund) => ({
      id: `refund-${refund.id}`,
      type: "Egreso",
      source: "Reembolso",
      date: refund.created_at,
      code: refund.order_id || `REF-${refund.id}`,
      customerName: refund.customer_name || "Cliente no registrado",
      productName: refund.product_name || "Producto no registrado",
      amount: Number(refund.refund_amount || 0),
      status: refund.status || "Pendiente",
    }));
  }, [refunds]);

  const dailyMovements = useMemo(() => {
    return [...salesMovements, ...refundMovements]
      .filter((movement) => getDateKey(movement.date) === selectedDate)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [salesMovements, refundMovements, selectedDate]);

  const dailyIncome = dailyMovements
    .filter((movement) => movement.type === "Ingreso")
    .reduce((sum, movement) => sum + movement.amount, 0);

  const dailyExpenses = dailyMovements
    .filter((movement) => movement.type === "Egreso")
    .reduce((sum, movement) => sum + movement.amount, 0);

  const dailyBalance = dailyIncome - dailyExpenses;

  const dailySalesCount = dailyMovements.filter(
    (movement) => movement.type === "Ingreso"
  ).length;

  const dailyRefundsCount = dailyMovements.filter(
    (movement) => movement.type === "Egreso"
  ).length;

  const averageTicket =
    dailySalesCount > 0 ? dailyIncome / dailySalesCount : 0;

  const availableDates = useMemo(() => {
    const dates = [...salesMovements, ...refundMovements]
      .map((movement) => getDateKey(movement.date))
      .filter(Boolean);

    return [...new Set(dates)].sort((a, b) => new Date(b) - new Date(a));
  }, [salesMovements, refundMovements]);

  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">MÓDULO FINANCIERO</span>

        <h1 className="module-page-title">Caja Diaria</h1>

        <p className="module-page-description">
          Control diario de ingresos, reembolsos, balance neto y movimientos
          financieros generados por la operación comercial.
        </p>
      </div>

      {loading ? (
        <div className="placeholder-card">
          <div className="placeholder-icon">⏳</div>
          <h2>Cargando caja diaria...</h2>
          <p>Obteniendo movimientos financieros desde Supabase.</p>
        </div>
      ) : (
        <>
          <div className="cash-toolbar">
            <div>
              <span>FECHA DE OPERACIÓN</span>
              <h2>{selectedDate ? formatDate(selectedDate) : "Sin fecha"}</h2>
            </div>

            <select
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            >
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {formatDate(date)}
                </option>
              ))}
            </select>
          </div>

          <div className="cash-kpi-grid">
            <article className="cash-kpi-card positive">
              <span>Ingresos del día</span>
              <strong>{formatPrice(dailyIncome)}</strong>
              <p>Ventas aprobadas y pagadas.</p>
            </article>

            <article className="cash-kpi-card negative">
              <span>Reembolsos</span>
              <strong>{formatPrice(dailyExpenses)}</strong>
              <p>Egresos asociados a devoluciones.</p>
            </article>

            <article
              className={`cash-kpi-card ${
                dailyBalance >= 0 ? "positive" : "negative"
              }`}
            >
              <span>Balance neto</span>
              <strong>{formatPrice(dailyBalance)}</strong>
              <p>
                {dailyBalance >= 0
                  ? "Caja positiva durante la jornada."
                  : "Caja con egresos superiores a ingresos."}
              </p>
            </article>

            <article className="cash-kpi-card neutral">
              <span>Ticket promedio</span>
              <strong>{formatPrice(averageTicket)}</strong>
              <p>Promedio de ingreso por venta.</p>
            </article>
          </div>

          <div className="cash-main-grid">
            <article className="cash-panel">
              <div className="cash-panel-header">
                <div>
                  <span>MOVIMIENTOS</span>
                  <h2>Flujo financiero del día</h2>
                  <p>Ingresos y reembolsos registrados en la jornada.</p>
                </div>

                <div
                  className={`cash-status-badge ${
                    dailyBalance >= 0 ? "positive" : "negative"
                  }`}
                >
                  {dailyBalance >= 0 ? "Caja positiva" : "Caja negativa"}
                </div>
              </div>

              <div className="cash-movement-list">
                {dailyMovements.length === 0 ? (
                  <div className="cash-empty-state">
                    No hay movimientos para esta fecha.
                  </div>
                ) : (
                  dailyMovements.map((movement) => (
                    <div className="cash-movement-item" key={movement.id}>
                      <div className="cash-movement-time">
                        {formatTime(movement.date)}
                      </div>

                      <div className="cash-movement-info">
                        <strong>{movement.source}</strong>
                        <span>{movement.customerName}</span>
                        <p>{movement.productName}</p>
                      </div>

                      <div>
                        <span
                          className={
                            movement.type === "Ingreso"
                              ? "movement-type income"
                              : "movement-type expense"
                          }
                        >
                          {movement.type}
                        </span>
                      </div>

                      <div
                        className={
                          movement.type === "Ingreso"
                            ? "movement-amount income"
                            : "movement-amount expense"
                        }
                      >
                        {movement.type === "Ingreso" ? "+" : "-"}
                        {formatPrice(movement.amount)}
                      </div>

                      <div>
                        <span
                          className={
                            movement.status === "Pendiente"
                              ? "cash-warning-badge"
                              : "cash-success-badge"
                          }
                        >
                          {movement.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </article>

            <article className="cash-panel cash-summary-panel">
              <span>RESUMEN</span>
              <h2>Resumen financiero</h2>

              <div className="cash-summary-list">
                <div>
                  <span>Ventas del día</span>
                  <strong className="positive-text">{dailySalesCount}</strong>
                </div>

                <div>
                  <span>Reembolsos del día</span>
                  <strong className="negative-text">{dailyRefundsCount}</strong>
                </div>

                <div>
                  <span>Total movimientos</span>
                  <strong>{dailyMovements.length}</strong>
                </div>

                <div>
                  <span>Balance final</span>
                  <strong
                    className={
                      dailyBalance >= 0 ? "positive-text" : "negative-text"
                    }
                  >
                    {formatPrice(dailyBalance)}
                  </strong>
                </div>
              </div>

              <div className="cash-summary-note">
                La caja diaria consolida ventas aprobadas como ingresos y
                reembolsos como egresos, permitiendo visualizar el resultado
                financiero neto de la jornada.
              </div>
            </article>
          </div>
        </>
      )}
    </section>
  );
}

export default DailyCashPage;