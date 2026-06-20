import "../../styles/TrackingStatusModal.css";

export default function TrackingStatusModal({
  title,
  shipments,
  onClose,
  onSelectShipment
}) {

  return (
    <div className="modal-overlay">

      <div className="tracking-status-modal">

        <div className="tracking-status-header">

          <h2>{title}</h2>

          <button
            className="modal-close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        {shipments.length === 0 ? (

          <div className="tracking-empty-state">
            No existen registros.
          </div>

        ) : (

          <table className="tracking-status-table">

            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Courier</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>

              {shipments.map((shipment) => (

                <tr
                  key={shipment.id}
                  onClick={() =>
                    onSelectShipment(shipment)
                  }
                >

                  <td>
                    {shipment.orderNumber}
                  </td>

                  <td>
                    {shipment.customer}
                  </td>

                  <td>
                    {shipment.carrier}
                  </td>

                  <td>
                    {shipment.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}