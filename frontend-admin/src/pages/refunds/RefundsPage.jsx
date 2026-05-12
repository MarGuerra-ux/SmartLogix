import { useEffect, useState } from "react";

import "../../styles/refunds.css";
import "../../styles/ModulePages.css";

import { getRefunds } from "../../services/refundService";

function formatPrice(value) {
  return `$${Number(value || 0).toLocaleString("es-CL")}`;
}

function RefundsPage() {
  const [refunds, setRefunds] = useState([]);
  const [selectedRefund, setSelectedRefund] = useState(null);

  useEffect(() => {
    async function loadRefunds() {
      const data = await getRefunds();
      setRefunds(data);
    }

    loadRefunds();
  }, []);

  return (
    <section className="refunds-page">
      <div className="module-page-header centered">
        <span className="module-page-kicker">
          MÓDULO FINANCIERO
        </span>

        <h1 className="module-page-title">
          Reembolsos
        </h1>

        <p className="module-page-description">
          Gestión de solicitudes de devolución, datos bancarios del cliente
          y seguimiento de estados asociados a pedidos rechazados.
        </p>
      </div>

      <div className="refunds-table-card">
        <table className="refunds-table">
          <thead>
            <tr>
              <th>ID PEDIDO</th>
              <th>CLIENTE</th>
              <th>CORREO</th>
              <th>PRODUCTO</th>
              <th>MOTIVO</th>
              <th>MONTO</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
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

                  <td>
                    <span className="refund-status">
                      {refund.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="table-btn approve"
                      onClick={() => setSelectedRefund(refund)}
                    >
                      Ver más
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">
                  <div className="empty-state">
                    💸 No hay reembolsos registrados actualmente.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedRefund && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedRefund(null)}
        >
          <article
            className="modal-card small-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="module-page-kicker">
                  DETALLE DEL REEMBOLSO
                </span>

                <h3>{selectedRefund.order_id}</h3>

                <p>
                  Información necesaria para procesar la devolución al cliente.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedRefund(null)}
              >
                ✕
              </button>
            </div>

            <div className="client-detail-grid">
              <span>Nombre completo</span>
              <strong>
                {selectedRefund.customer_name || "Sin nombre registrado"}
              </strong>

              <span>RUT</span>
              <strong>
                {selectedRefund.customer_rut || "Sin RUT registrado"}
              </strong>

              <span>Correo</span>
              <strong>
                {selectedRefund.customer_email || "Sin correo registrado"}
              </strong>

              <span>Teléfono</span>
              <strong>
                {selectedRefund.customer_phone || "Sin teléfono registrado"}
              </strong>

              <span>Banco</span>
              <strong>
                {selectedRefund.bank_name || "Banco no registrado"}
              </strong>

              <span>Tipo de cuenta</span>
              <strong>
                {selectedRefund.account_type || "Tipo de cuenta no registrado"}
              </strong>

              <span>Número de cuenta</span>
              <strong>
                {selectedRefund.account_number || "N° de cuenta no registrado"}
              </strong>

              <span>Producto</span>
              <strong>
                {selectedRefund.product_name || "Producto no registrado"}
              </strong>

              <span>Monto del producto</span>
              <strong>
                {formatPrice(selectedRefund.refund_amount)}
              </strong>

              <span>Motivo</span>
              <strong>
                {selectedRefund.reason || "Sin motivo registrado"}
              </strong>

              <span>Estado</span>
              <strong>
                {selectedRefund.status || "Pendiente"}
              </strong>
            </div>

            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setSelectedRefund(null)}
              >
                Cerrar
              </button>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}

export default RefundsPage;