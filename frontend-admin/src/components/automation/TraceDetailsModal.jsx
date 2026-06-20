import InvoicePreviewModal from "./InvoicePreviewModal";
import ShippingLabelModal from "./ShippingLabelModal";

import { useState } from "react";

import "./TraceDetailsModal.css";

function TraceDetailsModal({

    open,

    onClose,

    trace

}){

    const [

        invoiceOpen,

        setInvoiceOpen

    ] = useState(false);

    const [

        labelOpen,

        setLabelOpen

    ] = useState(false);

    if(!open){

        return null;

    }

    const ids=trace.ids;

    const customer=trace.customer;

    const shipment=trace.shipment;

    const tracking=trace.tracking;

    const product=trace.products[0];

    return(

        <>

        <div className="modal-overlay">

            <div className="trace-details-modal">

                <div className="trace-header">

                    <div>

                        <h2>

                            Expediente SmartLogix

                        </h2>

                        <p>

                            {ids.traceId}

                        </p>

                    </div>

                    <button

                        className="close-button"

                        onClick={onClose}

                    >

                        ✕

                    </button>

                </div>

                <div className="trace-grid">

                    <section className="trace-box">

                        <h3>

                            Identificadores

                        </h3>

                        <p>

                            <strong>SLX</strong>

                            {ids.traceId}

                        </p>

                        <p>

                            <strong>ORD</strong>

                            {ids.orderId}

                        </p>

                        <p>

                            <strong>ENV</strong>

                            {ids.shipmentId}

                        </p>

                        <p>

                            <strong>TRK</strong>

                            {ids.trackingId}

                        </p>

                    </section>

                    <section className="trace-box">

                        <h3>

                            Cliente

                        </h3>

                        <p>

                            {customer.fullName}

                        </p>

                        <p>

                            {customer.email}

                        </p>

                        <p>

                            {customer.phone}

                        </p>

                        <p>

                            {customer.address}

                        </p>

                        <p>

                            {customer.commune}

                        </p>

                        <p>

                            {customer.region}

                        </p>

                    </section>

                    <section className="trace-box">

                        <h3>

                            Producto

                        </h3>

                        <p>

                            {product.name}

                        </p>

                        <p>

                            SKU

                            {product.sku}

                        </p>

                        <p>

                            Marca

                            {product.brand}

                        </p>

                        <p>

                            Cantidad

                            {product.quantity}

                        </p>

                        <p>

                            Total

                            ${product.total}

                        </p>

                    </section>

                    <section className="trace-box">

                        <h3>

                            Transporte

                        </h3>

                        <p>

                            Courier

                            {shipment.carrier}

                        </p>

                        <p>

                            Servicio

                            {shipment.service}

                        </p>

                        <p>

                            Estado

                            {shipment.status}

                        </p>

                        <p>

                            Tracking

                            {tracking.trackingNumber}

                        </p>

                    </section>

                </div>

                <div className="trace-actions">

                    <button

                        onClick={()=>

                            setInvoiceOpen(true)

                        }

                    >

                        🧾 Ver Boleta

                    </button>

                    <button

                        onClick={()=>

                            setLabelOpen(true)

                        }

                    >

                        🏷 Ver Etiqueta

                    </button>

                </div>

            </div>

        </div>

        <InvoicePreviewModal

            open={invoiceOpen}

            onClose={()=>

                setInvoiceOpen(false)

            }

            trace={trace}

        />

        <ShippingLabelModal

            open={labelOpen}

            onClose={()=>

                setLabelOpen(false)

            }

            trace={trace}

        />

        </>

    );

}

export default TraceDetailsModal;