import "../../styles/ModulePages.css";

function MetricsPage() {
  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">
          MÓDULO ANALÍTICO
        </span>

        <h1 className="module-page-title">
          Métricas
        </h1>

        <p className="module-page-description">
          Indicadores clave de rendimiento operativo:
          pedidos, stock, ventas y logística.
        </p>
      </div>

      <div className="placeholder-card">
        <div className="placeholder-icon">
          📊
        </div>

        <h2>
          Centro analítico en desarrollo
        </h2>

        <p>
          Próximamente podrás visualizar métricas avanzadas,
          rendimiento operacional y reportes inteligentes.
        </p>
      </div>
    </section>
  );
}

export default MetricsPage;