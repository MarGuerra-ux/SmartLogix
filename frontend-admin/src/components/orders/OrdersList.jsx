import { useState } from "react";
import "../../styles/orders.css";


import demoOrders from "../../data/demoOrders.json";
import { validateOrderStock } from "../../services/orderValidationService";
import { createRefund } from "../../services/refundService";

const STATUSES = ["Pendiente", "Procesando", "Completado", "Cancelado"];

const STATUS_COLORS = {
  Pendiente: "#f59e0b",
  Procesando: "#38bdf8",
  Completado: "#22c55e",
  Cancelado: "#ef4444",
};

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || "#94a3b8";

  return (
    <span
      style={{
        background: color + "22",
        color,
        border: `1px solid ${color}55`,
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "0.8rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

function formatPrice(value) {
  return `$${Number(value).toLocaleString("es-CL")}`;
}

function OrdersList({ orders, onAdd, onDelete, onChangeStatus }) {
  const [newOrders, setNewOrders] = useState([]);
  const [showNewOrders, setShowNewOrders] = useState(false);
  const [demoIndex, setDemoIndex] = useState(0);
  const [selectedIncomingOrder, setSelectedIncomingOrder] = useState(null);
  const [stockValidation, setStockValidation] = useState(null);
  const [systemMessage, setSystemMessage] = useState(null);

  const handleExecuteDemo = () => {
    if (demoIndex >= demoOrders.length) {
      setSystemMessage({
        type: "info",
        title: "Demo finalizada",
        message: "Ya se cargaron todos los pedidos demo disponibles.",
      });
      return;
    }

    const nextOrder = demoOrders[demoIndex];

    setNewOrders((prev) => [...prev, nextOrder]);
    setDemoIndex((prev) => prev + 1);

    setSystemMessage({
      type: "success",
      title: "Pedido recibido",
      message: `Ingresó el pedido ${nextOrder.orderId}. Revisa Pedidos Nuevos.`,
    });
  };

  const handleOpenIncomingOrder = async (order) => {
    setSelectedIncomingOrder(order);

    const validation = await validateOrderStock(order);
    setStockValidation(validation);
  };

  const handleAcceptIncomingOrder = () => {
    if (!selectedIncomingOrder) return;

    const productPrice = stockValidation?.product?.unit_price || 0;
    const quantity = selectedIncomingOrder.quantity || 1;
    const shippingPrice = selectedIncomingOrder.shippingPrice || 0;

    onAdd({
      customer: selectedIncomingOrder.customerName,
      date: new Date().toISOString().split("T")[0],
      total: Number(productPrice) * quantity + Number(shippingPrice),
      status: "Pendiente",
    });

    setNewOrders((prev) =>
      prev.filter((o) => o.orderId !== selectedIncomingOrder.orderId)
    );

    setSystemMessage({
      type: "success",
      title: "Pedido aceptado",
      message: `${selectedIncomingOrder.orderId} fue agregado a la lista de pedidos.`,
    });

    setSelectedIncomingOrder(null);
    setStockValidation(null);
  };

    const handleRejectIncomingOrder = async () => {
      if (!selectedIncomingOrder) return;

      const productPrice = stockValidation?.product?.unit_price || 0;
      const quantity = selectedIncomingOrder.quantity || 1;
      const shippingPrice = selectedIncomingOrder.shippingPrice || 0;

      const refundAmount =
        Number(productPrice) * quantity + Number(shippingPrice);

      await createRefund({
        order_id: selectedIncomingOrder.orderId,
        customer_name: selectedIncomingOrder.customerName,
        customer_email: selectedIncomingOrder.customerEmail,
        product_name: selectedIncomingOrder.productName,
        product_sku: selectedIncomingOrder.productSku,
        reason: "Stock insuficiente",
        refund_amount: refundAmount,
        status: "Pendiente",
      });

      setSystemMessage({
        type: "error",
        title: "Pedido rechazado por stock",
        message: `Se generó reembolso por ${formatPrice(
          refundAmount
        )} y correo de disculpas para ${selectedIncomingOrder.customerEmail}.`,
      });

      setNewOrders((prev) =>
        prev.filter((o) => o.orderId !== selectedIncomingOrder.orderId)
      );

      setSelectedIncomingOrder(null);
      setStockValidation(null);
    };

  const handleStandbyIncomingOrder = () => {
    setSystemMessage({
      type: "info",
      title: "Pedido en standby",
      message: `${selectedIncomingOrder.orderId} queda pendiente de confirmación.`,
    });

    setSelectedIncomingOrder(null);
    setStockValidation(null);
  };

  const total = orders.length;
  const pendientes = orders.filter((o) => o.status === "Pendiente").length;
  const procesando = orders.filter((o) => o.status === "Procesando").length;
  const completados = orders.filter((o) => o.status === "Completado").length;

  return (
    <div className="orders-page">
      {systemMessage && (
        <div className={`system-toast ${systemMessage.type}`}>
          <div>
            <h4>{systemMessage.title}</h4>
            <p>{systemMessage.message}</p>
          </div>

          <button onClick={() => setSystemMessage(null)}>✕</button>
        </div>
      )}

      <div className="orders-header">
        <div>
          <p className="orders-label">Módulo de Ventas</p>
          <h1>Pedidos</h1>
          <p className="orders-subtitle">
            Administra pedidos, estados y trazabilidad de cada orden.
          </p>
        </div>

        <div className="orders-actions">
          <button className="btn-secondary" onClick={handleExecuteDemo}>
            🧪 Ejecutar Demo
          </button>

          <button
            className="btn-primary"
            onClick={() => setShowNewOrders(!showNewOrders)}
          >
            📥 Pedidos Nuevos ({newOrders.length})
          </button>
        </div>
      </div>

      {showNewOrders && (
        <div className="incoming-orders-panel">
          <h3>Pedidos Nuevos</h3>

          {newOrders.length === 0 ? (
            <div className="empty-state">No hay pedidos pendientes.</div>
          ) : (
            <div className="incoming-orders-grid">
              {newOrders.map((order) => (
                <div key={order.orderId} className="incoming-order-card">
                  <p>
                    <strong>{order.orderId}</strong>
                  </p>

                  <p>{order.productName}</p>
                  <p>SKU: {order.productSku}</p>

                  <button
                    className="btn-primary"
                    onClick={() => handleOpenIncomingOrder(order)}
                  >
                    Revisar Pedido
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedIncomingOrder && (
        <div className="incoming-order-modal">
          <div className="incoming-order-modal-card">
            <h2>{selectedIncomingOrder.orderId}</h2>

            <p>
              <strong>Código producto:</strong>{" "}
              {selectedIncomingOrder.productSku}
            </p>

            <p>
              <strong>Producto:</strong> {selectedIncomingOrder.productName}
            </p>

            <p>
              <strong>Cantidad:</strong> {selectedIncomingOrder.quantity}
            </p>

            <div className="incoming-stock-validation">
              {stockValidation?.approved ? (
                <div className="stock-approved">
                  ✅ Pase Verde — Stock disponible
                </div>
              ) : (
                <div className="stock-denied">
                  ❌ Pase Denegado por Stock
                </div>
              )}
            </div>

            <div className="incoming-shipping-info">
              <h4>El cliente ha escogido este transportista</h4>

              <p>🚚 {selectedIncomingOrder.selectedCarrier}</p>
              <p>📦 {selectedIncomingOrder.selectedService}</p>
              <p>
                💰 $
                {Number(selectedIncomingOrder.shippingPrice).toLocaleString(
                  "es-CL"
                )}
              </p>
              <p>⏱️ {selectedIncomingOrder.estimatedDays}</p>
            </div>

            <div className="incoming-actions">
              {stockValidation?.approved ? (
                <button
                  className="btn-primary"
                  onClick={handleAcceptIncomingOrder}
                >
                  ✅ Aceptar y agregar a la lista
                </button>
              ) : (
                <button
                  className="btn-danger"
                  onClick={handleRejectIncomingOrder}
                >
                  ❌ Rechazar por Stock
                </button>
              )}

              <button
                className="btn-secondary"
                onClick={handleStandbyIncomingOrder}
              >
                ⏸️ Dejar Standby
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="orders-stats">
        <div className="stat-card">
          <span className="stat-icon">🧾</span>
          <div>
            <p className="stat-value">{total}</p>
            <p className="stat-label">Total Pedidos</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon" style={{ color: "#f59e0b" }}>
            ⏳
          </span>
          <div>
            <p className="stat-value" style={{ color: "#f59e0b" }}>
              {pendientes}
            </p>
            <p className="stat-label">Pendientes</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon" style={{ color: "#38bdf8" }}>
            ⚙️
          </span>
          <div>
            <p className="stat-value" style={{ color: "#38bdf8" }}>
              {procesando}
            </p>
            <p className="stat-label">Procesando</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon" style={{ color: "#22c55e" }}>
            ✅
          </span>
          <div>
            <p className="stat-value" style={{ color: "#22c55e" }}>
              {completados}
            </p>
            <p className="stat-label">Completados</p>
          </div>
        </div>
      </div>

      <div className="orders-table-card">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th style={{ textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <span className="id-chip">{o.id}</span>
                  </td>

                  <td>{o.customer}</td>
                  <td>{o.date}</td>

                  <td>
                    <span className="price-value">{formatPrice(o.total)}</span>
                  </td>

                  <td>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <select
                        value={o.status}
                        onChange={(e) => onChangeStatus(o.id, e.target.value)}
                        className="status-select"
                        style={{
                          borderColor:
                            (STATUS_COLORS[o.status] || "#334155") + "55",
                        }}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>

                      <StatusBadge status={o.status} />
                    </div>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => onDelete(o.id)}
                      title="Eliminar pedido"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <div className="empty-state">
                    🧾 No hay pedidos registrados actualmente.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersList;