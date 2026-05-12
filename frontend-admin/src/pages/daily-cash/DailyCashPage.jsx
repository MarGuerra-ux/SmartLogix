import "../../styles/ModulePages.css";

function DailyCashPage() {
  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">
          MÓDULO FINANCIERO
        </span>

        <h1 className="module-page-title">
          Caja Diaria
        </h1>

        <p className="module-page-description">
          Control diario de ingresos generados por ventas y pedidos procesados
          durante la jornada.
        </p>
      </div>

      <div className="placeholder-card">
        <div className="placeholder-icon">
          🏦
        </div>

        <h2>
          Módulo en desarrollo
        </h2>

        <p>
          Próximamente podrás visualizar ingresos diarios,
          movimientos de caja y reportes financieros.
        </p>
      </div>
    </section>
  );
}

export default DailyCashPage;