import { useState } from "react";

import "../../styles/shipping.css";

import demoOrders from "../../data/demoOrders.json";

import {
  demoShippingOptions,
  registerSelectedShipping,
} from "../../services/shippingService";

const STATUS_COLORS = {
  "Preparando envío": "#f59e0b",
  "En tránsito": "#38bdf8",
  Entregado: "#22c55e",
  Cancelado: "#ef4444",
  Ingresado: "#94a3b8",
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

function ShippingList({ shipments, onAdd, onDelete }) {
  const [dest, setDest] = useState("");
  const [track, setTrack] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [currentDemoOrder, setCurrentDemoOrder] = useState(null);
  const [demoIndex, setDemoIndex] = useState(0);
  const [demoStatus, setDemoStatus] = useState("");

  const handleForm = (e) => {
    e.preventDefault();

    if (!dest || !track) return;

    onAdd({
      destination: dest,
      tracking: track,
      status: "Ingresado",
    });

    setDest("");
    setTrack("");
    setShowForm(false);
  };

  const handleExecuteDemo = () => {
    if (demoIndex >= demoOrders.length) {
      setDemoStatus("Ya se ejecutaron todos los pedidos demo.");
      return;
    }

    setCurrentDemoOrder(demoOrders[demoIndex]);
    setDemoStatus("");

    setDemoIndex((prev) => prev + 1);
  };

  const handleSelectShipping = async (option) => {
    if (!currentDemoOrder) return;

    setDemoStatus("Procesando pago demo...");

    const result = await registerSelectedShipping(
      currentDemoOrder,
      option
    );

    if (result.success) {
      const trackingCode =
        option.carrierName.substring(0, 3).toUpperCase() +
        "-" +
        Math.floor(Math.random() * 999999);

      onAdd({
        destination: currentDemoOrder.destinationCity,
        tracking: trackingCode,
        status: "Preparando envío",
      });

      setDemoStatus(
        `Pago aprobado. Pedido ${currentDemoOrder.orderId} registrado con ${option.carrierName}.`
      );

      setCurrentDemoOrder(null);
    } else {
      setDemoStatus("Error registrando envío.");
    }
  };

  const total = shipments.length;

  const preparando = shipments.filter(
    (s) => s.status === "Preparando envío"
  ).length;

  const enTransito = shipments.filter(
    (s) => s.status === "En tránsito"
  ).length;

  const entregados = shipments.filter(
    (s) => s.status === "Entregado"
  ).length;

  return (
    <div className="shipping-page">
      <div className="shipping-header">
        <div>
          <p className="shipping-kicker">Módulo de Logística</p>

          <h1>Envíos</h1>

          <p className="shipping-subtitle">
            Coordina despachos, actualiza tracking y monitorea estados en tiempo real.
          </p>
        </div>

        <div className="shipping-actions">
          <button
            className="btn-secondary"
            onClick={handleExecuteDemo}
          >
            🧪 Ejecutar Pedido Demo
          </button>

          <button
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "✕ Cancelar" : "+ Nuevo Envío"}
          </button>
        </div>
      </div>

      {currentDemoOrder && (
        <div className="shipping-demo-card">
          <div className="shipping-demo-header">
            <div>
              <p className="shipping-kicker">
                Pedido recibido
              </p>

              <h3>{currentDemoOrder.orderId}</h3>
            </div>

            <StatusBadge status="Ingresado" />
          </div>

          <div className="shipping-demo-grid">
            <div>
              <strong>Cliente:</strong>
              <p>{currentDemoOrder.customerName}</p>
            </div>

            <div>
              <strong>Producto:</strong>
              <p>{currentDemoOrder.productName}</p>
            </div>

            <div>
              <strong>Destino:</strong>
              <p>{currentDemoOrder.destinationCity}</p>
            </div>

            <div>
              <strong>Peso:</strong>
              <p>{currentDemoOrder.weight}</p>
            </div>
          </div>

          <div className="shipping-options-grid">
            {demoShippingOptions.map((option) => (
              <div
                key={option.carrierName}
                className={`shipping-option-card ${
                  currentDemoOrder.recommendedCarrier ===
                  option.carrierName
                    ? "recommended"
                    : ""
                }`}
              >
                <span className="shipping-option-label">
                  {option.label}
                </span>

                <h4>{option.carrierName}</h4>

                <p>{option.serviceName}</p>

                <div className="shipping-option-price">
                  ${option.price.toLocaleString("es-CL")}
                </div>

                <small>
                  Entrega: {option.estimatedDays}
                </small>

                {currentDemoOrder.recommendedCarrier ===
                  option.carrierName && (
                  <div className="shipping-recommendation">
                    ⭐ {currentDemoOrder.reason}
                  </div>
                )}

                <button
                  className="btn-primary"
                  onClick={() =>
                    handleSelectShipping(option)
                  }
                >
                  Elegir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {demoStatus && (
        <div className="shipping-demo-status">
          {demoStatus}
        </div>
      )}

      <div className="shipping-stats">
        <div className="stat-card">
          <span className="stat-icon">📦</span>

          <div>
            <p className="stat-value">{total}</p>
            <p className="stat-label">Total Envíos</p>
          </div>
        </div>

        <div className="stat-card">
          <span
            className="stat-icon"
            style={{ color: "#f59e0b" }}
          >
            🔧
          </span>

          <div>
            <p
              className="stat-value"
              style={{ color: "#f59e0b" }}
            >
              {preparando}
            </p>

            <p className="stat-label">Preparando</p>
          </div>
        </div>

        <div className="stat-card">
          <span
            className="stat-icon"
            style={{ color: "#38bdf8" }}
          >
            🚚
          </span>

          <div>
            <p
              className="stat-value"
              style={{ color: "#38bdf8" }}
            >
              {enTransito}
            </p>

            <p className="stat-label">En Tránsito</p>
          </div>
        </div>

        <div className="stat-card">
          <span
            className="stat-icon"
            style={{ color: "#22c55e" }}
          >
            ✅
          </span>

          <div>
            <p
              className="stat-value"
              style={{ color: "#22c55e" }}
            >
              {entregados}
            </p>

            <p className="stat-label">Entregados</p>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="shipping-form-card">
          <h3>Registrar Nuevo Envío</h3>

          <form onSubmit={handleForm}>
            <div className="form-grid">
              <div className="form-group">
                <label>Destino</label>

                <input
                  placeholder="Ej: Santiago Centro"
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Código Tracking</label>

                <input
                  placeholder="Ej: TRK-5566"
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
            >
              Registrar Envío
            </button>
          </form>
        </div>
      )}

      <div className="shipping-table-card">
        <table className="shipping-table">
          <thead>
            <tr>
              <th>N° Tracking</th>
              <th>Destino</th>
              <th>Estado</th>
              <th style={{ textAlign: "center" }}>
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {shipments.length > 0 ? (
              shipments.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="tracking-view">
                      <code>{s.tracking}</code>
                    </div>
                  </td>

                  <td>{s.destination}</td>

                  <td>
                    <StatusBadge
                      status={s.status || "Ingresado"}
                    />
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => onDelete(s.id)}
                      title="Eliminar envío"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  <div className="empty-state">
                    🚚 No hay envíos registrados actualmente.
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

export default ShippingList;