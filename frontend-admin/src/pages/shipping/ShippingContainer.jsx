import { useEffect, useMemo, useState } from "react";

import {
  getShipments,
  createDemoShipment,
  deleteShipment,
  updateShipmentStatus,
} from "../../services/shippingService";

import { getProducts } from "../../services/productService";
import { createRefundFromShipment } from "../../services/refundService";

import "../../styles/ModulePages.css";

function ShippingContainer() {
  const [shipments, setShipments] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShipment, setSelectedShipment] = useState(null);

  async function loadShipments() {
    const data = await getShipments();
    setShipments(data);
  }

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  useEffect(() => {
    loadShipments();
    loadProducts();
  }, []);

  function getShipmentProduct(shipment) {
    return products.find(
      (product) =>
        product.name?.toLowerCase() === shipment.product_name?.toLowerCase()
    );
  }

  function getStockInfo(shipment) {
    const product = getShipmentProduct(shipment);

    if (!product) {
      return {
        hasStock: false,
        stock: 0,
        message: "Producto no encontrado en inventario.",
      };
    }

    const stock = Number(product.stock_units || 0);

    return {
      hasStock: stock > 0,
      stock,
      message:
        stock > 0
          ? `Hay un stock disponible de ${stock} unidades.`
          : "Este producto no tiene stock. No se puede aceptar.",
    };
  }

  async function handleCreateDemo() {
    const result = await createDemoShipment();

    if (result.success && result.data?.[0]) {
      setSelectedShipment(result.data[0]);
    }

    loadShipments();
  }

  async function handleConfirmShipment(shipment) {
    const stockInfo = getStockInfo(shipment);

    if (!stockInfo.hasStock) {
      alert(
        "No se puede confirmar el despacho porque el producto no tiene stock disponible."
      );
      return;
    }

    await updateShipmentStatus(shipment.id, "En tránsito");

    setSelectedShipment(null);
    loadShipments();
  }

  async function handleDeliverShipment(id) {
    await updateShipmentStatus(id, "Entregado");

    setSelectedShipment(null);
    loadShipments();
  }

  async function handleRejectShipment(shipment) {
    await createRefundFromShipment(shipment);
    await deleteShipment(shipment.id);

    setSelectedShipment(null);
    loadShipments();
  }

  const preparing = shipments.filter(
    (shipment) => shipment.status === "Preparando envío"
  ).length;

  const inTransit = shipments.filter(
    (shipment) => shipment.status === "En tránsito"
  ).length;

  const delivered = shipments.filter(
    (shipment) => shipment.status === "Entregado"
  ).length;

  const filteredShipments = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return shipments
      .filter((shipment) => {
        return (
          shipment.tracking_code?.toLowerCase().includes(search) ||
          shipment.destination?.toLowerCase().includes(search) ||
          shipment.status?.toLowerCase().includes(search) ||
          shipment.customer_name?.toLowerCase().includes(search)
        );
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [shipments, searchTerm]);

  const selectedStockInfo = selectedShipment
    ? getStockInfo(selectedShipment)
    : null;

  return (
    <section className="module-page">
      <div className="module-page-header centered">
        <span className="module-page-kicker">MÓDULO DE LOGÍSTICA</span>

        <h1 className="module-page-title">Envíos</h1>

        <p className="module-page-description">
          Coordina despachos, actualiza tracking y monitorea estados en tiempo
          real.
        </p>
      </div>

      <div className="module-actions-row">
        <button className="secondary-button" onClick={handleCreateDemo}>
          🧪 Ejecutar Pedido Demo
        </button>
      </div>

      <div className="shipping-stats-grid">
        <div className="shipping-stat-card">
          <span>📦</span>
          <div>
            <strong>{shipments.length}</strong>
            <p>Total Envíos</p>
          </div>
        </div>

        <div className="shipping-stat-card">
          <span>🔧</span>
          <div>
            <strong>{preparing}</strong>
            <p>Preparando</p>
          </div>
        </div>

        <div className="shipping-stat-card">
          <span>🚚</span>
          <div>
            <strong>{inTransit}</strong>
            <p>En tránsito</p>
          </div>
        </div>

        <div className="shipping-stat-card">
          <span>✅</span>
          <div>
            <strong>{delivered}</strong>
            <p>Entregados</p>
          </div>
        </div>
      </div>

      <div className="module-form">
        <input
          type="text"
          placeholder="Buscar tracking, cliente, destino o estado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="shipping-table-wrapper">
        <table className="shipping-table">
          <thead>
            <tr>
              <th>N° TRACKING</th>
              <th>FECHA / HORA</th>
              <th>CLIENTE</th>
              <th>DESTINO</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>

          <tbody>
            {filteredShipments.map((shipment) => (
              <tr key={shipment.id}>
                <td>
                  <span className="tracking-pill">
                    {shipment.tracking_code}
                  </span>
                </td>

                <td>
                  {shipment.created_at
                    ? new Date(shipment.created_at).toLocaleString("es-CL")
                    : "Sin fecha"}
                </td>

                <td>{shipment.customer_name || "Cliente no registrado"}</td>

                <td>{shipment.destination || "Sin destino"}</td>

                <td>
                  <span
                    className={`shipping-status ${
                      shipment.status === "Entregado"
                        ? "delivered"
                        : shipment.status === "En tránsito"
                        ? "transit"
                        : "preparing"
                    }`}
                  >
                    {shipment.status}
                  </span>
                </td>

                <td>
                  <button
                    className="table-btn approve"
                    onClick={() => setSelectedShipment(shipment)}
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedShipment && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedShipment(null)}
        >
          <article
            className="modal-card small-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="module-page-kicker">DETALLE DEL ENVÍO</span>

                <h3>{selectedShipment.tracking_code}</h3>

                <p>Confirma el avance del envío o rechaza el registro.</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedShipment(null)}
              >
                ✕
              </button>
            </div>

            <div className="order-detail-grid">
              <div className="order-detail-item">
                <span>Cliente</span>
                <strong>
                  {selectedShipment.customer_name || "Sin cliente"}
                </strong>
              </div>

              <div className="order-detail-item">
                <span>Producto</span>
                <strong>
                  {selectedShipment.product_name || "Sin producto"}
                </strong>
              </div>

              <div className="order-detail-item">
                <span>Stock</span>
                <strong
                  style={{
                    color: selectedStockInfo?.hasStock
                      ? "#166534"
                      : "#dc2626",
                  }}
                >
                  {selectedStockInfo?.message}
                </strong>
              </div>

              <div className="order-detail-item">
                <span>Destino</span>
                <strong>
                  {selectedShipment.destination || "Sin destino"}
                </strong>
              </div>

              <div className="order-detail-item">
                <span>Transportista</span>
                <strong>
                  {selectedShipment.carrier_name || "Sin transportista"}
                </strong>
              </div>

              <div className="order-detail-item">
                <span>Servicio</span>
                <strong>
                  {selectedShipment.service_name || "Sin servicio"}
                </strong>
              </div>

              <div className="order-detail-item">
                <span>Estado</span>
                <strong>{selectedShipment.status}</strong>
              </div>

              <div className="order-detail-item">
                <span>Disponibilidad</span>
                <strong
                  style={{
                    color: selectedStockInfo?.hasStock
                      ? "#16a34a"
                      : "#dc2626",
                  }}
                >
                  {selectedStockInfo?.hasStock
                    ? "Disponible para despacho"
                    : "No disponible"}
                </strong>
              </div>
            </div>

            <div className="modal-actions">
              {selectedShipment.status === "Preparando envío" && (
                <button
                  className="primary-button"
                  disabled={!selectedStockInfo?.hasStock}
                  onClick={() => handleConfirmShipment(selectedShipment)}
                >
                  Confirmar despacho
                </button>
              )}

              {selectedShipment.status === "En tránsito" && (
                <button
                  className="primary-button"
                  onClick={() => handleDeliverShipment(selectedShipment.id)}
                >
                  Marcar entregado
                </button>
              )}

              <button
                className="danger-outline-button"
                onClick={() => handleRejectShipment(selectedShipment)}
              >
                Rechazar / enviar a reembolso
              </button>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}

export default ShippingContainer;