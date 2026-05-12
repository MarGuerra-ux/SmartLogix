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

import {
  notifyApprovedOrder,
  notifyRejectedOrder,
} from "../../services/notificationService";

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

  async function createShipmentFromOrder(order, client, product) {
    const trackingCode = `TRK-${Date.now()}`;

    const { error } = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/shipping_quotes`,
      {
        method: "POST",
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          tracking_code: trackingCode,
          customer_name: client?.full_name || "Cliente no registrado",
          destination: client?.city
            ? `${client.city}${client.region ? `, ${client.region}` : ""}`
            : "Sin destino",
          status: "Preparando envío",
          product_name: product?.name || "Producto no registrado",
          carrier_name: "Chilexpress",
          service_name: "Express",
          created_at: new Date().toISOString(),
        }),
      }
    );

    return { error };
  }

  async function handleSendToShipping(order) {
    if (order.status === "Aprobado" || order.status === "Enviado") return;

    const selectedProduct = getOrderProduct(order);
    const selectedClient = getOrderClient(order);

    if (!selectedProduct) {
      setModalType("warning");
      setModalTitle("Producto no encontrado");
      setModalMessage("No se encontró el producto asociado a este pedido.");
      setModalOpen(true);
      return;
    }

    if (Number(selectedProduct.stock_units) < Number(order.quantity || 1)) {
      setModalType("warning");
      setModalTitle("Stock insuficiente");
      setModalMessage(
        "No existe suficiente stock para enviar este pedido al área logística."
      );
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

    await createShipmentFromOrder(order, selectedClient, selectedProduct);

    await notifyApprovedOrder({
      ...order,
      customer_name: selectedClient?.full_name,
      customer_email: selectedClient?.email,
      product_name: selectedProduct?.name,
    });

    setModalType("success");
    setModalTitle("Pedido enviado a logística");
    setModalMessage(
      "El pedido fue validado, el stock fue descontado y se creó un envío en estado Preparando envío."
    );
    setModalOpen(true);

    setSelectedOrder(null);
    loadData();
  }

  async function handleRejectOrder(order) {
    const selectedProduct = getOrderProduct(order);
    const selectedClient = getOrderClient(order);

    await notifyRejectedOrder({
      ...order,
      customer_name: selectedClient?.full_name,
      customer_email: selectedClient?.email,
      product_name: selectedProduct?.name,
    });

    await deleteOrder(order.id);

    setModalType("warning");
    setModalTitle("Pedido rechazado");
    setModalMessage(
      "El pedido fue rechazado/eliminado y se registró la notificación correspondiente."
    );
    setModalOpen(true);

    setSelectedOrder(null);
    loadData();
  }

  function closeSystemModal() {
    setModalOpen(false);
  }

  const visibleOrders = orders.filter(
    (order) => order.status !== "Aprobado" && order.status !== "Enviado"
  );

  const pendingOrders = visibleOrders.filter(
    (order) => order.status === "Pendiente" || order.status === "Procesando"
  ).length;

  const approvedOrders = orders.filter(
    (order) => order.status === "Aprobado"
  ).length;

  const totalRevenue = orders.reduce(
    (acc, order) => acc + Number(order.total_amount || 0),
    0
  );

  const filteredOrders = useMemo(() => {
    return visibleOrders
      .filter((order) => {
        const client = clients.find((c) => c.id === order.customer_id);
        const product = products.find((p) => p.id === Number(order.product_id));

        const search = searchTerm.toLowerCase();

        return (
          order.order_code?.toLowerCase().includes(search) ||
          client?.full_name?.toLowerCase().includes(search) ||
          product?.name?.toLowerCase().includes(search) ||
          order.status?.toLowerCase().includes(search)
        );
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [visibleOrders, clients, products, searchTerm]);

  return (
    <section className="module-page">
      <div className="module-page-header centered">
        <span className="module-page-kicker">MÓDULO DE PEDIDOS</span>

        <h1 className="module-page-title">Pedidos</h1>

        <p className="module-page-description">
          Validación de pedidos antes de derivarlos al módulo logístico.
        </p>
      </div>

      <div className="shipping-stats-grid">
        <div className="shipping-stat-card">
          <span>📦</span>
          <div>
            <strong>{visibleOrders.length}</strong>
            <p>Pedidos en revisión</p>
          </div>
        </div>

        <div className="shipping-stat-card">
          <span>🟡</span>
          <div>
            <strong>{pendingOrders}</strong>
            <p>Pendientes / procesando</p>
          </div>
        </div>

        <div className="shipping-stat-card">
          <span>🚚</span>
          <div>
            <strong>{approvedOrders}</strong>
            <p>Derivados a logística</p>
          </div>
        </div>

        <div className="shipping-stat-card">
          <span>💰</span>
          <div>
            <strong>${totalRevenue.toLocaleString("es-CL")}</strong>
            <p>Ingresos registrados</p>
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
                    <span className="tracking-pill">{order.order_code}</span>
                  </td>

                  <td>
                    {order.created_at
                      ? new Date(order.created_at).toLocaleString("es-CL")
                      : "Sin fecha"}
                  </td>

                  <td>{client?.full_name || "Cliente no encontrado"}</td>

                  <td>{product?.name || "Producto no encontrado"}</td>

                  <td>
                    ${Number(order.total_amount || 0).toLocaleString("es-CL")}
                  </td>

                  <td>
                    <span
                      className={`shipping-status ${
                        order.status === "Rechazado" ? "cancelled" : "preparing"
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
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <article
            className="modal-card small-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="module-page-kicker">DETALLE DEL PEDIDO</span>

                <h3>{selectedOrder.order_code}</h3>

                <p>
                  Revisa el pedido antes de notificar al transportista y enviarlo
                  al módulo logístico.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>
            </div>

            <div className="order-detail-grid">
              <div className="order-detail-item">
                <span>Cliente</span>
                <strong>
                  {getOrderClient(selectedOrder)?.full_name ||
                    "Cliente no encontrado"}
                </strong>
              </div>

              <div className="order-detail-item">
                <span>Producto</span>
                <strong>
                  {getOrderProduct(selectedOrder)?.name ||
                    "Producto no encontrado"}
                </strong>
              </div>

              <div className="order-detail-item">
                <span>Cantidad</span>
                <strong>{selectedOrder.quantity || 1}</strong>
              </div>

              <div className="order-detail-item">
                <span>Total</span>
                <strong>
                  $
                  {Number(selectedOrder.total_amount || 0).toLocaleString(
                    "es-CL"
                  )}
                </strong>
              </div>

              <div className="order-detail-item">
                <span>Estado</span>
                <strong>{selectedOrder.status}</strong>
              </div>

              <div className="order-detail-item">
                <span>Fecha / Hora</span>
                <strong>
                  {selectedOrder.created_at
                    ? new Date(selectedOrder.created_at).toLocaleString("es-CL")
                    : "Sin fecha"}
                </strong>
              </div>
            </div>

            <div className="modal-actions">
              {selectedOrder.status !== "Aprobado" &&
                selectedOrder.status !== "Enviado" && (
                  <button
                    className="primary-button"
                    onClick={() => handleSendToShipping(selectedOrder)}
                  >
                    Notificar transportista y enviar
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