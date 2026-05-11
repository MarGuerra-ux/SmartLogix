import { useEffect, useState } from "react";
import "../../styles/refunds.css";

import { getRefunds } from "../../services/refundService";

function formatPrice(value) {
  return `$${Number(value).toLocaleString("es-CL")}`;
}

function RefundsPage() {
  const [refunds, setRefunds] = useState([]);

  useEffect(() => {
    async function loadRefunds() {
      const data = await getRefunds();
      setRefunds(data);
    }

    loadRefunds();
  }, []);

  return (
    <section className="refunds-page">
      <div className="refunds-header">
        <div>
          <div className="refunds-header compact">
            <div>
                <h1>💸 Reembolsos</h1>

                
            </div>
            </div>
        </div>
      </div>

      <div className="refunds-table-card">
        <table className="refunds-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Cliente</th>
              <th>Correo</th>
              <th>Producto</th>
              <th>Motivo</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {refunds.length > 0 ? (
              refunds.map((refund) => (
                <tr key={refund.id}>
                  <td>{refund.order_id}</td>
                  <td>{refund.customer_name}</td>
                  <td>{refund.customer_email}</td>
                  <td>{refund.product_name}</td>
                  <td>{refund.reason}</td>
                  <td>{formatPrice(refund.refund_amount)}</td>
                  <td>{refund.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <div className="empty-state">
                    💸 No hay reembolsos registrados actualmente.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RefundsPage;