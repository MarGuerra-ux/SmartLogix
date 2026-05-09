import { getAllMockData } from "../../services/mockService";
import "../../styles/ModulePages.css";

function MockServicePage() {
  const data = getAllMockData();

  return (
    <section className="module-page">
      <div className="module-header">
        <h2>Servicio Mock</h2>
        <p>
          Vista técnica que simula el consumo de información desde una fuente JSON.
          Esta capa representa una futura conexión con API Gateway o microservicios.
        </p>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span>Inventario</span>
          <strong>{data.inventory.length}</strong>
        </div>

        <div className="summary-card">
          <span>Pedidos</span>
          <strong>{data.orders.length}</strong>
        </div>

        <div className="summary-card">
          <span>Envíos</span>
          <strong>{data.shipping.length}</strong>
        </div>
      </div>

      <pre className="mock-box">
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}

export default MockServicePage;