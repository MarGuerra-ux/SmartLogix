import { useState } from "react";
import {
  demoOrder,
  demoShippingOptions,
  registerSelectedShipping,
} from "../services/shippingService";
import "../styles/modulespages.css";

export default function ShippingPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState("");

  const handleSelectShipping = async (option) => {
    setSelectedOption(option);
    setStatus("Procesando pago demo...");

    setTimeout(async () => {
      const result = await registerSelectedShipping(option);

      if (result.success) {
        setStatus("Pago aprobado. Envío registrado correctamente.");
      } else {
        setStatus("Error al registrar el envío.");
      }
    }, 1200);
  };

  return (
    <section className="module-page">
      <div className="module-header">
        <h2>🚚 Cotizador de Envíos</h2>
        <p>
          Caso de prueba con pedido ficticio y selección de transportista.
        </p>
      </div>

      <div className="module-form">
        <h3>Pedido recibido</h3>

        <div className="shipping-order-card">
          <p><strong>Orden:</strong> {demoOrder.orderId}</p>
          <p><strong>Cliente:</strong> {demoOrder.customerName}</p>
          <p><strong>Producto:</strong> {demoOrder.productName}</p>
          <p><strong>Destino:</strong> {demoOrder.destinationCity}</p>
          <p><strong>Peso:</strong> {demoOrder.weight}</p>
        </div>
      </div>

      <div className="shipping-options-grid">
        {demoShippingOptions.map((option) => (
          <article
            key={option.carrierName}
            className={`shipping-card ${
              selectedOption?.carrierName === option.carrierName ? "selected" : ""
            }`}
          >
            <span className="shipping-label">{option.label}</span>

            <h3>{option.carrierName}</h3>
            <p>{option.serviceName}</p>

            <div className="shipping-price">
              ${option.price.toLocaleString("es-CL")}
            </div>

            <p className="shipping-time">
              Entrega: {option.estimatedDays}
            </p>

            <button
              className="primary-button"
              onClick={() => handleSelectShipping(option)}
            >
              Elegir transportista
            </button>
          </article>
        ))}
      </div>

      {status && (
        <div className="shipping-status">
          {status}
        </div>
      )}
    </section>
  );
}