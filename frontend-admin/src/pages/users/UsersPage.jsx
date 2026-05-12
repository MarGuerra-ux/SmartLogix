import "../../styles/ModulePages.css";

function UsersPage() {
  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">
          ADMINISTRACIÓN
        </span>

        <h1 className="module-page-title">
          Usuarios
        </h1>

        <p className="module-page-description">
          Administración de usuarios internos, roles y permisos del panel
          SmartLogix.
        </p>
      </div>

      <div className="placeholder-card">
        <div className="placeholder-icon">👤</div>

        <h2>Módulo de usuarios en desarrollo</h2>

        <p>
          Próximamente podrás gestionar usuarios internos, perfiles, roles y
          niveles de acceso.
        </p>
      </div>
    </section>
  );
}

export default UsersPage;