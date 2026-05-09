import { useState } from "react";
import "../../styles/orders.css";

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

function formatPrice(value) {
  return `$${Number(value).toLocaleString("es-CL")}`;
}

function OrdersList({ orders, onAdd, onDelete, onChangeStatus }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    customer: "",
    date: "",
    total: "",
    status: "Pendiente",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.customer || !form.date || !form.total) return;
    onAdd({ ...form, total: Number(form.total) });
    setForm({ customer: "", date: "", total: "", status: "Pendiente" });
    setShowForm(false);
  };

  // Stats
  const total = orders.length;
  const pendientes = orders.filter((o) => o.status === "Pendiente").length;
  const procesando = orders.filter((o) => o.status === "Procesando").length;
  const completados = orders.filter((o) => o.status === "Completado").length;

  return (
    <div className="orders-page">

      {/* Header */}
      <div className="orders-header">
        <div>
          <p className="orders-label">Módulo de Ventas</p>
          <h1>Pedidos</h1>
          <p className="orders-subtitle">
            Administra pedidos, estados y trazabilidad de cada orden.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancelar" : "+ Nuevo Pedido"}
        </button>
      </div>

      {/* Stats */}
      <div className="orders-stats">
        <div className="stat-card">
          <span className="stat-icon">🧾</span>
          <div>
            <p className="stat-value">{total}</p>
            <p className="stat-label">Total Pedidos</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon" style={{ color: "#f59e0b" }}>⏳</span>
          <div>
            <p className="stat-value" style={{ color: "#f59e0b" }}>{pendientes}</p>
            <p className="stat-label">Pendientes</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon" style={{ color: "#38bdf8" }}>⚙️</span>
          <div>
            <p className="stat-value" style={{ color: "#38bdf8" }}>{procesando}</p>
            <p className="stat-label">Procesando</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon" style={{ color: "#22c55e" }}>✅</span>
          <div>
            <p className="stat-value" style={{ color: "#22c55e" }}>{completados}</p>
            <p className="stat-label">Completados</p>
          </div>
        </div>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="orders-form-card">
          <h3>Registrar Nuevo Pedido</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Cliente</label>
                <input
                  placeholder="Ej: Juan Pérez"
                  value={form.customer}
                  onChange={(e) => setForm({ ...form, customer: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Total ($)</label>
                <input
                  type="number"
                  placeholder="Ej: 49990"
                  value={form.total}
                  onChange={(e) => setForm({ ...form, total: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="btn-primary">
              Registrar Pedido
            </button>
          </form>
        </div>
      )}

      {/* Tabla */}
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
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <select
                        value={o.status}
                        onChange={(e) => onChangeStatus(o.id, e.target.value)}
                        className="status-select"
                        style={{
                          borderColor: (STATUS_COLORS[o.status] || "#334155") + "55",
                        }}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
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