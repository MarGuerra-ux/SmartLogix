import "../../styles/ActivityPage.css";
import activities from "../../data/activities.json";
import SectionHero from "../../components/SectionHero";

export default function ActivityPage() {
  return (
    <div className="activity-page">
      <SectionHero
        icon="🔔"
        title="Actividad Reciente"
        description="Registro de movimientos recientes del sistema: pedidos creados, productos actualizados y envíos modificados."
      />

      <div className="activity-list">
        {activities.map((activity) => (
          <div className="activity-card" key={activity.id}>
            <div className="activity-top">
              <h3>{activity.title}</h3>

              <span className="activity-date">
                {activity.date} • {activity.time}
              </span>
            </div>

            <p className="activity-message">{activity.message}</p>

            <div className="activity-footer">
              <span>📨 {activity.sender}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}