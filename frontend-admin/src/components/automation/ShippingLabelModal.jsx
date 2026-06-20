import "./ShippingLabelModal.css";

function ShippingLabelModal({

    open,

    onClose,

    trace

}){

    if(!open){

        return null;

    }

    const ids=trace.ids;

    const customer=trace.customer;

    const shipment=trace.shipment;

    const tracking=trace.tracking;

    const product=trace.products[0];

    return(

        <div className="modal-overlay">

            <div className="shipping-label-modal">

                <div className="label-header">

                    <div>

                        <h2>

                            Etiqueta Logística

                        </h2>

                        <span>

                            {ids.shippingLabelId}

                        </span>

                    </div>

                    <button

                        className="close-button"

                        onClick={onClose}

                    >

                        ✕

                    </button>

                </div>

                <div className="label-body">

                    <section className="label-company">

                        <h3>

                            REMITENTE

                        </h3>

                        <p>

                            SmartLogix SpA

                        </p>

                        <p>

                            Av. Providencia 1000

                        </p>

                        <p>

                            Santiago - Chile

                        </p>

                    </section>

                    <section className="label-destination">

                        <h3>

                            DESTINATARIO

                        </h3>

                        <p>

                            {customer.fullName}

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

                    <section className="label-shipment">

                        <div>

                            <strong>

                                Courier

                            </strong>

                            <span>

                                {shipment.carrier}

                            </span>

                        </div>

                        <div>

                            <strong>

                                Servicio

                            </strong>

                            <span>

                                {shipment.service}

                            </span>

                        </div>

                        <div>

                            <strong>

                                Peso

                            </strong>

                            <span>

                                {shipment.weight} kg

                            </span>

                        </div>

                        <div>

                            <strong>

                                Producto

                            </strong>

                            <span>

                                {product.name}

                            </span>

                        </div>

                    </section>

                    <section className="tracking-box">

                        <h3>

                            TRACKING

                        </h3>

                        <div className="tracking-code">

                            {tracking.trackingNumber}

                        </div>

                        <div className="barcode-placeholder">

                            |||||| || ||||| ||||||| ||||

                        </div>

                    </section>

                </div>

            </div>

        </div>

    );

}

export default ShippingLabelModal;