import { useState } from "react";
import "../../styles/shipping.css";

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
        color: color,
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

  const handleForm = (e) => {
    e.preventDefault();
    if (!dest || !track) return;
    onAdd(dest, track);
    setDest("");
    setTrack("");
    setShowForm(false);
  };

  // Stats
  const total = shipments.length;
  const enTransito = shipments.filter((s) => s.status === "En tránsito").length;
  const entregados = shipments.filter((s) => s.status === "Entregado").length;
  const preparando = shipments.filter((s) => s.status === "Preparando envío").length;

  return (
    <div className="shipping-page">

      {/* Header */}
      <div className="shipping-header">
        <div>
          <p className="shipping-label">Módulo de Logística</p>
          <h1>Envíos</h1>
          <p className="shipping-subtitle">
            Coordina despachos, actualiza tracking y monitorea estados en tiempo real.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancelar" : "+ Nuevo Envío"}
        </button>
      </div>

      {/* Stats */}
      <div className="shipping-stats">
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div>
            <p className="stat-value">{total}</p>
            <p className="stat-label">Total Envíos</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon" style={{ color: "#f59e0b" }}>🔧</span>
          <div>
            <p className="stat-value" style={{ color: "#f59e0b" }}>{preparando}</p>
            <p className="stat-label">Preparando</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon" style={{ color: "#38bdf8" }}>🚚</span>
          <div>
            <p className="stat-value" style={{ color: "#38bdf8" }}>{enTransito}</p>
            <p className="stat-label">En Tránsito</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon" style={{ color: "#22c55e" }}>✅</span>
          <div>
            <p className="stat-value" style={{ color: "#22c55e" }}>{entregados}</p>
            <p className="stat-label">Entregados</p>
          </div>
        </div>
      </div>

      {/* Formulario */}
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
            <button type="submit" className="btn-primary">
              Registrar Envío
            </button>
          </form>
        </div>
      )}

      {/* Tabla */}
      <div className="shipping-table-card">
        <table className="shipping-table">
          <thead>
            <tr>
              <th>N° Tracking</th>
              <th>Destino</th>
              <th>Estado</th>
              <th style={{ textAlign: "center" }}>Acciones</th>
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
                    <StatusBadge status={s.status || "Ingresado"} />
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