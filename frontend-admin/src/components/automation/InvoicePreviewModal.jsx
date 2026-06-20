import "./InvoicePreviewModal.css";

function InvoicePreviewModal({

    open,

    onClose,

    trace

}){

    if(!open){

        return null;

    }

    const ids=trace.ids;

    const customer=trace.customer;

    const product=trace.products[0];

    return(

        <div className="modal-overlay">

            <div className="invoice-modal">

                <div className="invoice-header">

                    <div>

                        <h2>

                            Boleta Electrónica

                        </h2>

                        <span>

                            {ids.invoiceId}

                        </span>

                    </div>

                    <button

                        className="close-button"

                        onClick={onClose}

                    >

                        ✕

                    </button>

                </div>

                <div className="invoice-company">

                    <h3>

                        SmartLogix SpA

                    </h3>

                    <p>

                        RUT: 76.999.888-1

                    </p>

                    <p>

                        Av. Providencia 1000

                    </p>

                    <p>

                        Santiago - Chile

                    </p>

                </div>

                <div className="invoice-client">

                    <h3>

                        Cliente

                    </h3>

                    <p>{customer.fullName}</p>

                    <p>{customer.email}</p>

                    <p>{customer.address}</p>

                    <p>

                        {customer.commune}

                    </p>

                    <p>

                        {customer.region}

                    </p>

                </div>

                <table className="invoice-table">

                    <thead>

                        <tr>

                            <th>

                                Producto

                            </th>

                            <th>

                                Cant.

                            </th>

                            <th>

                                Precio

                            </th>

                            <th>

                                Total

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>

                                {product.name}

                            </td>

                            <td>

                                {product.quantity}

                            </td>

                            <td>

                                $

                                {product.unitPrice}

                            </td>

                            <td>

                                $

                                {product.total}

                            </td>

                        </tr>

                    </tbody>

                </table>

                <div className="invoice-total">

                    <strong>

                        TOTAL

                    </strong>

                    <strong>

                        $

                        {product.total}

                    </strong>

                </div>

            </div>

        </div>

    );

}

export default InvoicePreviewModal;