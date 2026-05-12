import { useEffect, useMemo, useState } from "react";

import "../../styles/ActivityPage.css";
import "../../styles/ModulePages.css";

import {
  getNotifications,
  updateNotificationStatus,
} from "../../services/notificationService";

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

function getStatusClass(status) {
  if (status === "Enviado") return "sent";
  if (status === "Pendiente") return "pending";
  if (status === "Error") return "error";
  return "normal";
}

function getTypeIcon(type) {
  if (type === "Boleta") return "🧾";
  if (type === "Reembolso") return "↩️";
  if (type === "Stock") return "📦";
  if (type === "Envío") return "🚚";
  if (type === "Pedido") return "✅";
  return "🔔";
}

export default function ActivityPage() {
  const [notifications, setNotifications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    setLoading(true);
    const data = await getNotifications();
    setNotifications(data || []);
    setLoading(false);
  }

  async function handleMarkAsSent(notification) {
    await updateNotificationStatus(notification.id, "Enviado");
    setSelectedNotification(null);
    loadNotifications();
  }

  async function handleMarkAsPending(notification) {
    await updateNotificationStatus(notification.id, "Pendiente");
    setSelectedNotification(null);
    loadNotifications();
  }

  const filteredNotifications = useMemo(() => {
    if (statusFilter === "Todos") return notifications;

    return notifications.filter(
      (notification) => notification.status === statusFilter
    );
  }, [notifications, statusFilter]);

  const sentCount = notifications.filter(
    (notification) => notification.status === "Enviado"
  ).length;

  const pendingCount = notifications.filter(
    (notification) => notification.status === "Pendiente"
  ).length;

  const errorCount = notifications.filter(
    (notification) => notification.status === "Error"
  ).length;

  return (
    <section className="activity-page">
      <div className="module-page-header centered">
        <span className="module-page-kicker">MICROSERVICIO</span>

        <h1 className="module-page-title">
          Centro de Actividad y Notificaciones
        </h1>

        <p className="module-page-description">
          Registro operacional del sistema SmartLogix: eventos, alertas,
          notificaciones y movimientos generados automáticamente por el ERP.
        </p>
      </div>

      <div className="activity-kpi-grid">
        <article className="activity-kpi-card positive">
          <span>Notificaciones enviadas</span>
          <strong>{sentCount}</strong>
          <p>Eventos completados correctamente.</p>
        </article>

        <article className="activity-kpi-card warning">
          <span>Notificaciones pendientes</span>
          <strong>{pendingCount}</strong>
          <p>Requieren revisión o ejecución.</p>
        </article>

        <article className="activity-kpi-card negative">
          <span>Errores registrados</span>
          <strong>{errorCount}</strong>
          <p>Eventos con problemas operacionales.</p>
        </article>
      </div>

      <div className="activity-toolbar">
        <div className="activity-filter-group">
          <button
            className={
              statusFilter === "Todos"
                ? "activity-filter active"
                : "activity-filter"
            }
            onClick={() => setStatusFilter("Todos")}
          >
            Todos
          </button>

          <button
            className={
              statusFilter === "Enviado"
                ? "activity-filter active sent"
                : "activity-filter"
            }
            onClick={() => setStatusFilter("Enviado")}
          >
            Enviados
          </button>

          <button
            className={
              statusFilter === "Pendiente"
                ? "activity-filter active pending"
                : "activity-filter"
            }
            onClick={() => setStatusFilter("Pendiente")}
          >
            Pendientes
          </button>

          <button
            className={
              statusFilter === "Error"
                ? "activity-filter active error"
                : "activity-filter"
            }
            onClick={() => setStatusFilter("Error")}
          >
            Error
          </button>
        </div>
      </div>

      {loading ? (
        <div className="placeholder-card">
          <div className="placeholder-icon">⏳</div>
          <h2>Cargando actividad...</h2>
          <p>Obteniendo registros del microservicio.</p>
        </div>
      ) : (
        <div className="activity-list">
          {filteredNotifications.map((notification) => (
            <article className="activity-card" key={notification.id}>
              <div className="activity-card-top">
                <div className="activity-icon">
                  {getTypeIcon(notification.type)}
                </div>

                <div className="activity-card-info">
                  <h3>{notification.title}</h3>
                  <span>{notification.type}</span>
                </div>

                <div
                  className={`activity-status ${getStatusClass(
                    notification.status
                  )}`}
                >
                  {notification.status}
                </div>
              </div>

              <p className="activity-message">{notification.message}</p>

              <div className="activity-meta-grid">
                <div>
                  <span>Destinatario</span>
                  <strong>
                    {notification.recipient_name || "No definido"}
                  </strong>
                </div>

                <div>
                  <span>Correo</span>
                  <strong>
                    {notification.recipient_email || "No definido"}
                  </strong>
                </div>

                <div>
                  <span>Módulo</span>
                  <strong>{notification.related_module || "General"}</strong>
                </div>

                <div>
                  <span>Referencia</span>
                  <strong>{notification.related_id || "Sin referencia"}</strong>
                </div>
              </div>

              <div className="activity-footer">
                <div className="activity-date-group">
                  <span>📅 {formatDate(notification.created_at)}</span>
                  <span>🕒 {formatTime(notification.created_at)}</span>
                </div>

                <div className="activity-actions">
                  <button
                    className="activity-action-button details"
                    onClick={() => setSelectedNotification(notification)}
                  >
                    Ver gestión
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedNotification && (
        <div
          className="activity-modal-overlay"
          onClick={() => setSelectedNotification(null)}
        >
          <article
            className="activity-management-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="activity-modal-header">
              <div>
                <span>GESTIÓN DE NOTIFICACIÓN</span>
                <h2>{selectedNotification.title}</h2>
                <p>
                  Revisa la acción generada por el microservicio antes de
                  confirmar el estado.
                </p>
              </div>

              <button
                className="activity-modal-close"
                onClick={() => setSelectedNotification(null)}
              >
                ×
              </button>
            </div>

            <div className="activity-management-grid">
              <div>
                <span>Tipo</span>
                <strong>{selectedNotification.type}</strong>
              </div>

              <div>
                <span>Estado actual</span>
                <strong>{selectedNotification.status}</strong>
              </div>

              <div>
                <span>Cliente / destinatario</span>
                <strong>
                  {selectedNotification.recipient_name || "No definido"}
                </strong>
              </div>

              <div>
                <span>Correo</span>
                <strong>
                  {selectedNotification.recipient_email || "No definido"}
                </strong>
              </div>

              <div>
                <span>Módulo relacionado</span>
                <strong>{selectedNotification.related_module || "General"}</strong>
              </div>

              <div>
                <span>Referencia</span>
                <strong>{selectedNotification.related_id || "Sin referencia"}</strong>
              </div>
            </div>

            <div className="activity-email-preview">
              <span>CORREO PREPARADO</span>

              <h3>
                {selectedNotification.type === "Reembolso"
                  ? "Correo de rechazo y reembolso"
                  : "Correo de notificación operacional"}
              </h3>

              <p>
                Estimado/a {selectedNotification.recipient_name || "cliente"},
              </p>

              <p>
                {selectedNotification.type === "Reembolso"
                  ? "Lamentamos informarle que su pedido no pudo ser procesado correctamente. Se ha iniciado la gestión de reembolso correspondiente y será revisada por el área financiera."
                  : selectedNotification.message}
              </p>

              <p>
                Referencia: <strong>{selectedNotification.related_id}</strong>
              </p>
            </div>

            {selectedNotification.type === "Reembolso" && (
              <div className="activity-refund-box">
                <span>DATOS PARA REEMBOLSO</span>

                <div className="activity-refund-grid">
                  <div>
                    <span>Cliente</span>
                    <strong>
                      {selectedNotification.recipient_name || "No definido"}
                    </strong>
                  </div>

                  <div>
                    <span>Correo</span>
                    <strong>
                      {selectedNotification.recipient_email || "No definido"}
                    </strong>
                  </div>

                  <div>
                    <span>Referencia pedido</span>
                    <strong>{selectedNotification.related_id}</strong>
                  </div>

                  <div>
                    <span>Estado gestión</span>
                    <strong>Reembolso pendiente de validación</strong>
                  </div>
                </div>
              </div>
            )}

            <div className="activity-modal-actions">
              <button
                className="activity-secondary-button"
                onClick={() => handleMarkAsPending(selectedNotification)}
              >
                Dejar pendiente
              </button>

              <button
                className="activity-primary-button"
                onClick={() => handleMarkAsSent(selectedNotification)}
              >
                Enviar correo / marcar enviado
              </button>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}