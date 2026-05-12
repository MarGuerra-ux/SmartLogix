import { useEffect, useMemo, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { supabase } from "../../lib/supabase";

import "../../styles/ModulePages.css";
import "../../styles/SalesPage.css";

function formatPrice(value) {
  return `$${Number(value || 0).toLocaleString("es-CL", {
    maximumFractionDigits: 0,
  })}`;
}

function formatDate(value) {
  if (!value) return "Sin fecha";

  return new Date(value).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function SalesPage() {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [loading, setLoading] = useState(true);

  const invoiceRef = useRef(null);

  useEffect(() => {
    loadSalesData();
  }, []);

  async function loadSalesData() {
    setLoading(true);

    const [ordersRes, clientsRes, productsRes] = await Promise.all([
      supabase
        .from("orders")
        .select("*")
        .eq("status", "Aprobado")
        .order("created_at", { ascending: false }),

      supabase.from("clients").select("*"),

      supabase.from("products").select("*"),
    ]);

    setOrders(ordersRes.data || []);
    setClients(clientsRes.data || []);
    setProducts(productsRes.data || []);
    setLoading(false);
  }

  function downloadInvoicePDF() {
    if (!invoiceRef.current || !selectedSale) return;

    const options = {
      margin: 0.4,
      filename: `boleta-${selectedSale.saleCode}.pdf`,
      image: {
        type: "jpeg",
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().set(options).from(invoiceRef.current).save();
  }

  const sales = useMemo(() => {
    return orders.map((order) => {
      const client = clients.find((c) => c.id === order.customer_id);
      const product = products.find((p) => p.id === order.product_id);

      return {
        id: order.id,
        saleCode: order.order_code || `VENTA-${order.id}`,
        orderCode: order.order_code || `PED-${order.id}`,
        date: order.created_at,
        customerName: client?.full_name || "Cliente no registrado",
        customerEmail: client?.email || "Sin correo",
        customerPhone: client?.phone || "Sin teléfono",
        customerAddress: client?.address || "Sin dirección",
        customerCity: client?.city || "Sin ciudad",
        customerRegion: client?.region || "Sin región",
        productName: product?.name || "Producto no registrado",
        productSku: product?.sku || "Sin SKU",
        quantity: Number(order.quantity || 1),
        unitPrice: product?.unit_price || order.total_amount || 0,
        total: Number(order.total_amount || 0),
        paymentStatus: order.payment_status || "Pagado",
        invoiceStatus: "Boleta generada",
      };
    });
  }, [orders, clients, products]);

  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const averageTicket = sales.length > 0 ? totalSales / sales.length : 0;
  const paidSales = sales.filter((sale) => sale.paymentStatus === "Pagado");

  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">MÓDULO COMERCIAL</span>

        <h1 className="module-page-title">Ventas</h1>

        <p className="module-page-description">
          Registro comercial de ventas aprobadas, boletas generadas y pagos
          confirmados dentro de SmartLogix.
        </p>
      </div>

      {loading ? (
        <div className="placeholder-card">
          <div className="placeholder-icon">⏳</div>
          <h2>Cargando ventas...</h2>
          <p>Obteniendo información comercial desde Supabase.</p>
        </div>
      ) : (
        <>
          <div className="sales-kpi-grid">
            <article className="sales-kpi-card positive">
              <span>Total vendido</span>
              <strong>{formatPrice(totalSales)}</strong>
              <p>Ingresos por ventas aprobadas.</p>
            </article>

            <article className="sales-kpi-card positive">
              <span>Ventas pagadas</span>
              <strong>{paidSales.length}</strong>
              <p>Órdenes confirmadas con pago.</p>
            </article>

            <article className="sales-kpi-card neutral">
              <span>Ticket promedio</span>
              <strong>{formatPrice(averageTicket)}</strong>
              <p>Promedio comercial por venta.</p>
            </article>

            <article className="sales-kpi-card warning">
              <span>Boletas generadas</span>
              <strong>{sales.length}</strong>
              <p>Documentos comerciales disponibles.</p>
            </article>
          </div>

          <article className="sales-table-card">
            <div className="sales-table-header">
              <div>
                <span>REGISTRO COMERCIAL</span>
                <h2>Ventas registradas</h2>
              </div>
            </div>

            <div className="sales-table-wrapper">
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>Fecha</th>
                    <th>Pago</th>
                    <th>Total</th>
                    <th>Boleta</th>
                    <th>Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id}>
                      <td>
                        <strong>{sale.saleCode}</strong>
                      </td>

                      <td>
                        <div className="sale-client-cell">
                          <strong>{sale.customerName}</strong>
                          <span>{sale.customerEmail}</span>
                        </div>
                      </td>

                      <td>{sale.productName}</td>

                      <td>{formatDate(sale.date)}</td>

                      <td>
                        <span className="success-badge">
                          {sale.paymentStatus}
                        </span>
                      </td>

                      <td className="positive-text">
                        {formatPrice(sale.total)}
                      </td>

                      <td>
                        <span className="invoice-badge">
                          {sale.invoiceStatus}
                        </span>
                      </td>

                      <td>
                        <button
                          className="sales-action-button"
                          onClick={() => {
                            setSelectedSale(sale);
                            setShowInvoice(false);
                          }}
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </>
      )}

      {selectedSale && (
        <div className="sales-modal-overlay">
          <div className="sales-modal">
            <div className="sales-modal-header">
              <div>
                <span>DETALLE DE VENTA</span>
                <h2>{selectedSale.saleCode}</h2>
              </div>

              <button
                className="sales-modal-close"
                onClick={() => {
                  setSelectedSale(null);
                  setShowInvoice(false);
                }}
              >
                ×
              </button>
            </div>

            {!showInvoice ? (
              <>
                <div className="sale-detail-grid">
                  <div>
                    <span>Cliente</span>
                    <strong>{selectedSale.customerName}</strong>
                    <p>{selectedSale.customerEmail}</p>
                  </div>

                  <div>
                    <span>Producto</span>
                    <strong>{selectedSale.productName}</strong>
                    <p>SKU: {selectedSale.productSku}</p>
                  </div>

                  <div>
                    <span>Cantidad</span>
                    <strong>{selectedSale.quantity}</strong>
                  </div>

                  <div>
                    <span>Total pagado</span>
                    <strong className="positive-text">
                      {formatPrice(selectedSale.total)}
                    </strong>
                  </div>

                  <div>
                    <span>Fecha</span>
                    <strong>{formatDate(selectedSale.date)}</strong>
                  </div>

                  <div>
                    <span>Estado de boleta</span>
                    <strong>{selectedSale.invoiceStatus}</strong>
                  </div>
                </div>

                <div className="sales-modal-actions">
                  <button
                    className="sales-primary-button"
                    onClick={() => setShowInvoice(true)}
                  >
                    Ver boleta
                  </button>

                  <button className="sales-secondary-button">
                    Enviar al correo
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="invoice-card" ref={invoiceRef}>
                  <div className="invoice-header">
                    <div>
                      <h2>SmartLogix</h2>
                      <p>Boleta electrónica de venta</p>
                    </div>

                    <div>
                      <strong>{selectedSale.saleCode}</strong>
                      <span>{formatDate(selectedSale.date)}</span>
                    </div>
                  </div>

                  <div className="invoice-section">
                    <h3>Datos del cliente</h3>

                    <p>
                      <strong>Nombre:</strong> {selectedSale.customerName}
                    </p>

                    <p>
                      <strong>Correo:</strong> {selectedSale.customerEmail}
                    </p>

                    <p>
                      <strong>Teléfono:</strong> {selectedSale.customerPhone}
                    </p>

                    <p>
                      <strong>Dirección:</strong>{" "}
                      {selectedSale.customerAddress}, {selectedSale.customerCity},{" "}
                      {selectedSale.customerRegion}
                    </p>
                  </div>

                  <div className="invoice-section">
                    <h3>Detalle de compra</h3>

                    <table className="invoice-table">
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th>SKU</th>
                          <th>Cantidad</th>
                          <th>Precio unitario</th>
                          <th>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>{selectedSale.productName}</td>
                          <td>{selectedSale.productSku}</td>
                          <td>{selectedSale.quantity}</td>
                          <td>{formatPrice(selectedSale.unitPrice)}</td>
                          <td>{formatPrice(selectedSale.total)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="invoice-total">
                    <span>Total pagado</span>
                    <strong>{formatPrice(selectedSale.total)}</strong>
                  </div>

                  <div className="invoice-footer">
                    <p>
                      Documento generado automáticamente por SmartLogix para
                      fines de gestión comercial y respaldo de venta.
                    </p>
                  </div>
                </div>

                <div className="sales-modal-actions">
                  <button
                    className="sales-secondary-button"
                    onClick={() => setShowInvoice(false)}
                  >
                    Volver al detalle
                  </button>

                  <button
                    className="sales-primary-button"
                    onClick={downloadInvoicePDF}
                  >
                    Descargar PDF
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default SalesPage;