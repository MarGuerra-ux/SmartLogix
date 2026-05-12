import "../../styles/ModulePages.css";

function SettingsPage() {
  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">
          CONFIGURACIÓN DEL SISTEMA
        </span>

        <h1 className="module-page-title">
          Configuración
        </h1>

        <p className="module-page-description">
          Preferencias generales del sistema,
          integraciones, seguridad y parámetros
          operativos de SmartLogix.
        </p>
      </div>

      <div className="placeholder-card">
        <div className="placeholder-icon">
          ⚙️
        </div>

        <h2>
          Panel de configuración en desarrollo
        </h2>

        <p>
          Próximamente podrás administrar usuarios,
          integraciones, seguridad y parámetros
          globales del sistema.
        </p>
      </div>
    </section>
  );
}

export default SettingsPage;