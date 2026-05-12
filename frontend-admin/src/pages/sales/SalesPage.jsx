import "../../styles/ModulePages.css";

function SalesPage() {
  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">
          MÓDULO COMERCIAL
        </span>

        <h1 className="module-page-title">
          Ventas
        </h1>

        <p className="module-page-description">
          Resumen comercial de ingresos,
          pedidos pagados, ventas históricas
          y desempeño financiero.
        </p>
      </div>

      <div className="placeholder-card">
        <div className="placeholder-icon">
          💰
        </div>

        <h2>
          Centro comercial en desarrollo
        </h2>

        <p>
          Próximamente podrás visualizar ventas,
          reportes financieros y estadísticas
          comerciales avanzadas.
        </p>
      </div>
    </section>
  );
}

export default SalesPage;