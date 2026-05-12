import "../../styles/ModulePages.css";

function TopSalesPage() {
  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">
          MÓDULO COMERCIAL
        </span>

        <h1 className="module-page-title">
          Top Ventas
        </h1>

        <p className="module-page-description">
          Listado de los productos más vendidos,
          unidades comercializadas y valor total
          generado dentro de SmartLogix.
        </p>
      </div>

      <div className="placeholder-card">
        <div className="placeholder-icon">
          🏆
        </div>

        <h2>
          Ranking comercial en desarrollo
        </h2>

        <p>
          Próximamente podrás visualizar productos
          más vendidos, rendimiento comercial y
          análisis de comportamiento de ventas.
        </p>
      </div>
    </section>
  );
}

export default TopSalesPage;