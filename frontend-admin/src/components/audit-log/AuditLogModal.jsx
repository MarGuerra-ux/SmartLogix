import { useState } from "react";

import {
  getAuditLog
} from "../../services/auditLogService";

import "../../styles/AuditLogModal.css";

export default function AuditLogModal({

  entityType,

  entityId,

  isOpen,

  onClose

}) {

  const [tab, setTab] =
    useState("events");

  if (!isOpen) return null;

  const log =
    getAuditLog(
      entityType,
      entityId
    );

  if (!log) {

    return (

      <div className="audit-overlay">

        <div className="audit-modal">

          <h2>

            Centro de Auditoría

          </h2>

          <p>

            No existen registros para esta entidad.

          </p>

          <button
            className="audit-close-btn"
            onClick={onClose}
          >
            Cerrar
          </button>

        </div>

      </div>

    );

  }

  return (

    <div
      className="audit-overlay"
      onClick={onClose}
    >

      <div
        className="audit-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <div className="audit-header">

          <div>

            <span className="audit-kicker">

              CENTRO DE AUDITORÍA

            </span>

            <h2>

              {log.entityId}

            </h2>

          </div>

          <button
            className="audit-close-btn"
            onClick={onClose}
          >

            ✕

          </button>

        </div>

        <div className="audit-summary">

          <div>

            <span>

              Estado

            </span>

            <strong>

              {log.summary.status}

            </strong>

          </div>

          <div>

            <span>

              Servicios

            </span>

            <strong>

              {log.summary.services}

            </strong>

          </div>

          <div>

            <span>

              Tiempo

            </span>

            <strong>

              {log.summary.totalTime}

            </strong>

          </div>

        </div>

        <div className="audit-tabs">

          <button
            onClick={() =>
              setTab("events")
            }
            className={
              tab === "events"
                ? "active"
                : ""
            }
          >

            Eventos

          </button>

          <button
            onClick={() =>
              setTab("documents")
            }
            className={
              tab === "documents"
                ? "active"
                : ""
            }
          >

            Documentos

          </button>

          <button
            onClick={() =>
              setTab(
                "notifications"
              )
            }
            className={
              tab ===
              "notifications"
                ? "active"
                : ""
            }
          >

            Notificaciones

          </button>

          <button
            onClick={() =>
              setTab("technical")
            }
            className={
              tab ===
              "technical"
                ? "active"
                : ""
            }
          >

            Técnico

          </button>

        </div>

        <div className="audit-body">

          {tab === "events" && (

            <div className="audit-timeline">

              {log.events.map(
                (event) => (

                  <div
                    className="timeline-item"
                    key={event.id}
                  >

                    <div className="timeline-dot">

                      🟢

                    </div>

                    <div className="timeline-content">

                      <strong>

                        {event.title}

                      </strong>

                      <small>

                        {event.service}

                      </small>

                      <span>

                        {event.time}

                      </span>

                      {event.detail && (

                        <p>

                          {event.detail}

                        </p>

                      )}

                    </div>

                  </div>

                )
              )}

            </div>

          )}

          {tab === "documents" && (

            <div className="audit-grid">

              {Object.entries(
                log.documents
              ).map(
                ([key, value]) => (

                  <div
                    className="audit-item"
                    key={key}
                  >

                    <span>

                      {key}

                    </span>

                    <strong>

                      {value
                        ? "✅"
                        : "❌"}

                    </strong>

                  </div>

                )
              )}

            </div>

          )}

          {tab ===
            "notifications" && (

            <div className="audit-grid">

              {Object.entries(
                log.notifications
              ).map(
                ([key, value]) => (

                  <div
                    className="audit-item"
                    key={key}
                  >

                    <span>

                      {key}

                    </span>

                    <strong>

                      {value
                        ? "✅"
                        : "❌"}

                    </strong>

                  </div>

                )
              )}

            </div>

          )}

          {tab === "technical" && (

            <div className="audit-grid">

              {Object.entries(
                log.technical
              ).map(
                ([key, value]) => (

                  <div
                    className="audit-item"
                    key={key}
                  >

                    <span>

                      {key}

                    </span>

                    <strong>

                      {String(value)}

                    </strong>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}