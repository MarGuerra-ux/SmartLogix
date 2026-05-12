import { useEffect, useMemo, useState } from "react";

import SystemModal from "../ui/SystemModal";

import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../services/orderService";

import { getClients } from "../../services/clientService";

import {
  getProducts,
  updateProduct,
} from "../../services/productService";

import "../../styles/ModulePages.css";

function OrdersContainer() {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("warning");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  async function loadData() {
    setOrders(await getOrders());
    setClients(await getClients());
    setProducts(await getProducts());
  }

  useEffect(() => {
    loadData();
  }, []);

  function getOrderClient(order) {
    return clients.find((client) => client.id === order.customer_id);
  }

  function getOrderProduct(order) {
    return products.find((product) => product.id === Number(order.product_id));
  }

  async function handleApproveOrder(order) {
    if (order.status === "Aprobado") return;

    const selectedProduct = getOrderProduct(order);

    if (!selectedProduct) {
      setModalType("warning");
      setModalTitle("Producto no encontrado");
      setModalMessage("No se encontró el producto asociado a este pedido.");
      setModalOpen(true);
      return;
    }

    if (Number(selectedProduct.stock_units) < Number(order.quantity || 1)) {
      setModalType("warning");
      setModalTitle("Operación bloqueada");
      setModalMessage("Stock insuficiente para aprobar este pedido.");
      setModalOpen(true);
      return;
    }

    const newStock =
      Number(selectedProduct.stock_units) - Number(order.quantity || 1);

    await updateProduct(selectedProduct.id, {
      stock_units: newStock,
      status:
        newStock <= 0
          ? "Agotado"
          : newStock <= 10
          ? "Stock Bajo"
          : "Disponible",
    });

    await updateOrderStatus(order.id, "Aprobado");

    setSelectedOrder(null);
    loadData();
  }

  async function handleRejectOrder(order) {
    await deleteOrder(order.id);

    setSelectedOrder(null);
    loadData();
  }

  function closeSystemModal() {
    setModalOpen(false);
  }

  const pendingOrders = orders.filter(
    (order) => order.status === "Pendiente"
  ).length;

  const approvedOrders = orders.filter(
    (order) => order.status === "Aprobado"
  ).length;

  const totalRevenue = orders.reduce(
    (acc, order) => acc + Number(order.total_amount || 0),
    0
  );

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const client = clients.find((c) => c.id === order.customer_id);
        const product = products.find((p) => p.id === order.product_id);

        const search = searchTerm.toLowerCase();

        return (
          order.order_code?.toLowerCase().includes(search) ||
          client?.full_name?.toLowerCase().includes(search) ||
          product?.name?.toLowerCase().includes(search) ||
          order.status?.toLowerCase().includes(search)
        );
      })
      .sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
  }, [orders, clients, products, searchTerm]);

  return (
    <section className="module-page">
      <div className="module-page-header centered">
        <span className="module-page-kicker">
          MÓDULO DE PEDIDOS
        </span>

        <h1 className="module-page-title">
          Pedidos
        </h1>

        <p className="module-page-description">
          Administración de pedidos, pagos y control de stock.
        </p>
      </div>

      <div className="shipping-stats-grid">
        <div className="shipping-stat-card">
          <span>📦</span>

          <div>
            <strong>{orders.length}</strong>
            <p>Total pedidos</p>
          </div>
        </div>

        <div className="shipping-stat-card">
          <span>🟡</span>

          <div>
            <strong>{pendingOrders}</strong>
            <p>Pendientes</p>
          </div>
        </div>

        <div className="shipping-stat-card">
          <span>✅</span>

          <div>
            <strong>{approvedOrders}</strong>
            <p>Aprobados</p>
          </div>
        </div>

        <div className="shipping-stat-card">
          <span>💰</span>

          <div>
            <strong>
              ${totalRevenue.toLocaleString("es-CL")}
            </strong>

            <p>Ingresos</p>
          </div>
        </div>
      </div>

      <div className="module-form">
        <input
          type="text"
          placeholder="Buscar pedido, cliente o producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="shipping-table-wrapper">
        <table className="shipping-table">
          <thead>
            <tr>
              <th>N° PEDIDO</th>
              <th>FECHA / HORA</th>
              <th>CLIENTE</th>
              <th>PRODUCTO</th>
              <th>TOTAL</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => {
              const client = getOrderClient(order);
              const product = getOrderProduct(order);

              return (
                <tr key={order.id}>
                  <td>
                    <span className="tracking-pill">
                      {order.order_code}
                    </span>
                  </td>

                  <td>
                    {order.created_at
                      ? new Date(order.created_at).toLocaleString("es-CL")
                      : "Sin fecha"}
                  </td>

                  <td>
                    {client?.full_name || "Cliente no encontrado"}
                  </td>

                  <td>
                    {product?.name || "Producto no encontrado"}
                  </td>

                  <td>
                    ${Number(order.total_amount).toLocaleString("es-CL")}
                  </td>

                  <td>
                    <span
                      className={`shipping-status ${
                        order.status === "Aprobado" ? "delivered" : "preparing"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        className="table-btn approve"
                        onClick={() => setSelectedOrder(order)}
                      >
                        Ver más
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedOrder(null)}
        >
          <article
            className="modal-card small-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="module-page-kicker">
                  DETALLE DEL PEDIDO
                </span>

                <h3>{selectedOrder.order_code}</h3>

                <p>
                  Revisa el pedido antes de aprobarlo o rechazarlo.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>
            </div>

            <div className="client-detail-grid">
              <span>Cliente</span>
              <strong>
                {getOrderClient(selectedOrder)?.full_name ||
                  "Cliente no encontrado"}
              </strong>

              <span>Producto</span>
              <strong>
                {getOrderProduct(selectedOrder)?.name ||
                  "Producto no encontrado"}
              </strong>

              <span>Cantidad</span>
              <strong>
                {selectedOrder.quantity || 1}
              </strong>

              <span>Total</span>
              <strong>
                ${Number(selectedOrder.total_amount).toLocaleString("es-CL")}
              </strong>

              <span>Estado</span>
              <strong>{selectedOrder.status}</strong>

              <span>Fecha / Hora</span>
              <strong>
                {selectedOrder.created_at
                  ? new Date(selectedOrder.created_at).toLocaleString("es-CL")
                  : "Sin fecha"}
              </strong>
            </div>

            <div className="modal-actions">
              {selectedOrder.status !== "Aprobado" && (
                <button
                  className="primary-button"
                  onClick={() => handleApproveOrder(selectedOrder)}
                >
                  Aprobar pedido
                </button>
              )}

              <button
                className="danger-outline-button"
                onClick={() => handleRejectOrder(selectedOrder)}
              >
                Rechazar / eliminar
              </button>
            </div>
          </article>
        </div>
      )}

      <SystemModal
        isOpen={modalOpen}
        type={modalType}
        title={modalTitle}
        message={modalMessage}
        confirmText="Aceptar"
        cancelText="Cancelar"
        showCancel={false}
        onConfirm={closeSystemModal}
        onClose={closeSystemModal}
      />
    </section>
  );
}

export default OrdersContainer;