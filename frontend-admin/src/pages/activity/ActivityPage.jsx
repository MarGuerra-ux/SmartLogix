import "../../styles/ActivityPage.css";
import "../../styles/ModulePages.css";

import activities from "../../data/activities.json";

export default function ActivityPage() {
  return (
    <div className="activity-page">
      <div className="module-page-header centered">
        <span className="module-page-kicker">
          MÓDULO
        </span>

        <h1 className="module-page-title">
          Actividad Reciente
        </h1>

        <p className="module-page-description">
          Registro de movimientos recientes del sistema: pedidos creados,
          productos actualizados y envíos modificados.
        </p>
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <div className="activity-card" key={activity.id}>
            <div className="activity-top">
              <h3>{activity.title}</h3>

              <span className="activity-date">
                {activity.date} • {activity.time}
              </span>
            </div>

            <p className="activity-message">
              {activity.message}
            </p>

            <div className="activity-footer">
              <span>📨 {activity.sender}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}